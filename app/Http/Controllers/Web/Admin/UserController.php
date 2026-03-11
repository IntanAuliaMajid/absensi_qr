<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Redirect;


class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('admin/users/index', [
            'users' => $users
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/users/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'gender' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:1000',
            'password' => 'required|string|min:8|confirmed',
        ]);

        User::create($validated);

        return Redirect::route('admin.users.index')->with('success', 'User has been successfully added!');
    }

    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'gender' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:1000',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        if (empty($validated['password'])) {
            unset($validated['password']);
        }

        $user->update($validated);

        return Redirect::route('admin.users.index')->with('success', 'User successfully updated!');
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully!');
    }
}
