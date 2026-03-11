<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;

class RoleController extends Controller
{
    // untuk menampilkan halaman index crud role
    public function index()
    {
        // mengambil data kecuali admin
        $roles = Role::select('id', 'name')->where('name', '!=', 'admin')->get();
        
        // return halaman index dan kirim data roles
        return Inertia::render('admin/roles/index', [
            'roles' => $roles
        ]);
    }

    public function create()
    {
        // menampilkan halaman create role
        return Inertia::render('admin/roles/create');
    }

    public function store(Request $request)
    {
        // validasi nama role baru
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name',
        ]);

        // create data valid
        Role::create($validated);

        return Redirect::route('admin.roles.index')->with('success', 'Role has been successfully added!');
    }

    public function edit(Role $role)
    {
        return Inertia::render('admin/roles/edit', [
            'role' => $role
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $role->id,
        ]);

        $role->update($validated);

        return Redirect::route('admin.roles.index')->with('success', 'Role updated succesfully!');
    }

    public function destroy(Role $role)
    {
        $role->delete();

        return Redirect::route('admin.roles.index')->with('success', 'Role deleted successfully!');
    }
}
