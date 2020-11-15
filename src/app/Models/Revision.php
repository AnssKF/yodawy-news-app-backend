<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use \Venturecraft\Revisionable\Revision as BaseRevision;
use App\Models\User;

class Revision extends BaseRevision
{
    use HasFactory;

    public function user(){
        return $this->belongsTo(User::class);
    }
}
