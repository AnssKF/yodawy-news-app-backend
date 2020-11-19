<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Favorite;
use App\Models\Status;

class FavoriteController extends Controller
{
    public function index(Request $request) {
        $user = Auth::user();

        $favs = Favorite::where('user_id', $user->id)->get();
        return response()->json(["results" => $favs], 200);
    }

    public function create(Request $request) {
        
        $validatedData = $request->validate([
            'url'=>'required|url',
            'publishedAt'=>'required|string',
        ]);

        $userId = Auth::id();

        $fav = Favorite::firstOrCreate([
            'url' => $validatedData['url'],
            'publishedAt' => $validatedData['publishedAt'],
            'user_id' => $userId
        ]);

        return response()->json([$fav], 200);
    }

    public function destroy(Request $request) {
        $validatedData = $request->validate([
            'url'=>'required|url',
            'publishedAt'=>'required|string',
        ]);

        $userId = Auth::id();

        $fav = Favorite::where([
            ['user_id', $userId],
            ['url', $validatedData['url']],
            ['publishedAt', $validatedData['publishedAt']]
        ])->delete();

        if(!$fav) return response()->json(["message" => 'There is no favs with this payload.'], 400);
        
        return response()->json(["results" => $fav], 200);
    }

    public function togglePosted(Request $request) {
        
        if(!Auth::check()){
            return response()->json([ 'message' => 'You are not authorized to perform this action.' ], 401);
        }

        $validatedData = $request->validate([
                'id' => 'required',
                'status' => 'required'
            ]);

        $favId = $validatedData['id'];
        $statusValue = $validatedData['status'];
        $currentUser = $request->user();
        $fav = Favorite::where(['id' => $favId ])->firstOrFail();

        if(!$currentUser->can('update', $fav)){
            return response()->json([ 'message' => 'You are not authorized to perform this action.' ], 401);
        }

        $status = Status::whereRaw('UPPER(name) = ?', [strtoupper($statusValue)])->first();

        $fav->status_id = $status->id;
        $fav->save();
        return response()->json([ 'results' => $fav ], 200);
    }
}
