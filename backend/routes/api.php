<?php

use App\Http\Controllers\QuizController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get(
    '/quiz',
    [
        QuizController::class,
        'getQuestionByNumber'
    ]
);

 Route::middleware('auth:sanctum')->group(function () {
     Route::resource('/user', UserController::class);
 });
