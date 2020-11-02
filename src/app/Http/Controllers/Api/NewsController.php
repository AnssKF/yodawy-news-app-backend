<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


use App\Models\Favorite;
use App\Helpers\NewsHepler;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $country = $request->query('country') ? $request->query('country'): 'eg';
        $category = $request->query('category');
        $user_favs = null;

        if($user = Auth::guard('api')->user()){
            $user_favs = Favorite::where('user_id', $user->id)->get();
        }

        $articles = NewsHepler::FetchNews($country, $category, $user_favs);

        return response()->json(['results'=> $articles]);
    }

}
