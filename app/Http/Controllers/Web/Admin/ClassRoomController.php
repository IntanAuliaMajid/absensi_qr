<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\Lecturer;
use App\Models\Semester;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    public function index()
    {
        $classes = ClassRoom::query()
            ->with(['studyProgram', 'semester', 'lecturer.user'])
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/classes/index', [
            'classes' => $classes,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/classes/create', [
            'studyPrograms' => StudyProgram::query()->orderBy('name')->get(['id', 'name']),
            'semesters' => Semester::query()->orderBy('name')->get(['id', 'name']),
            'lecturers' => Lecturer::query()->with('user:id,name')->get(['id', 'user_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:classes,name',
            'study_program_id' => 'required|exists:study_programs,id',
            'semester_id' => 'required|exists:semesters,id',
            'lecturer_id' => 'required|exists:lecturers,id',
            'room' => 'required|string|max:100',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        ClassRoom::create($validated);

        return Redirect::route('admin.classes.index')->with('success', 'Class created successfully!');
    }

    public function edit(ClassRoom $class)
    {
        $class->load(['studyProgram', 'semester', 'lecturer.user']);

        return Inertia::render('admin/classes/edit', [
            'classRoom' => $class,
            'studyPrograms' => StudyProgram::query()->orderBy('name')->get(['id', 'name']),
            'semesters' => Semester::query()->orderBy('name')->get(['id', 'name']),
            'lecturers' => Lecturer::query()->with('user:id,name')->get(['id', 'user_id']),
        ]);
    }

    public function update(Request $request, ClassRoom $class)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:classes,name,' . $class->id,
            'study_program_id' => 'required|exists:study_programs,id',
            'semester_id' => 'required|exists:semesters,id',
            'lecturer_id' => 'required|exists:lecturers,id',
            'room' => 'required|string|max:100',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $class->update($validated);

        return Redirect::route('admin.classes.index')->with('success', 'Class updated successfully!');
    }

    public function destroy(ClassRoom $class)
    {
        $class->delete();

        return Redirect::route('admin.classes.index')->with('success', 'Class deleted successfully!');
    }
}
