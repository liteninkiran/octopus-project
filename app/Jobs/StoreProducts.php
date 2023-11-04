<?php

namespace App\Jobs;

// Illuminate
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

// Services
use App\Services\API\ProductsService;

class StoreProducts implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * __construct
     *
     * @return void
     */
    public function __construct()
    {

    }

    /**
     * handle
     *
     * @param ProductsService $productsService
     * @return void
     */
    public function handle(ProductsService $productsService): void
    {
        info('Started running Get Products job');
        $productsService->execute();
        info('Finished running Get Products job');
    }
}
