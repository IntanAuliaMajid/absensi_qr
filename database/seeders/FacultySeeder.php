<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Faculty;

class FacultySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faculties = [
            'Engineering',
            'Science',
            'Business',
            'Arts',
            'Law',
            'Medicine',
        ];

        foreach ($faculties as $name) {
            Faculty::create(['name' => $name]);
        }
    }
}
