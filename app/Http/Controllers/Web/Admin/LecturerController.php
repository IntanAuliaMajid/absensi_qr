<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class LecturerController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::with('user')->get();

        return Inertia::render('admin/lecturers/index', [
            'lecturers' => $lecturers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/lecturers/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'nip' => 'required|string|max:30|unique:lecturers,nip',
            'address' => 'nullable|string|max:1000',
            'password' => 'required|string|min:8|confirmed',
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'address' => $validated['address'] ?? null,
                'password' => $validated['password'],
                'type' => 'lecturer',
            ]);

            Lecturer::create([
                'user_id' => $user->id,
                'nip' => $validated['nip'],
            ]);
        });

        return Redirect::route('admin.lecturers.index')->with('success', 'Lecturer has been successfully added!');
    }

    public function edit(Lecturer $lecturer)
    {
        $lecturer->load('user');

        return Inertia::render('admin/lecturers/edit', [
            'lecturer' => $lecturer,
        ]);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $lecturer->load('user');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $lecturer->user_id,
            'nip' => 'required|string|max:30|unique:lecturers,nip,' . $lecturer->id,
            'address' => 'nullable|string|max:1000',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        DB::transaction(function () use ($validated, $request, $lecturer) {
            $user = $lecturer->user;
            $user->name = $validated['name'];
            $user->email = $validated['email'];
            $user->address = $validated['address'] ?? null;

            if (! empty($validated['password'])) {
                $user->password = $validated['password'];
            }

            if ($user->isDirty('email')) {
                $user->email_verified_at = null;
            }

            $user->save();

            $lecturer->nip = $validated['nip'];
            $lecturer->save();
        });

        return Redirect::route('admin.lecturers.index')->with('success', 'Lecturer successfully updated!');
    }

    public function destroy(Lecturer $lecturer)
    {
        DB::transaction(function () use ($lecturer) {
            $lecturer->delete();
            $lecturer->user->delete();
        });

        return redirect()->back()->with('success', 'Lecturer deleted successfully!');
    }
}
