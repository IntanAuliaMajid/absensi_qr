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

        $builder = ClassRoom::with([
            'lecturer.user:id,name',
            'semester:id,name',
            'studyProgram:id,name'
        ])->orderBy('id');

        if ($query !== '') {
            $builder->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('room', 'like', "%{$query}%");
            });
        }

        $classes = $builder->cursorPaginate(10);

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
            'message' => 'Data berhasil diambil.',
            'data' => [
                'classes' => $classData,
            ],
            'meta' => [
                'next_cursor' => $classes->nextCursor()?->encode(),
                'prev_cursor' => $classes->previousCursor()?->encode(),
                'has_more' => $classes->hasMorePages(),
            ],
        ]);
    }
}
