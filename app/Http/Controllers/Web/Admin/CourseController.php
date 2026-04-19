<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Lecturer;
use App\Models\Room;
use App\Models\Semester;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::query()
            ->with(['studyProgram', 'semester', 'lecturer.user', 'classroom.building'])
            ->orderBy('id')
            ->cursorPaginate(10)
            ->withQueryString();

        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/courses/create', [
            'studyPrograms' => StudyProgram::query()->orderBy('name')->get(['id', 'name']),
            'semesters' => Semester::query()->orderBy('name')->get(['id', 'name']),
            'lecturers' => Lecturer::query()->with('user:id,name')->get(['id', 'user_id']),
            'rooms' => Room::query()->with('building:id,name')->orderBy('name')->get(['id', 'name', 'building_id']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:courses,name',
            'study_program_id' => 'required|exists:study_programs,id',
            'semester_id' => 'required|exists:semesters,id',
            'lecturer_id' => 'required|exists:lecturers,id',
            'room_id' => 'required|exists:rooms,id',
            'day' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $selectedRoom = Room::query()->with('building:id,name')->findOrFail($validated['room_id']);
        $validated['room'] = trim(($selectedRoom->building?->name ? $selectedRoom->building->name . ' - ' : '') . $selectedRoom->name);

        Course::create($validated);

        return Redirect::route('admin.courses.index')->with('success', 'Class created successfully!');
    }

    public function edit(Course $course)
    {
        $course->load(['studyProgram', 'semester', 'lecturer.user', 'classroom.building']);

        return Inertia::render('admin/courses/edit', [
            'course' => $course,
            'studyPrograms' => StudyProgram::query()->orderBy('name')->get(['id', 'name']),
            'semesters' => Semester::query()->orderBy('name')->get(['id', 'name']),
            'lecturers' => Lecturer::query()->with('user:id,name')->get(['id', 'user_id']),
            'rooms' => Room::query()->with('building:id,name')->orderBy('name')->get(['id', 'name', 'building_id']),
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:courses,name,' . $course->id,
            'study_program_id' => 'required|exists:study_programs,id',
            'semester_id' => 'required|exists:semesters,id',
            'lecturer_id' => 'required|exists:lecturers,id',
            'room_id' => 'required|exists:rooms,id',
            'day' => 'required|in:Senin,Selasa,Rabu,Kamis,Jumat,Sabtu,Minggu',
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
        ]);

        $selectedRoom = Room::query()->with('building:id,name')->findOrFail($validated['room_id']);
        $validated['room'] = trim(($selectedRoom->building?->name ? $selectedRoom->building->name . ' - ' : '') . $selectedRoom->name);

        $course->update($validated);

        return Redirect::route('admin.courses.index')->with('success', 'Class updated successfully!');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return Redirect::route('admin.courses.index')->with('success', 'Class deleted successfully!');
    }
}
