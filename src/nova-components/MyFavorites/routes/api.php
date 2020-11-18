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
    $currentUser = $request->user();

    $data = [
        'id' => $favId
    ];

    if(!$currentUser->isAn('admin')){
        $data['user_id'] =  $currentUser->id;
    }
    
    $fav = Favorite::where($data)->firstOrFail();
    $fav->status_id = $fav->status_id == 1 ? 2 : 1;
    $fav->save();
    
    return response()->json([ 'results' => $fav ]);
});
