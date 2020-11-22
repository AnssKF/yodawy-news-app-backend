<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Venturecraft\Revisionable\RevisionableTrait;
use App\Models\Favorite;

class Status extends Model
{
    use HasFactory, RevisionableTrait;

    protected $fillable = [
        'name'
    ];

    protected $casts = [
    ];

    public function favorites(){
        return $this->hasMany(Favorite::class);
    }
}
