<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;

class StudyProgramSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $programsByFaculty = [
            'Fakultas Teknik (FT)' => [
                'Teknik Informatika',
                'Teknik Industri',
                'Teknik Elektro',
                'Teknik Mekatronika',
                'Sistem Informasi',
            ],
            'Fakultas Ekonomi dan Bisnis (FEB)' => [
                'Manajemen',
                'Akuntansi',
                'Ekonomi Pembangunan',
            ],
            'Fakultas Hukum (FH)' => [
                'Ilmu Hukum',
            ],
            'Fakultas Pertanian (FP)' => [
                'Agroteknologi',
                'Agribisnis',
                'Teknologi Industri Pertanian',
                'Ilmu Kelautan',
                'Manajemen Sumberdaya Perairan',
            ],
            'Fakultas Ilmu Sosial dan Ilmu Budaya (FISIB)' => [
                'Ilmu Komunikasi',
                'Sosiologi',
                'Psikologi',
                'Sastra Inggris',
            ],
            'Fakultas Ilmu Pendidikan (FIP)' => [
                'PGSD',
                'PGPAUD',
                'Pendidikan Informatika',
                'Pendidikan IPA',
                'Pendidikan Bahasa Indonesia',
            ],
            'Fakultas Keislaman (FKis)' => [
                'Hukum Bisnis Syariah',
                'Ekonomi Syariah',
            ],
        ];

        foreach ($programsByFaculty as $facultyName => $programs) {
            $faculty = Faculty::query()->where('name', $facultyName)->first();

            if (! $faculty) {
                continue;
            }

            foreach ($programs as $programName) {
                StudyProgram::query()->updateOrCreate(
                    ['name' => $programName],
                    ['faculty_id' => $faculty->id]
                );
            }
        }
    }
}
