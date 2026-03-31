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
            'manage_roles',
            'manage_system',
            'manage_classes',
            'manage_meetings',
            'manage_attendance',
            'manage_faculties',
            'manage_study_programs',
            'manage_lecturers',
            'manage_admins',
            'manage_students'
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        $admin = Role::create(['name' => 'admin']);
        $lecturer = Role::create(['name' => 'lecturer']);
        $student = Role::create(['name' => 'student']);


        $admin->givePermissionTo(Permission::all());

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
