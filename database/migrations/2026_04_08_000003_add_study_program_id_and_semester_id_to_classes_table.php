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
        Schema::table('classes', function (Blueprint $table) {
            $table->foreignId('study_program_id')
                ->nullable()
                ->after('name')
                ->constrained()
                ->nullOnDelete();

            $table->foreignId('semester_id')
                ->nullable()
                ->after('study_program_id')
                ->constrained()
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('study_program_id');
            $table->dropConstrainedForeignId('semester_id');
        });
    }
};
