<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        try {
            $credentials = $request->validate([
                'email' => 'required|string|email',
                'password' => 'required|string|min:8'
            ]);
        } catch (\Illuminate\Validation\ValidationException $error){
            Log::warning("login validation failed",[
                "error" => $error->errors(),
                "email" => $request->email,
                "ip" => $request->ip(),
                "user agent" => $request->userAgent(),
            ]);
            throw $error;
        }
        


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
