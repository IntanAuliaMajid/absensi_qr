<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Lecturer;
use App\Models\Room;
use App\Models\Semester;
use App\Models\StudyProgram;
use Illuminate\Database\Seeder;
use RuntimeException;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $semester = Semester::query()->where('name', 'Gasal 2024/2025')->first();

        if (! $semester) {
            throw new RuntimeException("Semester 'Gasal 2024/2025' not found. Run SemesterSeeder first.");
        }

        $studyPrograms = StudyProgram::query()->orderBy('id')->get();
        $lecturers = Lecturer::query()->orderBy('id')->get();
        $rooms = Room::query()->with('building')->orderBy('id')->get();

        if ($studyPrograms->isEmpty()) {
            throw new RuntimeException('No study programs found. Run StudyProgramSeeder first.');
        }

        if ($lecturers->isEmpty()) {
            throw new RuntimeException('No lecturers found. Run LecturerSeeder first.');
        }

        if ($rooms->isEmpty()) {
            throw new RuntimeException('No rooms found. Run RoomSeeder first.');
        }

        $subjectPool = [
            'Algoritma & Struktur Data',
            'Basis Data',
            'Jaringan Komputer',
            'Rekayasa Perangkat Lunak',
            'Kecerdasan Buatan',
            'Matematika Diskrit',
            'Statistika',
            'Sistem Operasi',
            'Manajemen Proyek',
            'Metodologi Penelitian',
            'Kewirausahaan',
            'Etika Profesi',
        ];

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

        $timeSlots = [
            ['start' => '08:00', 'end' => '09:40'],
            ['start' => '10:00', 'end' => '11:40'],
            ['start' => '13:00', 'end' => '14:40'],
            ['start' => '15:00', 'end' => '16:40'],
        ];

        $courseIndex = 0;

        foreach ($studyPrograms as $studyProgram) {
            for ($i = 0; $i < 4; $i++) {
                $subjectName = $subjectPool[$courseIndex % count($subjectPool)];

                // Nama course unique secara global
                $courseName = sprintf('%s %d', $subjectName, $courseIndex + 1);

                $lecturer = $lecturers[$courseIndex % $lecturers->count()];
                $room = $rooms[$courseIndex % $rooms->count()];
                $slot = $timeSlots[$courseIndex % count($timeSlots)];
                $day = $days[$courseIndex % count($days)];

                $roomLabel = trim(
                    ($room->building?->name ? $room->building->name . ' - ' : '') . $room->name
                );

                Course::query()->updateOrCreate(
                    ['name' => $courseName],
                    [
                        'study_program_id' => $studyProgram->id,
                        'semester_id' => $semester->id,
                        'lecturer_id' => $lecturer->id,
                        'room_id' => $room->id,
                        'room' => $roomLabel,
                        'day' => $day,
                        'start_time' => $slot['start'],
                        'end_time' => $slot['end'],
                    ]
                );

                $courseIndex++;
            }
        }
    }
}
