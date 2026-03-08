<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Models\User;
use Inertia\Inertia;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route ketika user belum verified tapi mencoba untuk membuka halaman lain
Route::get('/email/verify', function () {
    return response()->json([
        'message' => 'Your email is not verified yet. Please check your email.'
    ], 403);
})->name('verification.notice');

Route::post('/register', RegisterController::class);
Route::post('/login', LoginController::class);
Route::post('/logout', LogoutController::class)->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/dashboard', function () {
    if (!auth()->user()->hasVerifiedEmail()) {
        return response()->json([
            'message' => 'Email not verified'
        ], 403);
    }
    return response()->json([
        'message' => 'Welcome to dashboard'
    ]);
});
