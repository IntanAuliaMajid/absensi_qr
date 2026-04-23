<?php

namespace App\Http\Controllers\Api\Student;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseEnrollmentController extends Controller
{
    public function enroll(Request $request, Course $course): JsonResponse
    {
        $student = $request->user()?->student;

        if (! $student) {
            return response()->json([
                'message' => 'Student tidak ditemukan.',
            ], 403);
        }

        if ($course->study_program_id !== $student->study_program_id) {
            return response()->json([
                'message' => 'Kelas tidak tersedia untuk program studi kamu.',
            ], 404);
        }

        $alreadyEnrolled = $student->courses()
            ->where('courses.id', $course->id)
            ->exists();

        if ($alreadyEnrolled) {
            return response()->json([
                'message' => 'Kamu sudah terdaftar di kelas ini.',
            ], 409);
        }

        $hasConflict = false;

        if ($course->day && $course->start_time && $course->end_time) {
            $hasConflict = $student->courses()
                ->whereNotNull('day')
                ->where('day', $course->day)
                ->where(function ($query) use ($course) {
                    $query->where('start_time', '<', $course->end_time)
                        ->where('end_time', '>', $course->start_time);
                })
                ->exists();
        }

        if ($hasConflict) {
            return response()->json([
                'message' => 'Jadwal kelas bentrok dengan kelas lain yang sudah didaftarkan.',
            ], 409);
        }

        $student->courses()->syncWithoutDetaching([$course->id]);

        return response()->json([
            'message' => 'Kelas berhasil didaftarkan.',
            'data' => [
                'course_id' => $course->id,
                'student_id' => $student->id,
            ],
        ]);
    }
}
