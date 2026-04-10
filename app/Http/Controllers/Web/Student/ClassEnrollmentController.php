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

        if (! $student) {
            abort(403);
        }

        $classesQuery = ClassRoom::query()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
            ->orderBy('name');

        if ($student->study_program_id) {
            $classesQuery->where('study_program_id', $student->study_program_id);
        }

        return Inertia::render('student/classes/index', [
            'classes' => $classesQuery->get(),
        ]);
    }
}
