<?php

namespace App\Http\Controllers\Web\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClassEnrollmentController extends Controller
{
    public function index(Request $request): Response
    {
        $student = $request->user()?->student;

        $classes = $student->classes()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
            ->orderBy('classes.id')
            ->cursorPaginate(9)
            ->withQueryString();

        return Inertia::render('student/classes/index', [
            'classes' => $classes,
        ]);
    }

    public function allClasses(Request $request): Response
    {
        $request->validate([
            'q' => 'nullable|string|max:100',
        ]);

        $student = $request->user()?->student;
        $query = trim((string) $request->input('q', ''));

        $classesQuery = ClassRoom::query()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
            ->orderBy('id')->where('study_program_id', $student->study_program_id);

        if ($query !== '') {
            $classesQuery->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                ->orWhere('room', 'like', "%{$query}%")
                ->orWhereHas('lecturer.user', function ($q2) use ($query) {
                    $q2->where('name', 'like', "%{$query}%");
                });
            });
        }

        $classes = $classesQuery
            ->cursorPaginate(9)
            ->withQueryString();

        return Inertia::render('student/all-classes/index', [
            'classes' => $classes,    
            'q' => $query,
        ]);
    }

}
