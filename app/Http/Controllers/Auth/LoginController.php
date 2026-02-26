<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:8'
        ]);


        // jika data tidak valid kirim json credentials are not valid
        if(!auth()->attempt($credentials)){
            return response()->json(['message' => 'Credentials are not valid'], 401);
        }

        // jika valid ambil datanya 
        $user = auth()->user();

        // kirim data tokennya 
        return response()->json([
            'token' => $user->createToken('auth-token')->plainTextToken
        ]);
    }
}
