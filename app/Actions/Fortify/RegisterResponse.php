<?php

namespace App\Actions\Fortify;

use Laravel\Fortify\Contracts\RegisterResponse as RegisterResponseContract;

class RegisterResponse implements RegisterResponseContract
{
    public function toResponse($request)
    {
        $user = $request->user();

        if ($user->type === 'admin') {
            return redirect()->route('admin.dashboard');
        }

        if ($user->type === 'lecturer') {
            return redirect()->route('lecturer.dashboard');
        }

        return redirect()->route('student.dashboard');
    }
}