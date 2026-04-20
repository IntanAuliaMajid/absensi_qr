<?php

namespace App\Actions\Fortify;

use App\Concerns\PasswordValidationRules;
use App\Concerns\ProfileValidationRules;
use App\Models\User;
use App\Models\Student;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules, ProfileValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array<string, string>  $input
     */
    public function create(array $input): User
    {
        Validator::make($input, [
            ...$this->profileRules(),
            'nim' => $this->nimRules(),
            'study_program_id' => ['required', 'integer', 'exists:study_programs,id'],
            'password' => $this->passwordRules(),
        ])->validate();

        return DB::transaction(function () use ($input) {
            $user = User::create([
                'email' => $input['email'],
                'password' => $input['password'],
                'type' => 'student',
            ]);

            Student::create([
                'user_id' => $user->id,
                'nim' => $input['nim'],
                'study_program_id' => $input['study_program_id'],
            ]);

            return $user;
        });
    }
}
