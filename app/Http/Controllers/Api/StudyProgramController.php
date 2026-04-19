<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudyProgram;
use Illuminate\Http\Request;

class StudyProgramController extends Controller
{
    public function index()
    {
        return response()->json([
            'message' => 'Berhasil Mengambil Program Study',
            'study-program' => StudyProgram::all(),
        ]);
    }
}
