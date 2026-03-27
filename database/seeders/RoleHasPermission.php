<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleHasPermission extends Seeder
{
    public function run(): void
    {
        $permissions = [
            'manage_system',
            'manage_classes',
            'manage_meetings',
            'manage_attendance',
            'scan_qr',
            'view_attendance',
            'view_own_attendance',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $admin = Role::create(['name' => 'admin']);
        $lecturer = Role::create(['name' => 'lecturer']);
        $student = Role::create(['name' => 'student']);


        $admin->givePermissionTo(Permission::all());

        $lecturer->givePermissionTo([
            'manage_classes',
            'manage_meetings',
            'manage_attendance',
            'view_attendance',
        ]);

        $student->givePermissionTo([
            'scan_qr',
            'view_own_attendance',
        ]);


        $user = User::firstOrCreate([
            'name' => 'Intan Aulia Majid',
            'email' => 'intanadmin@gmail.com',
            'password' => 'intannn1',
            'email_verified_at' => now()
        ]);

        $user->assignRole('admin');
        $user->type = 'admin';
        $user->save();

        Admin::firstOrCreate([
            'user_id' => $user->id,
        ]);
    }
}
