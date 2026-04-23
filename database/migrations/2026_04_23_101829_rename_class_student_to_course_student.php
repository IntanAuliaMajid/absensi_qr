<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::rename('class_student', 'course_student');
    }

    public function down(): void
    {
        Schema::rename('course_student', 'class_student');
    }
};
