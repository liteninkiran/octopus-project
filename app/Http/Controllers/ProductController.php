<?php

namespace App\Http\Controllers;

// Illuminate
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;

// Models
use App\Models\Product;

// Jobs
use App\Jobs\StoreProducts;

// Services
use App\Services\Local\ProductPager;

class ProductController extends Controller
{
    /**
     * index
     *
     * @param ProductPager $productPager
     * @return LengthAwarePaginator
     */
    public function index(ProductPager $productPager): LengthAwarePaginator
    {
        // \DB::enableQueryLog();
        $response = $productPager->getPaginatedProducts(
            $this->getFiltersArray(),
            request()->input('sortCol', 'id'),
            request()->input('sortOrder', 'asc'),
            request()->input('pageNumber', 0),
            request()->input('pageSize', 10),
        );
        // info(\DB::getQueryLog());
        return $response;
    }

    /**
     * storeProducts
     *
     * @return JsonResponse
     */
    public function storeProducts(): JsonResponse
    {
        StoreProducts::dispatch();
        return response()->json([ 'response' => 'Added to queue' ]);
    }
    
    /**
     * getFiltersArray
     *
     * @return array
     */
    private function getFiltersArray(): array
    {
        $filterNames = [
            'code',
            'direction',
            'full_name',
            'display_name',
            'description',
            'brand',
            'is_variable',
            'is_green',
            'is_tracker',
            'is_prepay',
            'is_business',
            'is_restricted',
            'term',
            'available_on',
        ];

        $filters = array_reduce($filterNames, function ($result, $item) {
            $result[$item] = request()->input($item, null);
            return $result;
        }, array());

        return $filters;
    }

}
