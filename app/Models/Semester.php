<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semester extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function classes(): HasMany
    {
        return $this->hasMany(ClassRoom::class, 'semester_id');
    }
}
