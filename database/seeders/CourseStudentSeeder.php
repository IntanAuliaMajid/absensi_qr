<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Student;
use Illuminate\Database\Seeder;

class CourseStudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = Student::query()
            ->whereNotNull('study_program_id')
            ->orderBy('id')
            ->get();

        foreach ($students as $student) {
            $classIds = Course::query()
                ->where('study_program_id', $student->study_program_id)
                ->orderBy('id')
                ->limit(2)
                ->pluck('id')
                ->all();

            if ($classIds === []) {
                continue;
            }

            $student->courses()->syncWithoutDetaching($classIds);
        }
    }
}
