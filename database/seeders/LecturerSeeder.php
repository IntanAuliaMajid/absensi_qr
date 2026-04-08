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
                'email' => 'budi.lecturer@example.com',
                'address' => 'Jl. Merdeka No. 10, Bandung',
                'nip' => '198501012010011001',
                'faculty' => 'Engineering',
            ],
            [
                'name' => 'Siti Rahmawati',
                'email' => 'siti.lecturer@example.com',
                'address' => 'Jl. Diponegoro No. 22, Jakarta',
                'nip' => '198703152011022002',
                'faculty' => 'Science',
            ],
            [
                'name' => 'Ahmad Fauzan',
                'email' => 'ahmad.lecturer@example.com',
                'address' => 'Jl. Sudirman No. 8, Surabaya',
                'nip' => '198909202012031003',
                'faculty' => 'Business',
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
