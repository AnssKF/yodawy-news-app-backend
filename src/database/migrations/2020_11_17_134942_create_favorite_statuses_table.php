<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFavoriteStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('favorite_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('favorite_id');
            $table->boolean('posted')->default(false);
            $table->timestamps();

            $table->foreign('favorite_id')->references('id')->on('favorites');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('favorite_statuses');
    }
}
