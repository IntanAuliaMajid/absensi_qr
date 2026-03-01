<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'password' => 'required|string|min:8|confirmed'
            ]);
        } catch (\Illuminate\Validation\ValidationException $error){
            Log::warning("login validation failed",[
                "error" => $error->errors(),
                "input" => $request->except("password","password_confirmation"),
                "ip" => $request->ip(),
                "user agent" => $request->userAgent(),
            ]);
            throw $error;
        }

        //jika valid dimasukkan ke database
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)        
        ]);

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'message' => 'Register successful',
            'user' => $user,
            'token' => $token
        ]);
    }
}
