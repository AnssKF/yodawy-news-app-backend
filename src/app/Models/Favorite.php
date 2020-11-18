<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use \Venturecraft\Revisionable\RevisionableTrait;
use App\Models\User;
use App\Models\Status;

class Favorite extends Model
{
    use HasFactory, RevisionableTrait;

    protected $revisionEnabled = true;
    protected $revisionCreationsEnabled = true;

    protected $fillable = [
        'user_id',
        'url',
        'publishedAt',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function status() {
        return $this->belongsTo(Status::class);
    }

    protected $casts = [
        'publishedAt' => 'date',
    ];
}
