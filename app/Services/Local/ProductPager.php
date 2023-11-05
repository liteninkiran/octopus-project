<?php

namespace App\Services\Local;

// Illuminate
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;

// Models
use App\Models\Product;

class ProductPager
{    
    /**
     * query
     *
     * @var Builder
     */
    private $query;
    
    /**
     * getPaginatedProducts
     *
     * @param string[] $filters
     * @param string $sortCol
     * @param string $sortOrder
     * @param int $pageNumber
     * @param int $pageSize
     * @return LengthAwarePaginator
     */
    public function getPaginatedProducts(array $filters = [], string $sortCol = 'id', string $sortOrder = 'asc', int $pageNumber = 0, int $pageSize = 5): LengthAwarePaginator
    {
        $this->initialiseQuery()
            ->addFilters($filters)
            ->addOrderBy($sortCol, $sortOrder);

        // Paginate & return
        return $this->query->paginate($pageSize, ['*'], 'pageNumber', $pageNumber + 1);
    }

    /**
     * initialiseQuery
     *
     * @return self
     */
    private function initialiseQuery(): self
    {
        $selectColumns = [
            'products.id',
            'products.code',
            'products.direction',
            'products.full_name',
            'products.display_name',
            'products.description',
            'products.brand',
            'products.is_variable',
            'products.is_green',
            'products.is_tracker',
            'products.is_prepay',
            'products.is_business',
            'products.is_restricted',
            'products.term',
            'products.available_from',
            'products.available_to',
            'products.created_at',
            'products.updated_at',
        ];
        $this->query = Product::select($selectColumns);
        return $this;
    }

    /**
     * addFilters
     *
     * @param string[] $filters
     * @return self
     */
    private function addFilters(array $filters): self
    {
        // Text filters
        if ($filters['code']        ) { $this->query->codeLike($filters['code']); }
        if ($filters['direction']   ) { $this->query->directionLike($filters['direction']); }
        if ($filters['full_name']   ) { $this->query->fullNameLike($filters['full_name']); }
        if ($filters['display_name']) { $this->query->displayNameLike($filters['display_name']); }
        if ($filters['description'] ) { $this->query->descriptionLike($filters['description']); }
        if ($filters['brand']       ) { $this->query->brandLike($filters['brand']); }

        // Boolean filters
        if ($filters['is_variable']   !== null) { $this->query->isVariable($filters['is_variable']); }
        if ($filters['is_green']      !== null) { $this->query->isGreen($filters['is_green']); }
        if ($filters['is_tracker']    !== null) { $this->query->isTracker($filters['is_tracker']); }
        if ($filters['is_prepay']     !== null) { $this->query->isPrepay($filters['is_prepay']); }
        if ($filters['is_business']   !== null) { $this->query->isBusiness($filters['is_business']); }
        if ($filters['is_restricted'] !== null) { $this->query->isRestricted($filters['is_restricted']); }

        return $this;
    }

    /**
     * addOrderBy
     *
     * @param string $sortCol
     * @param string $sortOrder
     * @return self
     */
    private function addOrderBy(string $sortCol = 'id', string $sortOrder = 'asc'): self
    {
        $this->query->orderBy($sortCol, $sortOrder);
        if ($sortCol !== 'id') { $this->query->orderBy('id', 'asc'); }
        return $this;
    }
}
