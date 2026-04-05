<?php

namespace Database\Seeders;

use App\Models\Lecturer;
use App\Models\User;
use Illuminate\Database\Seeder;

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
            ],
            [
                'name' => 'Siti Rahmawati',
                'email' => 'siti.lecturer@example.com',
                'address' => 'Jl. Diponegoro No. 22, Jakarta',
                'nip' => '198703152011022002',
            ],
            [
                'name' => 'Ahmad Fauzan',
                'email' => 'ahmad.lecturer@example.com',
                'address' => 'Jl. Sudirman No. 8, Surabaya',
                'nip' => '198909202012031003',
            ],
        ];

        foreach ($lecturers as $data) {
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
                ['nip' => $data['nip']]
            );
        }
    }
}
