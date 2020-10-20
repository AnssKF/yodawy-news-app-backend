<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Models\Favorite;

class FavoriteController extends Controller
{
    public function index(Request $request) {
        $user = Auth::user();

        $favs = Favorite::where('user_id', $user->id)->get();
        return response()->json(["results" => $favs]);
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

        return response()->json([$fav]);
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
        
        return response()->json(["results" => $fav]);
    }
}
