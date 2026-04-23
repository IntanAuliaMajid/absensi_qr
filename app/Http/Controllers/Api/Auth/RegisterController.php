<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class RegisterController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $request->validate([
                'name' => 'nullable|required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users,email',
                'nim' => [
                    'required',
                    'string',
                    'max:20',
                    'regex:/^[A-Za-z0-9\-]+$/',
                    'unique:students,nim',
                ],
                'password' => 'required|string|min:8|confirmed',
                'faculty_id' => 'required|integer|exists:faculties,id',
                'study_program_id' => [
                    'required',
                    'integer',
                    Rule::exists('study_programs', 'id')->where(function ($query) use ($request) {
                        $query->where('faculty_id', $request->input('faculty_id'));
                    }),
                ],
            ]);
        } catch (ValidationException $e) {
            Log::warning('Registration validation failed', [
                'errors' => $e->errors(),
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);
            throw $e;
        }

        $user = User::create([
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'study_program_id' => $request->study_program_id,
        ]);

        $user->sendEmailVerificationNotification();

        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'message' => 'Registration successful. Please check your email to verify your account.',
            'user' => $user
        ], 201);
    }
}
