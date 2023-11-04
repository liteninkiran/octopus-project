<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('direction');
            $table->string('full_name');
            $table->string('display_name');
            $table->string('description');
            $table->string('brand');
            $table->boolean('is_variable');
            $table->boolean('is_green');
            $table->boolean('is_tracker');
            $table->boolean('is_prepay');
            $table->boolean('is_business');
            $table->boolean('is_restricted');
            $table->integer('term')->nullable();
            $table->timestamp('available_from');
            $table->timestamp('available_to')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
