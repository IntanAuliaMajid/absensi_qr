<?php

namespace Database\Seeders;

use App\Models\ClassRoom;
use App\Models\Lecturer;
use App\Models\Semester;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;
use RuntimeException;

class ClassRoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classes = [
            [
                'name' => 'RPL A',
                'study_program' => 'Informatics Engineering',
                'semester' => 'Gasal 2023/2024',
                'lecturer' => 'Budi Santoso',
                'room' => 'Ruang A101',
                'start_time' => '08:00',
                'end_time' => '09:40',
            ],
            [
                'name' => 'RPL B',
                'study_program' => 'Computer Science',
                'semester' => 'Gasal 2023/2024',
                'lecturer' => 'Siti Rahmawati',
                'room' => 'Ruang A102',
                'start_time' => '10:00',
                'end_time' => '11:40',
            ],
            [
                'name' => 'RPL C',
                'study_program' => 'Informatics Engineering',
                'semester' => 'Genap 2023/2024',
                'lecturer' => 'Ahmad Fauzan',
                'room' => 'Ruang B201',
                'start_time' => '08:00',
                'end_time' => '09:40',
            ],
            [
                'name' => 'RPL D',
                'study_program' => 'Computer Science',
                'semester' => 'Genap 2023/2024',
                'lecturer' => 'Budi Santoso',
                'room' => 'Ruang B202',
                'start_time' => '10:00',
                'end_time' => '11:40',
            ],
            [
                'name' => 'RPL E',
                'study_program' => 'Business Administration',
                'semester' => 'Gasal 2024/2025',
                'lecturer' => 'Siti Rahmawati',
                'room' => 'Ruang C301',
                'start_time' => '13:00',
                'end_time' => '14:40',
            ],
            [
                'name' => 'RPL F',
                'study_program' => 'Visual Communication Design',
                'semester' => 'Gasal 2024/2025',
                'lecturer' => 'Ahmad Fauzan',
                'room' => 'Ruang C302',
                'start_time' => '15:00',
                'end_time' => '16:40',
            ],
        ];

        foreach ($classes as $classData) {
            $studyProgram = StudyProgram::query()->where('name', $classData['study_program'])->first();

            if (! $studyProgram) {
                throw new RuntimeException("Study program '{$classData['study_program']}' not found. Run StudyProgramSeeder first.");
            }

            $semester = Semester::query()->where('name', $classData['semester'])->first();

            if (! $semester) {
                throw new RuntimeException("Semester '{$classData['semester']}' not found. Run SemesterSeeder first.");
            }

            $lecturer = Lecturer::query()
                ->whereHas('user', function ($query) use ($classData) {
                    $query->where('name', $classData['lecturer']);
                })
                ->first();

            if (! $lecturer) {
                throw new RuntimeException("Lecturer '{$classData['lecturer']}' not found. Run LecturerSeeder first.");
            }

            ClassRoom::query()->updateOrCreate(
                ['name' => $classData['name']],
                [
                    'study_program_id' => $studyProgram->id,
                    'semester_id' => $semester->id,
                    'lecturer_id' => $lecturer->id,
                    'room' => $classData['room'],
                    'start_time' => $classData['start_time'],
                    'end_time' => $classData['end_time'],
                ]
            );
        }
    }
}
