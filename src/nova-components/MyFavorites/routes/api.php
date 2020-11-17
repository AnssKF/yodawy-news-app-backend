<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Models\Favorite;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

Route::post('/toggle-posted', function (Request $request) {
    
    $validatedData = $request->validate(['id'=>'required']);

    $favId = $validatedData['id'];
    $currentUserId = $request->user()->id;

    // $fav = Favorite::findOrFail($favId);
    $fav = Favorite::where([
        'id' => $favId,
        'user_id' =>  $currentUserId
    ])->firstOrFail();

    $fav->posted = !$fav->posted;
    $fav->save();
    
    return response()->json([ 'results' => $fav ]);
});
