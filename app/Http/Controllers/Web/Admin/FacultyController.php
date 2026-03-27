<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faculties = Faculty::all();

        return Inertia::render('admin/faculties/index', [
            'faculties' => $faculties,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('admin/faculties/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:faculties,name',
        ]);

        Faculty::create($validated);

        return Redirect::route('admin.faculties.index')->with('success', 'Faculty has been successfully added!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Faculty $faculty)
    {
        return Inertia::render('admin/faculties/edit', [
            'faculty' => $faculty
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Faculty $faculty)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:roles,name,' . $faculty->id,
        ]);

        $faculty->update($validated);

        return Redirect::route('admin.faculties.index')->with('success', 'Faculty updated succesfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Faculty $faculty)
    {
        $faculty->delete();

        return Redirect::route('admin.faculties.index')->with('success', 'Faculty deleted successfully!');
    }
}
