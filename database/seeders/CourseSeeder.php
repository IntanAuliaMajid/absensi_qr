<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Faculty;
use App\Models\Lecturer;
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
        $catalog = [
            'Fakultas Teknik (FT)' => [
                'Teknik Informatika' => [
                    'Algoritma & Struktur Data',
                    'Basis Data',
                    'Jaringan Komputer',
                    'Rekayasa Perangkat Lunak',
                    'Kecerdasan Buatan',
                ],
                'Teknik Industri' => [
                    'Pengantar Teknik Industri',
                    'Ekonomi Teknik',
                    'Perencanaan & Pengendalian Produksi',
                    'Ergonomi',
                ],
                'Teknik Elektro' => [
                    'Rangkaian Listrik',
                    'Sistem Digital',
                    'Elektronika',
                    'Sistem Kontrol',
                    'Medan Elektromagnetik',
                ],
                'Teknik Mekatronika' => [
                    'Kinematika & Dinamika',
                    'Robotika',
                    'Sensor & Aktuator',
                    'Mikroprosesor',
                ],
                'Sistem Informasi' => [
                    'Analisis Proses Bisnis',
                    'Manajemen Proyek TI',
                    'E-Business',
                    'Tata Kelola IT',
                ],
            ],
            'Fakultas Ekonomi dan Bisnis (FEB)' => [
                'Manajemen' => [
                    'Pengantar Manajemen',
                    'Perilaku Organisasi',
                    'Manajemen Pemasaran',
                    'Manajemen Keuangan',
                    'Kewirausahaan',
                ],
                'Akuntansi' => [
                    'Akuntansi Keuangan',
                    'Akuntansi Biaya',
                    'Auditing',
                    'Perpajakan',
                    'Sistem Informasi Akuntansi',
                ],
                'Ekonomi Pembangunan' => [
                    'Ekonomi Mikro & Makro',
                    'Ekonomi Internasional',
                    'Sejarah Pemikiran Ekonomi',
                    'Ekonometrika',
                ],
            ],
            'Fakultas Hukum (FH)' => [
                'Ilmu Hukum' => [
                    'Hukum Pidana',
                    'Hukum Perdata',
                    'Hukum Tata Negara',
                    'Hukum Administrasi Negara',
                    'Hukum Internasional',
                ],
            ],
            'Fakultas Pertanian (FP)' => [
                'Agroteknologi' => [
                    'Dasar Agronomi',
                    'Ilmu Tanah',
                    'Perlindungan Tanaman',
                    'Pemuliaan Tanaman',
                ],
                'Agribisnis' => [
                    'Ekonomi Pertanian',
                    'Manajemen Agribisnis',
                    'Tata Niaga Pertanian',
                    'Sosiologi Pertanian',
                ],
                'Teknologi Industri Pertanian' => [
                    'Mikrobiologi Industri',
                    'Satuan Operasi',
                    'Pengendalian Mutu',
                    'Manajemen Limbah',
                ],
                'Ilmu Kelautan' => [
                    'Biologi Laut',
                    'Oseanografi',
                    'Selam Ilmiah',
                    'Ekologi Pesisir',
                ],
                'Manajemen Sumberdaya Perairan' => [
                    'Ikhtiologi',
                    'Limnologi',
                    'Konservasi Perairan',
                    'Budidaya Perairan',
                ],
            ],
            'Fakultas Ilmu Sosial dan Ilmu Budaya (FISIB)' => [
                'Ilmu Komunikasi' => [
                    'Pengantar Ilmu Komunikasi',
                    'Teori Komunikasi',
                    'Jurnalistik',
                    'Public Relations',
                    'Komunikasi Massa',
                ],
                'Sosiologi' => [
                    'Pengantar Sosiologi',
                    'Teori Sosiologi Klasik & Modern',
                    'Sosiologi Pedesaan',
                    'Masalah Sosial',
                ],
                'Psikologi' => [
                    'Psikologi Umum',
                    'Psikologi Perkembangan',
                    'Psikologi Sosial',
                    'Biopsikologi',
                    'Psikometri',
                ],
                'Sastra Inggris' => [
                    'Listening & Speaking',
                    'Reading & Writing',
                    'Introduction to Literature',
                    'Linguistics',
                    'Translation',
                ],
            ],
            'Fakultas Ilmu Pendidikan (FIP)' => [
                'PGSD' => [
                    'Strategi Pembelajaran SD',
                    'Pendidikan Matematika/IPA/IPS SD',
                    'Psikologi Pendidikan',
                ],
                'PGPAUD' => [
                    'Bermain dan Permainan',
                    'Perkembangan Anak Usia Dini',
                    'Manajemen PAUD',
                ],
                'Pendidikan Informatika' => [
                    'Media Pembelajaran',
                    'Pemrograman Dasar',
                    'Desain Grafis',
                    'Sistem Operasi',
                ],
                'Pendidikan IPA' => [
                    'Biologi Umum',
                    'Kimia Dasar',
                    'Fisika Dasar',
                    'Strategi Pembelajaran IPA',
                ],
                'Pendidikan Bahasa Indonesia' => [
                    'Linguistik Umum',
                    'Menyimak',
                    'Berbicara',
                    'Membaca',
                    'Menulis',
                ],
            ],
            'Fakultas Keislaman (FKis)' => [
                'Hukum Bisnis Syariah' => [
                    'Fiqh Muamalah',
                    'Hukum Perbankan Syariah',
                    'Hukum Arbitrase Islam',
                    'Fatwa Ekonomi Syariah',
                ],
                'Ekonomi Syariah' => [
                    'Sejarah Pemikiran Ekonomi Islam',
                    'Lembaga Keuangan Syariah',
                    'Zakat & Wakaf',
                    'Mikro/Makro Ekonomi Islam',
                ],
            ],
        ];

        $semester = Semester::query()->where('name', 'Gasal 2024/2025')->first();

        if (! $semester) {
            throw new RuntimeException("Semester 'Gasal 2024/2025' not found. Run SemesterSeeder first.");
        }

        $lecturers = Lecturer::query()->orderBy('id')->get();

        if ($lecturers->isEmpty()) {
            throw new RuntimeException('No lecturers found. Run LecturerSeeder first.');
        }

        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        $timeSlots = [
            ['start' => '08:00', 'end' => '09:40'],
            ['start' => '10:00', 'end' => '11:40'],
            ['start' => '13:00', 'end' => '14:40'],
            ['start' => '15:00', 'end' => '16:40'],
        ];

        $classIndex = 0;

        foreach ($catalog as $facultyName => $studyPrograms) {
            $faculty = Faculty::query()->firstOrCreate(['name' => $facultyName]);

            foreach ($studyPrograms as $programName => $subjects) {
                $studyProgram = StudyProgram::query()->updateOrCreate(
                    ['name' => $programName],
                    ['faculty_id' => $faculty->id]
                );

                $slotIndex = 0;

                foreach ($subjects as $subjectName) {

                    $dayIndex = intdiv($slotIndex, 2) % count($days);
                    $day = $days[$dayIndex];
                    $slot = $timeSlots[$slotIndex % count($timeSlots)];

                    $lecturer = $lecturers[$classIndex % $lecturers->count()];
                    $room = sprintf('Ruang %s%02d', chr(65 + ($classIndex % 6)), ($classIndex % 20) + 1);

                    Course::query()->updateOrCreate(
                        ['name' => $subjectName],
                        [
                            'study_program_id' => $studyProgram->id,
                            'semester_id' => $semester->id,
                            'lecturer_id' => $lecturer->id,
                            'room' => $room,
                            'day' => $day,
                            'start_time' => $slot['start'],
                            'end_time' => $slot['end'],
                        ]
                    );

                    $slotIndex++;
                    $classIndex++;
                }
            }
        }
    }
}
