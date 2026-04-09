<?php

namespace App\Http\Controllers\Web\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        $request->validate([
            'class_q' => 'nullable|string|max:100',
        ]);

        $student = $request->user()?->student;

        if (! $student) {
            abort(403);
        }

        $query = trim((string) $request->input('class_q', ''));

        if ($query === '') {
            $classes = ClassRoom::with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
                ->orderBy('name')
                ->paginate(10)
                ->withQueryString();
        } else {
            
            $classes = ClassRoom::search($query)
                ->query(
                    fn($builder) => $builder
                        ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
                        ->orderBy('name')
                )
                ->paginate(10)
                ->withQueryString();
        }

        return Inertia::render('student/search/index', [
            'classes' => $classes,
            'meta' => ['classes_total' => $classes->total()],
        ]);
    }
}
