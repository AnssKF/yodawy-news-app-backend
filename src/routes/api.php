<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


// Auth Routes
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\FavoriteController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/news', [NewsController::class, 'index']);

Route::middleware(['auth:api'])->group(function () {
    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'create']);
    Route::delete('/favorites', [FavoriteController::class, 'destroy']);
});