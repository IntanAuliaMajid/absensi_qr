<?php

namespace App\Http\Controllers\Web\Student;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    public function index(Request $request): Response
    {
        // Validasi input pencarian, boleh kosong, maksimal 100 karakter
        $request->validate([
            'class_q' => 'nullable|string|max:100',
        ]);

        // Ambil data student dari user yang login
        $student = $request->user()?->student;

        // Jika bukan student, hentikan request dengan status 403
        if (! $student) {
            abort(403);
        }

        // Ambil query pencarian, trim spasi di awal/akhir
        $query = trim((string) $request->input('class_q', ''));

        if ($query === '') {
            // Jika query kosong, ambil semua kelas student berdasarkan program studi
            $classes = ClassRoom::with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'])
                ->when($student->study_program_id, fn($q) => $q->where('study_program_id', $student->study_program_id))
                ->orderBy('name')
                ->get();
        } else {
            // Jika ada query, gunakan Scout search
            $classes = ClassRoom::search($query)
                ->query(
                    fn($builder) => $builder
                        ->with(['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name']) // Load relasi yang dibutuhkan
                        ->when($student->study_program_id, fn($q) => $q->where('study_program_id', $student->study_program_id)) // Filter sesuai program studi
                        ->orderBy('name') // Urutkan berdasarkan nama kelas
                )
                ->take(24) // Batasi hasil maksimal 24
                ->get();
        }

        // Render halaman Inertia dengan data kelas, query, dan total kelas
        return Inertia::render('student/search/index', [
            'classes' => $classes,
            'filters' => ['class_q' => $query],
            'meta' => ['classes_total' => $classes->count()],
        ]);
    }
}
