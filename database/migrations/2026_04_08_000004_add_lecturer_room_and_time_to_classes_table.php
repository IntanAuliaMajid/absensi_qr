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
            $table->foreignId('lecturer_id')
                ->nullable()
                ->after('semester_id')
                ->constrained()
                ->nullOnDelete();
            $table->string('room', 100)->nullable()->after('lecturer_id');
            $table->time('start_time')->nullable()->after('room');
            $table->time('end_time')->nullable()->after('start_time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('classes', function (Blueprint $table) {
            $table->dropConstrainedForeignId('lecturer_id');
            $table->dropColumn(['room', 'start_time', 'end_time']);
        });
    }
};
