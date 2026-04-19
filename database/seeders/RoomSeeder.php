<?php

namespace Database\Seeders;

use App\Models\Building;
use App\Models\Room;
use Illuminate\Database\Seeder;

class RoomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roomsByBuilding = [
            'Gedung A' => ['A101', 'A102', 'A201', 'A202'],
            'Gedung B' => ['B101', 'B102', 'B201', 'B202'],
            'Gedung C' => ['C101', 'C102', 'C201', 'C202'],
            'Gedung D' => ['D101', 'D102', 'D201', 'D202'],
            'Laboratorium Terpadu' => ['Lab Komputer 1', 'Lab Komputer 2', 'Lab Jaringan', 'Lab Multimedia'],
        ];

        foreach ($roomsByBuilding as $buildingName => $rooms) {
            $building = Building::query()->firstOrCreate([
                'name' => $buildingName,
            ]);

            foreach ($rooms as $roomName) {
                Room::query()->updateOrCreate(
                    [
                        'name' => $roomName,
                        'building_id' => $building->id,
                    ],
                    [
                        'building_id' => $building->id,
                    ]
                );
            }
        }
    }
}
