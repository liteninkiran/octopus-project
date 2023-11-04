<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
