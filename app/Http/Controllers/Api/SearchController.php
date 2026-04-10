<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'q' => 'nullable|string|max:100',
        ]);

        $query = trim((string) $request->input('q', ''));

        if ($query === '') {
            return response()->json([
                'message' => 'Silakan masukkan kata kunci.',
                'data' => [
                    'query' => $query,
                    'sections' => [
                        'classes' => ClassRoom::with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
                            ->orderBy('name')->get(),
                    ],
                ],
                'meta' => [
                    'classes_total' => ClassRoom::with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
                        ->orderBy('name')->get()->count(),
                ],
            ]);
        }

        $classes = ClassRoom::search($query)
            ->query(
                fn($builder) => $builder
                    ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
                    ->orderBy('name')
            )
            ->take(24)
            ->get();

        $classData = $classes->map(fn(ClassRoom $classRoom) => [
            'id' => $classRoom->id,
            'name' => $classRoom->name,
            'room' => $classRoom->room,
            'start_time' => $classRoom->start_time,
            'end_time' => $classRoom->end_time,
            'study_program' => $classRoom->studyProgram?->name,
            'semester' => $classRoom->semester?->name,
            'lecturer_name' => $classRoom->lecturer?->user?->name,
        ])->values();

        return response()->json([
            'message' => 'Hasil pencarian berhasil diambil.',
            'data' => [
                'query' => $query,
                'sections' => [
                    'classes' => $classData,
                ],
            ],
            'meta' => [
                'classes_total' => $classData->count(),
            ],
        ]);
    }
}
