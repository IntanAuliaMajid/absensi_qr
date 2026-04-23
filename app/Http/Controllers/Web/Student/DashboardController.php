<?php

namespace App\Http\Controllers\Web\Student;

use App\Http\Controllers\Controller;
use Carbon\Carbon;
use App\Models\Course;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::now()->locale('id')->dayName;
        $tomorrow = Carbon::tomorrow()->locale('id')->dayName;
        $studentId = request()->user()?->student?->id;


        $todayCourses = Course::where('day', $today)
            ->whereHas('students', function ($query) use ($studentId) {
                $query->where('students.id', $studentId);
            })
            ->orderBy('start_time')

            ->get();

        $tomorrowCourses = Course::where('day', $tomorrow)
            ->whereHas('students', function ($query) use ($studentId) {
                $query->where('students.id', $studentId);
            })
            ->orderBy('start_time')

            ->get();

        return Inertia::render('student/dashboard', [
            'todayCourses' => $todayCourses,
            'tomorrowCourses' => $tomorrowCourses,
            'today' => $today,
            'tomorrow' => $tomorrow,
        ]);
    }
}
