<?php

namespace App\Http\Controllers\Web\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassEnrollmentController extends Controller
{
    public function index(Request $request): Response
    {
        $student = $request->user()?->student;

        $courses = $student->courses()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name', 'classroom.location:id,name'])
            ->orderBy('courses.id')
            ->cursorPaginate(9)
            ->withQueryString();

        return Inertia::render('student/courses/index', [
            'courses' => $courses,
        ]);
    }

    public function allClasses(Request $request): Response
    {
        $request->validate([
            'q' => 'nullable|string|max:100',
        ]);

        $student = $request->user()?->student;
        $query = trim((string) $request->input('q', ''));

        $coursesQuery = Course::query()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name', 'classroom.location:id,name'])
            ->orderBy('id')->where('study_program_id', $student->study_program_id);

        if ($query !== '') {
            $coursesQuery->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('room', 'like', "%{$query}%")
                    ->orWhereHas('classroom', function ($q2) use ($query) {
                        $q2->where('name', 'like', "%{$query}%")
                            ->orWhereHas('location', function ($q3) use ($query) {
                                $q3->where('name', 'like', "%{$query}%");
                            });
                    })
                    ->orWhereHas('lecturer.user', function ($q2) use ($query) {
                        $q2->where('name', 'like', "%{$query}%");
                    });
            });
        }

        $courses = $coursesQuery
            ->cursorPaginate(9)
            ->withQueryString();

        return Inertia::render('student/all-courses/index', [
            'courses' => $courses,
            'q' => $query,
        ]);
    }
}
