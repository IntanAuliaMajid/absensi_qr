<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('course_student', 'class_id')) {
            Schema::table('course_student', function (Blueprint $table) {
                $table->renameColumn('class_id', 'course_id');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('course_student', 'course_id')) {
            Schema::table('course_student', function (Blueprint $table) {
                $table->renameColumn('course_id', 'class_id');
            });
        }
    }
};
