<?php

namespace App\Http\Controllers\Web\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassEnrollmentController extends Controller
{
    public function allClasses(Request $request): Response
    {
        $request->validate([
            'class_q' => 'nullable|string|max:100',
        ]);

        $student = $request->user()?->student;
        $query = trim((string) $request->input('class_q', ''));

        if (! $student) {
            abort(403);
        }

        $classesQuery = ClassRoom::query()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
            ->orderBy('id');

        if ($student->study_program_id) {
            $classesQuery->where('study_program_id', $student->study_program_id);
        } else {
            $classesQuery->whereRaw('1 = 0');
        }

        if ($query !== '') {
            $classesQuery->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('room', 'like', "%{$query}%");
            });
        }

        $classes = $classesQuery
            ->cursorPaginate(9)
            ->withQueryString();

        return Inertia::render('student/all-classes/index', [
            'classes' => $classes,
            'filters' => [
                'class_q' => $query,
            ],
        ]);
    }

    public function index(Request $request): Response
    {
        $student = $request->user()?->student;

        if (! $student) {
            abort(403);
        }

        $classes = $student->classes()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
            ->orderBy('classes.id')
            ->cursorPaginate(9)
            ->withQueryString();

        return Inertia::render('student/classes/index', [
            'classes' => $classes,
        ]);
    }
}
