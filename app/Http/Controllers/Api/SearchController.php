<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\Lecturer;
use App\Models\User;
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
                        'classes' => [],
                    ],
                ],
                'meta' => [
                    'classes_total' => 0,
                ],
            ]);
        }

        $studentStudyProgramId = $request->user()?->student?->study_program_id;

        $withRelations = ['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'];

        $applyScope = function ($builder) use ($studentStudyProgramId, $withRelations) {
            $builder
                ->with($withRelations)
                ->when($studentStudyProgramId, function ($query) use ($studentStudyProgramId) {
                    $query->where('study_program_id', $studentStudyProgramId);
                })
                ->orderBy('name');
        };

        $classesByClassKeyword = ClassRoom::search($query)
            ->query($applyScope)
            ->take(24)
            ->get();

        $lecturerUserIds = User::search($query)
            ->query(fn($builder) => $builder->where('type', 'lecturer'))
            ->keys();

        $classesByLecturerName = collect();

        if ($lecturerUserIds->isNotEmpty()) {
            $lecturerIds = Lecturer::query()
                ->whereIn('user_id', $lecturerUserIds)
                ->pluck('id');

            if ($lecturerIds->isNotEmpty()) {
                $classesByLecturerName = ClassRoom::query()
                    ->tap($applyScope)
                    ->whereIn('lecturer_id', $lecturerIds)
                    ->get();
            }
        }

        $classes = $classesByClassKeyword
            ->merge($classesByLecturerName)
            ->unique('id')
            ->sortBy('name')
            ->values()
            ->take(24);

        $classData = $classes->map(function (ClassRoom $classRoom) {
            return [
                'id' => $classRoom->id,
                'name' => $classRoom->name,
                'room' => $classRoom->room,
                'start_time' => $classRoom->start_time,
                'end_time' => $classRoom->end_time,
                'study_program' => $classRoom->studyProgram?->name,
                'semester' => $classRoom->semester?->name,
                'lecturer_name' => $classRoom->lecturer?->user?->name,
            ];
        })->values();

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
