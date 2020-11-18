<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Venturecraft\Revisionable\RevisionableTrait;

class FavoriteStatus extends Model
{
    use HasFactory, RevisionableTrait;

    protected $fillable = [
        'favorite_id',
        'posted'
    ];

    protected $casts = [
        'posted' => 'boolean',
    ];
}
