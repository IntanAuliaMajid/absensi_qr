<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleHasPermission::class,
            FacultySeeder::class,
            StudyProgramSeeder::class,
            SemesterSeeder::class,
            LecturerSeeder::class,
            BuildingSeeder::class,
            RoomSeeder::class,
            CourseSeeder::class,
            StudentSeeder::class,
            ClassStudentSeeder::class,
        ]);
    }
}
