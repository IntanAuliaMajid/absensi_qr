<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'q' => 'nullable|string|max:50',
        ]);

        $query = trim((string) $request->input('q', ''));

        $builder = Course::with([
            'lecturer.user:id,name',
            'semester:id,name',
            'studyProgram:id,name',
            'classroom.building:id,name',
        ])->orderBy('id');

        $student = $request->user()?->student;

        if ($student && $student->study_program_id) {
            $builder->where('study_program_id', $student->study_program_id);
        }

        if ($query !== '') {
            $builder->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('room', 'like', "%{$query}%")
                    ->orWhereHas('classroom', function ($q2) use ($query) {
                        $q2->where('name', 'like', "%{$query}%")
                            ->orWhereHas('building', function ($q3) use ($query) {
                                $q3->where('name', 'like', "%{$query}%");
                            });
                    })
                    ->orWhereHas('lecturer.user', function ($q2) use ($query) {
                        $q2->where('name', 'like', "%{$query}%");
                    });
            });
        }

        $courses = $builder->cursorPaginate(9);

        $courseData = $courses->map(fn(Course $course) => [
            'id' => $course->id,
            'name' => $course->name,
            'room' => trim((($course->classroom?->building?->name) ? $course->classroom->building->name . ' - ' : '') . ($course->classroom?->name ?? '')) ?: $course->room,
            'start_time' => $course->start_time,
            'end_time' => $course->end_time,
            'study_program' => $course->studyProgram?->name,
            'semester' => $course->semester?->name,
            'lecturer_name' => $course->lecturer?->user?->name,
        ])->values();

        return response()->json([
            'message' => 'Data berhasil diambil.',
            'courses' => $courseData,

            'meta' => [
                'next_cursor' => $courses->nextCursor()?->encode(),
                'prev_cursor' => $courses->previousCursor()?->encode(),
                'has_more' => $courses->hasMorePages(),
            ],
        ]);
    }
}
