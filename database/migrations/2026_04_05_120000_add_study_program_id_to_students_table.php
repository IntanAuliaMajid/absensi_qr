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
            if (! Schema::hasColumn('students', 'study_program_id')) {
                $table->foreignId('study_program_id')
                    ->nullable()
                    ->after('user_id')
                    ->constrained('study_programs')
                    ->cascadeOnUpdate()
                    ->restrictOnDelete();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            if (Schema::hasColumn('students', 'study_program_id')) {
                $table->dropConstrainedForeignId('study_program_id');
            }
        });
    }
};
