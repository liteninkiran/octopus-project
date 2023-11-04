<?php

namespace App\Jobs;

use DateTime;
use DatePeriod;
use DateInterval;

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
        $dateRange = $this->getDateRange();
        foreach ($dateRange as $date) {
            $availableAt = $date->format('Y-m-d\TH:i:sp');
            info('Getting products available at ' . $date->format('Y-m-d'));
            $productsService->setUrl($availableAt)->execute();
        }
        info('Getting active products');
        $productsService->setUrl()->execute();
        info('Finished running Get Products job');
    }

    private function getDateRange(): DatePeriod
    {
        $end = date('Y-m-01');
        $start = date('Y-m-d', strtotime($end . ' -1 year'));
        $startDate = date_create($start);
        $endDate = date_create($end);
        $interval = new DateInterval('P1M');
        return new DatePeriod($startDate, $interval, $endDate);
    }
}
