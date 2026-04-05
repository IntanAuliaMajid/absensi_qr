<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\StudyProgram;
use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = [
            [
                'name' => 'Andi Pratama',
                'email' => 'andi.student@example.com',
                'address' => 'Jl. Cendana No. 11, Bandung',
                'nim' => '2022001001',
                'study_program' => 'Informatics Engineering',
                'gender' => 'male',
                'date_of_birth' => '2003-01-15',
            ],
            [
                'name' => 'Dewi Lestari',
                'email' => 'dewi.student@example.com',
                'address' => 'Jl. Melati No. 19, Jakarta',
                'nim' => '2022001002',
                'study_program' => 'Computer Science',
                'gender' => 'female',
                'date_of_birth' => '2003-06-27',
            ],
            [
                'name' => 'Rizky Maulana',
                'email' => 'rizky.student@example.com',
                'address' => 'Jl. Kenanga No. 5, Surabaya',
                'nim' => '2022001003',
                'study_program' => 'Business Administration',
                'gender' => 'male',
                'date_of_birth' => '2002-11-03',
            ],
        ];

        foreach ($students as $data) {
            $studyProgram = StudyProgram::query()
                ->where('name', $data['study_program'])
                ->first();

            if (! $studyProgram) {
                throw new RuntimeException("Study program '{$data['study_program']}' not found. Run StudyProgramSeeder first.");
            }

            $user = User::query()->updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'type' => 'student',
                    'address' => $data['address'],
                    'password' => 'password123',
                    'email_verified_at' => now(),
                ]
            );

            if (! $user->hasRole('student')) {
                $user->assignRole('student');
            }

            Student::query()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'study_program_id' => $studyProgram->id,
                    'nim' => $data['nim'],
                    'gender' => $data['gender'],
                    'date_of_birth' => $data['date_of_birth'],
                ]
            );
        }
    }
}
