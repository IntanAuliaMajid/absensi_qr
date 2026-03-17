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
        Schema::table('students', function (Blueprint $table) {
            if (! Schema::hasColumn('students', 'nim')) {
                $table->string('nim', 30)->unique();
            }

            if (! Schema::hasColumn('students', 'gender')) {
                $table->string('gender')->nullable();
            }

            if (! Schema::hasColumn('students', 'date_of_birth')) {
            $table->date('date_of_birth')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            if (Schema::hasColumn('students', 'nim')) {
                $table->dropColumn('nim');
            }

            if (Schema::hasColumn('students', 'gender')) {
                $table->dropColumn('gender');
            }

            if (Schema::hasColumn('students', 'date_of_birth')) {
                $table->dropColumn('date_of_birth');
            }
        });
    }
};
