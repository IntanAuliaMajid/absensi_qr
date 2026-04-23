<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $buildings = [
            'Gedung A',
            'Gedung B',
            'Gedung C',
            'Gedung D',
            'Laboratorium Terpadu',
        ];

        foreach ($buildings as $buildingName) {
            Location::query()->firstOrCreate([
                'name' => $buildingName,
            ]);
        }
    }
}
