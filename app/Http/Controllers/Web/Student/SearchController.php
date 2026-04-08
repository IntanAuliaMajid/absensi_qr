<?php

namespace App\Http\Controllers\Web\Student; # Namespace controller, menandakan lokasi file

use App\Http\Controllers\Controller; # Mengimpor controller dasar Laravel
use App\Models\ClassRoom;           # Model untuk tabel kelas
use App\Models\Lecturer;            # Model untuk dosen
use App\Models\User;                # Model untuk user
use Illuminate\Http\Request;        # Untuk menangani request HTTP
use Inertia\Inertia;                # Untuk render halaman Inertia
use Inertia\Response;               # Type hint response Inertia

class SearchController extends Controller
{
    public function index(Request $request): Response # Method index untuk pencarian kelas
    {
        $request->validate([
            'class_q' => 'nullable|string|max:100', # Validasi input class_q (boleh kosong, string, max 100)
        ]);

        $student = $request->user()?->student; # Ambil data student dari user yang login

        if (! $student) {
            abort(403); # Jika user bukan student, hentikan dengan status 403 Forbidden
        }

        $query = trim((string) $request->input('class_q', '')); # Ambil query pencarian, default kosong

        $withRelations = ['lecturer.user:id,name', 'semester:id,name', 'studyProgram:id,name'];
        # Relasi yang akan dimuat: dosen, semester, dan program studi (select hanya id & name)

        $applyScope = function ($builder) use ($student, $withRelations) {
            # Closure untuk apply query scope ke ClassRoom
            $builder
                ->with($withRelations) # Load relasi yang dibutuhkan
                ->when($student->study_program_id, function ($query) use ($student) {
                    $query->where('study_program_id', $student->study_program_id);
                    # Filter kelas hanya dari program studi student
                })
                ->orderBy('name'); # Urutkan berdasarkan nama kelas
        };

        if ($query === '') { # Jika query kosong
            $classes = ClassRoom::query()->tap($applyScope)->get();
            # Ambil semua kelas dengan scope di atas

            return Inertia::render('student/search/index', [
                'classes' => $classes, # Data kelas
                'filters' => [
                    'class_q' => $query, # Query pencarian (kosong)
                ],
                'meta' => [
                    'classes_total' => $classes->count(), # Total kelas
                ],
            ]);
        }

        # Jika ada query, cari berdasarkan nama kelas
        $classesByClassKeyword = ClassRoom::search($query)
            ->query($applyScope) # Apply scope
            ->take(24)           # Ambil maksimal 24 hasil
            ->get();

        # Cari lecturer berdasarkan nama user
        $lecturerUserIds = User::search($query)
            ->query(fn($builder) => $builder->where('type', 'lecturer')) # Filter user yang type lecturer
            ->keys(); # Ambil id user  saja

        $classesByLecturerName = collect(); # Inisialisasi collection kosong

        if ($lecturerUserIds->isNotEmpty()) { # Jika ada dosen yang cocok
            $lecturerIds = Lecturer::query()
                ->whereIn('user_id', $lecturerUserIds)
                ->pluck('id'); # Ambil id lecturer

            if ($lecturerIds->isNotEmpty()) {
                $classesByLecturerName = ClassRoom::query()
                    ->tap($applyScope) # Apply scope
                    ->whereIn('lecturer_id', $lecturerIds) # Filter kelas yang diampu dosen tersebut
                    ->get();
            }
        }

        # Gabungkan hasil pencarian kelas berdasarkan nama kelas & dosen
        $classes = $classesByClassKeyword
            ->merge($classesByLecturerName)
            ->unique('id') # Hapus duplikat
            ->sortBy('name') # Urutkan berdasarkan nama
            ->values()
            ->take(24); # Ambil maksimal 24 hasil

        # Render halaman Inertia dengan data kelas
        return Inertia::render('student/search/index', [
            'classes' => $classes,
            'filters' => [
                'class_q' => $query,
            ],
            'meta' => [
                'classes_total' => $classes->count(),
            ],
        ]);
    }
}
