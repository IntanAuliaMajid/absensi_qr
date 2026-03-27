<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with('user')->get();

        return Inertia::render('admin/students/index', [
            'students' => $students,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/students/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'nim' => 'required|string|max:30|unique:students,nim',
            'gender' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:1000',
            'password' => 'required|string|min:8|confirmed',
        ]);

        DB::transaction(function () use ($validated) {
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'address' => $validated['address'] ?? null,
                'password' => $validated['password'],
                'type' => 'student',
            ]);

            Student::create([
                'user_id' => $user->id,
                'nim' => $validated['nim'],
                'gender' => $validated['gender'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
            ]);
        });

        return Redirect::route('admin.students.index')->with('success', 'Student has been successfully added!');
    }

    public function edit(Student $student)
    {
        $student->load('user');

        return Inertia::render('admin/students/edit', [
            'student' => $student,
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $student->load('user');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $student->user_id,
            'nim' => 'required|string|max:30|unique:students,nim,' . $student->id,
            'gender' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:1000',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $user = $student->user;
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->address = $validated['address'] ?? null;

        if (! empty($validated['password'])) {
            $user->password = $validated['password'];
        }

        $user->save();

        $student->nim = $validated['nim'];
        $student->gender = $validated['gender'] ?? null;
        $student->date_of_birth = $validated['date_of_birth'] ?? null;
        $student->save();

        return Redirect::route('admin.students.index')->with('success', 'Student successfully updated!');
    }

    public function destroy(Student $student)
    {
        $student->load('user');
        $student->user->delete();

        return redirect()->back()->with('success', 'Student deleted successfully!');
    }
}
