<?php

namespace Database\Seeders;

use App\Models\Building;
use Illuminate\Database\Seeder;

class BuildingSeeder extends Seeder
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
            Building::query()->firstOrCreate([
                'name' => $buildingName,
            ]);
        }
    }
}
