<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            'Fakultas Teknik (FT)',
            'Fakultas Ekonomi dan Bisnis (FEB)',
            'Fakultas Hukum (FH)',
            'Fakultas Pertanian (FP)',
            'Fakultas Ilmu Sosial dan Ilmu Budaya (FISIB)',
            'Fakultas Ilmu Pendidikan (FIP)',
            'Fakultas Keislaman (FKis)',
        ];

        foreach ($faculties as $name) {
            Faculty::updateOrCreate(['name' => $name]);
        }
    }
}
