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
            'q' => 'nullable|string|max:100',
        ]);

        $student = $request->user()?->student;
        $query = trim((string) $request->input('q', ''));

        $coursesQuery = Course::query()
            ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name', 'classroom.location:id,name'])
            ->orderBy('id')->where('study_program_id', $student->study_program_id);

        if ($query !== '') {
            $coursesQuery->where(function ($q) use ($query) {
                $q->where('name', 'like', "%{$query}%")
                    ->orWhere('room', 'like', "%{$query}%")
                    ->orWhereHas('classroom', function ($q2) use ($query) {
                        $q2->where('name', 'like', "%{$query}%")
                            ->orWhereHas('location', function ($q3) use ($query) {
                                $q3->where('name', 'like', "%{$query}%");
                            });
                    })
                    ->orWhereHas('lecturer.user', function ($q2) use ($query) {
                        $q2->where('name', 'like', "%{$query}%");
                    });
            });
        }

        $courses = $coursesQuery
            ->cursorPaginate(9)
            ->withQueryString();

        $courseData = $courses->map(fn(Course $course) => [
            'id' => $course->id,
            'name' => $course->name,
            'room' => trim((($course->classroom?->location?->name) ? $course->classroom->location->name . ' - ' : '') . ($course->classroom?->name ?? '')) ?: $course->room,
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
