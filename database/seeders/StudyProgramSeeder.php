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
            'Engineering' => 'Informatics Engineering',
            'Science' => 'Computer Science',
            'Business' => 'Business Administration',
            'Arts' => 'Visual Communication Design',
            'Law' => 'Law Studies',
            'Medicine' => 'Medical Education',
        ];

        foreach ($programsByFaculty as $facultyName => $programName) {
            $faculty = Faculty::query()->where('name', $facultyName)->first();

            if (! $faculty) {
                continue;
            }

            StudyProgram::query()->updateOrCreate(
                ['faculty_id' => $faculty->id],
                ['name' => $programName]
            );
        }
    }
}
