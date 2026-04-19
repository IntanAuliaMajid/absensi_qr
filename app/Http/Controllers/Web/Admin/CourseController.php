<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lecturer;
use App\Models\Semester;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $classes = Course::query()
            ->with(['studyProgram', 'semester', 'lecturer.user'])
            ->orderBy('id')
            ->cursorPaginate(10)
            ->withQueryString();

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
            'name' => 'required|string|max:255|unique:courses,name',
            'study_program_id' => 'required|exists:study_programs,id',
            'semester_id' => 'required|exists:semesters,id',
            'lecturer_id' => 'required|exists:lecturers,id',
            'room' => 'required|string|max:100',
            'day' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        Course::create($validated);

        return Redirect::route('admin.classes.index')->with('success', 'Class created successfully!');
    }

    public function edit(Course $class)
    {
        $class->load(['studyProgram', 'semester', 'lecturer.user']);

        return Inertia::render('admin/classes/edit', [
            'Course' => $class,
            'studyPrograms' => StudyProgram::query()->orderBy('name')->get(['id', 'name']),
            'semesters' => Semester::query()->orderBy('name')->get(['id', 'name']),
            'lecturers' => Lecturer::query()->with('user:id,name')->get(['id', 'user_id']),
        ]);
    }

    public function update(Request $request, Course $class)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:courses,name,' . $class->id,
            'study_program_id' => 'required|exists:study_programs,id',
            'semester_id' => 'required|exists:semesters,id',
            'lecturer_id' => 'required|exists:lecturers,id',
            'room' => 'required|string|max:100',
            'day' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $class->update($validated);

        return Redirect::route('admin.classes.index')->with('success', 'Class updated successfully!');
    }

    public function destroy(Course $class)
    {
        $class->delete();

        return Redirect::route('admin.classes.index')->with('success', 'Class deleted successfully!');
    }
}
