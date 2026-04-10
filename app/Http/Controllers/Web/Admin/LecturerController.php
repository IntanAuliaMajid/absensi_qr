<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\Lecturer;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class LecturerController extends Controller
{
    public function index()
    {
        $lecturers = Lecturer::with(['user', 'faculty'])->get();

        return Inertia::render('admin/lecturers/index', [
            'lecturers' => $lecturers,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/lecturers/create', [
            'faculties' => Faculty::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'nip' => 'required|string|max:30|unique:lecturers,nip',
            'faculty_id' => 'required|exists:faculties,id',
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
                'faculty_id' => $validated['faculty_id'],
            ]);
        });

        return Redirect::route('admin.lecturers.index')->with('success', 'Lecturer has been successfully added!');
    }

    public function edit(Lecturer $lecturer)
    {
        $lecturer->load(['user', 'faculty']);

        return Inertia::render('admin/lecturers/edit', [
            'lecturer' => $lecturer,
            'faculties' => Faculty::all(),
        ]);
    }

    public function update(Request $request, Lecturer $lecturer)
    {
        $lecturer->load(['user', 'faculty']);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $lecturer->user->id,
            'nip' => 'required|string|max:30|unique:lecturers,nip,' . $lecturer->id,
            'faculty_id' => 'required|exists:faculties,id',
            'address' => 'nullable|string|max:1000',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        DB::transaction(function () use ($validated, $lecturer) {
            $user = $lecturer->user;

            $user->fill([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'address' => $validated['address'] ?? null,
            ]);

            if (! empty($validated['password'])) {
                $user['password'] = $validated['password'];
            }

            $user->save();

            $lecturer->update([
                'nip' => $validated['nip'],
                'faculty_id' => $validated['faculty_id'],
            ]);
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
