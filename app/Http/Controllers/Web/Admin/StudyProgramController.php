<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use App\Models\StudyProgram;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudyProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $studyPrograms = StudyProgram::with('faculty')->get();

        return Inertia::render('admin/study-programs/index', [
            'studyPrograms' => $studyPrograms
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/study-programs/create', [
            'faculties' => Faculty::class,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudyProgram $studyProgram)
    {
        return Inertia::render('admin/study-programs/edit', [
            'studyProgram' => $studyProgram,
            'faculties' => Faculty::all(),
        ]);
}

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudyProgram $studyProgram)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:study_programs,name,' . $studyProgram->id,
            'faculty_id' => 'required|exists:faculties,id',
        ]);

        $studyProgram->update($validated);

        return Redirect::route('admin.study-programs.index')->with('success', 'Study Program updated succesfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudyProgram $studyProgram)
    {
        //
    }
}
