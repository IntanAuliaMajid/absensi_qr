<?php

namespace App\Concerns;

use App\Models\User;
use Illuminate\Validation\Rule;

trait ProfileValidationRules
{
    /**
     * Get the validation rules used to validate user profiles.
     *
     * @return array<string, array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>>
     */
    protected function profileRules(?int $userId = null): array
    {
        return [
            'name' => $this->nameRules(),
            'email' => $this->emailRules($userId),
            'gender' => $this->genderRules(),
            'date_of_birth' => $this->dateOfBirthRules(),
            'address' => $this->addressRules(),
        ];
    }

    /**
     * Get the validation rules used to validate user names.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function nameRules(): array
    {
        return ['required', 'string', 'max:255'];
    }

    /**
     * Get the validation rules used to validate user emails.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function emailRules(?int $userId = null): array
    {
        return [
            'required',
            'string',
            'email',
            'max:255',
            $userId === null
                ? Rule::unique(User::class)
                : Rule::unique(User::class)->ignore($userId),
        ];
    }

    /**
     * Get the validation rules used to validate user gender.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function genderRules(): array
    {
        return ['nullable', 'string', 'max:50'];
    }

    /**
     * Get the validation rules used to validate user date of birth.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function dateOfBirthRules(): array
    {
        return ['nullable', 'date', 'before_or_equal:today'];
    }

    /**
     * Get the validation rules used to validate user address.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function addressRules(): array
    {
        return ['nullable', 'string', 'max:1000'];
    }

    /**
     * Get the validation rules used to validate student NIM.
     *
     * @return array<int, \Illuminate\Contracts\Validation\Rule|array<mixed>|string>
     */
    protected function nimRules(?int $studentId = null): array
    {
        return [
            'required',
            'string',
            'max:30',
            'regex:/^[A-Za-z0-9\-]+$/',
            $studentId === null
                ? Rule::unique('students', 'nim')
                : Rule::unique('students', 'nim')->ignore($studentId),
        ];
    }
}