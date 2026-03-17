<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\Web\Admin\AdminController;
use App\Http\Controllers\Web\Admin\LecturerController;
use App\Http\Controllers\Web\Admin\RoleController;
use App\Http\Controllers\Web\Admin\StudentController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('dashboard', function () {
    return Inertia::render('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('matakuliah', function () {
    return Inertia::render('matakuliah');
})->middleware(['auth', 'verified'])->name('matakuliah');

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::resource('/roles', RoleController::class)->except(['show']);
    Route::resource('/students', StudentController::class)->except(['show']);
    Route::resource('/lecturers', LecturerController::class)->except(['show']);
    Route::resource('/admins', AdminController::class)->except(['show']);
});

require __DIR__ . '/settings.php';
