<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SemesterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $semesters = [
            'Gasal 2023/2024',
            'Genap 2023/2024',
            'Gasal 2024/2025',
            'Genap 2024/2025',
        ];

        foreach ($semesters as $semesterName) {
            DB::table('semesters')->updateOrInsert(
                ['name' => $semesterName],
                [
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }
}
