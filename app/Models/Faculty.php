<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    protected $fillable = [
        'name',
    ];

    public function studyPrograms(): HasMany
    {
        return $this->hasMany(StudyProgram::class);
    }

    public function lecturers(): HasMany
    {
        return $this->hasMany(Lecturer::class);
    }
}
