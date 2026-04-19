<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\StudyProgram;
use Illuminate\Http\Request;

class StudyProgramController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'faculty_id' => 'nullable|integer|exists:faculties,id',
        ]);

        $facultyId = $request->integer('faculty_id');

        $studyProgramsQuery = StudyProgram::query()
            ->with('faculty:id,name')
            ->orderBy('name');

        if ($facultyId) {
            $studyProgramsQuery->where('faculty_id', $facultyId);
        }

        return response()->json([
            'message' => 'Berhasil mengambil data fakultas dan program studi.',
            'study_programs' => $studyProgramsQuery->get(['id', 'name', 'faculty_id']),
        ]);
    }
}
