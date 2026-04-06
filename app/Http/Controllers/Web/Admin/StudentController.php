<?php

namespace App\Http\Controllers\Web\Admin;

use App\Events\EmailChanged;
use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\StudyProgram;
use App\Models\User;
use App\Notifications\PendingEmailChangeVerificationNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification;

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
        return Inertia::render('admin/students/create', [
            'studyPrograms' => StudyProgram::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email',
            'nim' => 'required|string|max:30|unique:students,nim',
            'study_program_id' => 'required|integer|exists:study_programs,id',
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
                'study_program_id' => $validated['study_program_id'],
                'gender' => $validated['gender'] ?? null,
                'date_of_birth' => $validated['date_of_birth'] ?? null,
            ]);
        });

        return Redirect::route('admin.students.index')->with('success', 'Student has been successfully added!');
    }

    public function edit(Student $student)
    {
        $student->load('user', 'studyProgram');

        return Inertia::render('admin/students/edit', [
            'student' => $student,
            'studyPrograms' => StudyProgram::query()
                ->orderBy('name')
                ->get(['id', 'name']),
        ]);
    }

    public function update(Request $request, Student $student)
    {
        $student->load('user');
        $actorUserId = $request->user()?->id;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $student->user->id . '|unique:users,pending_email,' . $student->user->id,
            'nim' => 'required|string|max:30|unique:students,nim,' . $student->id,
            'study_program_id' => 'required|integer|exists:study_programs,id',
            'gender' => 'nullable|string|max:50',
            'date_of_birth' => 'nullable|date|before_or_equal:today',
            'address' => 'nullable|string|max:1000',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        DB::transaction(function () use ($validated, $student, $actorUserId) {
            $user = $student->user;
            $newEmail = $validated['email'];
            $emailChanged = $newEmail !== $user->email;

            $user->fill([
                'name' => $validated['name'],
                'address' => $validated['address'] ?? null,
            ]);

            if (! empty($validated['password'])) {
                $user['password'] = $validated['password'];
            }

            if ($emailChanged) {
                $user->pending_email = $newEmail;
            }

            $user->save();

            if ($emailChanged) {
                Notification::route('mail', $newEmail)
                    ->notify(new PendingEmailChangeVerificationNotification($user));

                event(new EmailChanged($user->id, $newEmail, $actorUserId));
            }

            $student->update([
                'study_program_id' => $validated['study_program_id'],
                'gender' => $validated['gender'],
                'date_of_birth' => $validated['date_of_birth'],
            ]);
        });

        return Redirect::route('admin.students.index')->with('success', 'Student successfully updated!');
    }

    public function destroy(Student $student)
    {
        DB::transaction(function () use ($student) {
            $student->delete();
            $student->user->delete();
        });

        return redirect()->back()->with('success', 'Student deleted successfully!');
    }
}
