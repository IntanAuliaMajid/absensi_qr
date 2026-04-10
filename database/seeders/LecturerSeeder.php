<?php

namespace Database\Seeders;

use App\Models\Faculty;
use App\Models\Lecturer;
use App\Models\User;
use Illuminate\Database\Seeder;
use RuntimeException;

class LecturerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lecturers = [
            [
                'name' => 'Budi Santoso',
                'email' => 'budi.santoso@example.com',
                'address' => 'Jl. Merdeka No. 10, Bandung',
                'nip' => '198501012010011001',
                'faculty' => 'Fakultas Teknik (FT)',
            ],
            [
                'name' => 'Siti Rahmawati',
                'email' => 'siti.rahmawati@example.com',
                'address' => 'Jl. Diponegoro No. 22, Jakarta',
                'nip' => '198703152011022002',
                'faculty' => 'Fakultas Teknik (FT)',
            ],
            [
                'name' => 'Ahmad Fauzan',
                'email' => 'ahmad.fauzan@example.com',
                'address' => 'Jl. Sudirman No. 8, Surabaya',
                'nip' => '198909202012031003',
                'faculty' => 'Fakultas Ekonomi dan Bisnis (FEB)',
            ],
            [
                'name' => 'Dr. Rina Wijaya',
                'email' => 'rina.wijaya@example.com',
                'address' => 'Jl. Gatot Subroto No. 15, Bandung',
                'nip' => '197805101998032001',
                'faculty' => 'Fakultas Ekonomi dan Bisnis (FEB)',
            ],
            [
                'name' => 'Prof. Darmawan Jatmiko',
                'email' => 'darmawan.jatmiko@example.com',
                'address' => 'Jl. Jenderal Sudirman No. 50, Jakarta',
                'nip' => '195612151980121001',
                'faculty' => 'Fakultas Hukum (FH)',
            ],
            [
                'name' => 'Ibu Wahyu Astuti',
                'email' => 'wahyu.astuti@example.com',
                'address' => 'Jl. Ahmad Yani No. 25, Yogyakarta',
                'nip' => '196803062001032002',
                'faculty' => 'Fakultas Pertanian (FP)',
            ],
            [
                'name' => 'Dr. Hendri Sugiarto',
                'email' => 'hendri.sugiarto@example.com',
                'address' => 'Jl. Gatot Subroto No. 88, Medan',
                'nip' => '196501151989031003',
                'faculty' => 'Fakultas Pertanian (FP)',
            ],
            [
                'name' => 'Ir. Bambang Setiawan',
                'email' => 'bambang.setiawan@example.com',
                'address' => 'Jl. Terusan No. 12, Bandung',
                'nip' => '197207102002011001',
                'faculty' => 'Fakultas Ilmu Sosial dan Ilmu Budaya (FISIB)',
            ],
            [
                'name' => 'Dr. Endang Sukasih',
                'email' => 'endang.sukasih@example.com',
                'address' => 'Jl. Leuwi Panjang No. 7, Jakarta',
                'nip' => '196402151988022002',
                'faculty' => 'Fakultas Ilmu Sosial dan Ilmu Budaya (FISIB)',
            ],
            [
                'name' => 'Prof. Eddy Sutrisno',
                'email' => 'eddy.sutrisno@example.com',
                'address' => 'Jl. Lebak Bulus No. 33, Jakarta',
                'nip' => '194806201972031001',
                'faculty' => 'Fakultas Ilmu Pendidikan (FIP)',
            ],
            [
                'name' => 'Dr. Intan Kusuma',
                'email' => 'intan.kusuma@example.com',
                'address' => 'Jl. Bukit Indah No. 21, Bandung',
                'nip' => '196609051990022001',
                'faculty' => 'Fakultas Ilmu Pendidikan (FIP)',
            ],
            [
                'name' => 'Dr. Muhammad Rizki',
                'email' => 'muhammad.rizki@example.com',
                'address' => 'Jl. Cipari No. 555, Bandung',
                'nip' => '197011151999031002',
                'faculty' => 'Fakultas Keislaman (FKis)',
            ],
        ];

        foreach ($lecturers as $data) {
            $faculty = Faculty::query()
                ->where('name', $data['faculty'])
                ->first();

            if (! $faculty) {
                throw new RuntimeException("Faculty '{$data['faculty']}' not found. Run FacultySeeder first.");
            }

            $user = User::query()->updateOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'type' => 'lecturer',
                    'address' => $data['address'],
                    'password' => 'password123',
                    'email_verified_at' => now(),
                ]
            );

            if (! $user->hasRole('lecturer')) {
                $user->assignRole('lecturer');
            }

            Lecturer::query()->updateOrCreate(
                ['user_id' => $user->id],
                [
                    'nip' => $data['nip'],
                    'faculty_id' => $faculty->id,
                ]
            );
        }
    }
}
