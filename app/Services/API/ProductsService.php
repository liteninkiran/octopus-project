<?php

namespace App\Services\API;

// Illuminate
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Builder;

// Models
use App\Models\Product;

// Carbon
use Carbon\Carbon;

class ProductsService
{
    /** @var array $keyCols Columns used to uniquely identify a record */
    private array $keyCols = [
        'code' => 'code',
    ];

    /** @var string $url API URL */
    private string $url;

    /** @var array $columns Updateable columns */
    private array $columns = [ ];

    /** @var int $count Do not touch. */
    private int $count = 0;

    /** @var int $counter Do not touch. */
    private int $counter = 0;

    /** @var array $results Do not touch. */
    private array $results;

    /** @var int $page Do not touch. */
    private int $page = 0;

    /** @var int $created Do not touch. */
    private int $created = 0;

    /** @var int $updated Do not touch. */
    private int $updated = 0;
    
    /**
     * setUrl
     *
     * @param string|null $availableAt
     * @return self
     */
    public function setUrl(string | null $availableAt = null): self
    {
        $this->url = env('OCTOPUS_API_BASE_URL') . '/v1/products/';
        $this->url .= $availableAt ? '?available_at=' . $availableAt : '';
        return $this;
    }

    /**
     * execute
     *
     * @return void
     */
    public function execute(): void
    {
        $this->setColumns();
        $url = $this->url;
        do {
            $url = $this->storeData($url);
        } while ($url);
        info('Created ' . $this->created);
        info('Updated ' . $this->updated);
        $this->created = 0;
        $this->updated = 0;
    }

    /**
     * storeData
     *
     * @return string|null
     */
    private function storeData(string $url): string|null
    {
        $response = Http::accept('application/json')->get($url);
        $jsonResponse = $response->json();
        $this->count = $jsonResponse['count'];
        $this->results = $jsonResponse['results'];
        $this->createOrUpdateModels();
        return $jsonResponse['next'];
    }

    /**
     * createOrUpdateModels
     *
     * @return void
     */
    private function createOrUpdateModels(): void
    {
        foreach ($this->results as $result) {
            $this->createOrUpdateModel($result);
        }
    }

    /**
     * createOrUpdateModel
     *
     * @param array $result
     * @return void
     */
    private function createOrUpdateModel(array &$result): void
    {
        $this->counter++;
        $attributes = $this->getAttributes($result);
        $values = $this->getAttributeValues($result);
        $this->updateValues($values);
        $model = Product::firstOrNew($attributes, $values);
        $this->saveModel($model, $values);
    }

    /**
     * getAttributes
     *
     * @param array $result
     * @return array
     */
    private function getAttributes(array &$result): array
    {
        foreach ($this->keyCols as $key => $value) {
            $attributes[$key] = $result[$value];
        }
        return $attributes;
    }

    /**
     * setColumns
     *
     * @return void
     */
    private function setColumns(): void
    {
        // Find all database fields
        $this->columns = Schema::getColumnListing((new Product())->getTable());

        // Remove meta data fields
        $unsetColumns = [
            'id',
            'created_at',
            'updated_at',
        ];

        // Also remove key fields
        $unsetColumns = array_merge($unsetColumns, array_keys($this->keyCols));

        // Remove non-updateable columns from array
        foreach ($unsetColumns as $col) {
            if (($key = array_search($col, $this->columns)) !== false) {
                unset($this->columns[$key]);
            }
        }
    }

    /**
     * getAttributeValues
     *
     * @param array $result
     * @return array
     */
    private function getAttributeValues(array &$result): array
    {
        // Create associative array with key/value pairs, initialising value to NULL
        $values = array_fill_keys($this->columns, null);

        // Populate array with values from org array
        foreach ($values as $key => &$value) {
            $arrayKey = $key;
            if (array_key_exists($arrayKey, $result)) {
                $value = $result[$arrayKey];
                $value = $value === '' ? null : $value;
            }
        }

        // This is needed because the loop passed $value ByRef
        unset($value);

        // Return the associative array
        return $values;
    }

    /**
     * saveModel
     *
     * @param Product $model
     * @param array $values
     * @return void
     */
    private function saveModel(Product $model, array &$values): void
    {
        if(isset($model->id)) {
            foreach ($values as $key => $value) {
                $model->$key = $value;
            }
        } else {
            $this->created ++;
        }
        $model->save();
        if ($model->wasChanged()) {
            $this->updated ++;
        }
    }
    
    /**
     * updateValues
     *
     * @param array $values
     * @return void
     */
    private function updateValues(array &$values): void
    {
        $dateArray = [
            'available_from',
            'available_to',
        ];

        $boolArray = [
            'is_variable',
            'is_green',
            'is_tracker',
            'is_prepay',
            'is_business',
            'is_restricted',
        ];

        foreach ($dateArray as $value) {
            $values[$value] = $this->parseDate($values[$value]);
        }

        foreach ($boolArray as $value) {
            $values[$value] = $this->parseBool($values[$value]);
        }
    }
    
    /**
     * parseDate
     *
     * @param string|null $date
     * @return Carbon|null
     */
    private function parseDate(string | null $date): Carbon | null
    {
        return $date ? Carbon::parse($date) : null;
    }
    
    /**
     * parseBool
     *
     * @param bool $bool
     * @return int
     */
    private function parseBool(bool $bool): int
    {
        return $bool === true ? 1 : 0;
    }
}
