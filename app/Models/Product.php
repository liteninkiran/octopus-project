<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
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
        'available_from',
        'available_to',
    ];

    /******************    SCOPES    *******************/

    /**
     * scopeCodeLike
     *
     * @param Builder $query
     * @param string $code
     * @return Builder
     */
    public function scopeCodeLike(Builder $query, string $code): Builder
    {
        return $query->where('code', 'LIKE', '%' . $code . '%');
    }

    /**
     * scopeDirectionLike
     *
     * @param Builder $query
     * @param string $direction
     * @return Builder
     */
    public function scopeDirectionLike(Builder $query, string $direction): Builder
    {
        return $query->where('direction', 'LIKE', '%' . $direction . '%');
    }

    /**
     * scopeFullNameLike
     *
     * @param Builder $query
     * @param string $fullName
     * @return Builder
     */
    public function scopeFullNameLike(Builder $query, string $fullName): Builder
    {
        return $query->where('full_name', 'LIKE', '%' . $fullName . '%');
    }

    /**
     * scopeDisplayNameLike
     *
     * @param Builder $query
     * @param string $displayName
     * @return Builder
     */
    public function scopeDisplayNameLike(Builder $query, string $displayName): Builder
    {
        return $query->where('display_name', 'LIKE', '%' . $displayName . '%');
    }

    /**
     * scopeDescriptionLike
     *
     * @param Builder $query
     * @param string $description
     * @return Builder
     */
    public function scopeDescriptionLike(Builder $query, string $description): Builder
    {
        return $query->where('description', 'LIKE', '%' . $description . '%');
    }

    /**
     * scopeBrandLike
     *
     * @param Builder $query
     * @param string $brand
     * @return Builder
     */
    public function scopeBrandLike(Builder $query, string $brand): Builder
    {
        $brand = str_replace(' ', '_', $brand);
        return $query->where('brand', 'LIKE', '%' . $brand . '%');
    }
}
