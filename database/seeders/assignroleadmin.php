<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class assignroleadmin extends Seeder
{
    public function run(): void
    {
        // Cari user berdasarkan email
        $user = User::where('email', 'intan432432@gmail.com')->first();

        if ($user) {

            // Pastikan role admin ada
            $role = Role::firstOrCreate(['name' => 'admin']);

            // Assign role admin ke user
            $user->assignRole($role);

            echo "User berhasil dijadikan admin.";
        } else {
            echo "User dengan email tersebut tidak ditemukan.";
        }
    }
}