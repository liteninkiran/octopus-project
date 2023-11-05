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
    
    /**
     * scopeIsVariable
     *
     * @param Builder $query
     * @param bool $boolVal
     * @return Builder
     */
    public function scopeIsVariable(Builder $query, bool $boolVal): Builder
    {
        return $query->where('is_variable', $boolVal);
    }

    /**
     * scopeIsGreen
     *
     * @param Builder $query
     * @param bool $boolVal
     * @return Builder
     */
    public function scopeIsGreen(Builder $query, bool $boolVal): Builder
    {
        return $query->where('is_green', $boolVal);
    }

    /**
     * scopeIsTracker
     *
     * @param Builder $query
     * @param bool $boolVal
     * @return Builder
     */
    public function scopeIsTracker(Builder $query, bool $boolVal): Builder
    {
        return $query->where('is_tracker', $boolVal);
    }

    /**
     * scopeIsPrepay
     *
     * @param Builder $query
     * @param bool $boolVal
     * @return Builder
     */
    public function scopeIsPrepay(Builder $query, bool $boolVal): Builder
    {
        return $query->where('is_prepay', $boolVal);
    }

    /**
     * scopeIsBusiness
     *
     * @param Builder $query
     * @param bool $boolVal
     * @return Builder
     */
    public function scopeIsBusiness(Builder $query, bool $boolVal): Builder
    {
        return $query->where('is_business', $boolVal);
    }

    /**
     * scopeIsRestricted
     *
     * @param Builder $query
     * @param bool $boolVal
     * @return Builder
     */
    public function scopeIsRestricted(Builder $query, bool $boolVal): Builder
    {
        return $query->where('is_restricted', $boolVal);
    }

    /**
     * scopeAvailableOn
     *
     * @param Builder $query
     * @param string $date
     * @return Builder
     */
    public function scopeAvailableOn(Builder $query, string $date): Builder
    {
        return $query
            ->where('available_from', '<=', $date)
            ->where(function (Builder $query) use ($date) {
                $query->where('available_to', '>=', $date)
                    ->orWhereNull('available_to');
            });
    }
}
