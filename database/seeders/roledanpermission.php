<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class roledanpermission extends Seeder
{
    public function run(): void
    {
        // ======================
        // BUAT PERMISSION
        // ======================
        $permissions = [
            'manage_system',
            'kelola_kelas',
            'kelola_pertemuan',
            'kelola_absensi',
            'scan_qr',
            'lihat_absensi',
            'lihat_absensi_sendiri',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // ======================
        // BUAT ROLE
        // ======================
        $admin = Role::create(['name' => 'admin']);
        $dosen = Role::create(['name' => 'dosen']);
        $mahasiswa = Role::create(['name' => 'mahasiswa']);

        // ======================
        // BERIKAN PERMISSION KE ROLE
        // ======================

        // Admin bisa semua
        $admin->givePermissionTo(Permission::all());

        // Dosen
        $dosen->givePermissionTo([
            'kelola_kelas',
            'kelola_pertemuan',
            'kelola_absensi',
            'lihat_absensi',
        ]);

        // Mahasiswa
        $mahasiswa->givePermissionTo([
            'scan_qr',
            'lihat_absensi_sendiri',
        ]);
    }
}