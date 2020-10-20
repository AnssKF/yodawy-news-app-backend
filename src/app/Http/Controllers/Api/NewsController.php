<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use GuzzleHttp\Client;
use App\Models\Favorite;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $httpClient = new Client([
            'base_uri' => 'http://newsapi.org/v2/',
        ]);

        $country = $request->query('country') ? $request->query('country'): 'eg';
        $category = $request->query('category');

        $newsResponse = $httpClient->get('top-headlines', [
            'query' => [
                'country' => $country,
                'category' => $category,
                'apiKey' => env('NEWS_API_KEY', '')
            ]
        ]);

        $body = json_decode($newsResponse->getBody());

        if($user = Auth::guard('api')->user()){
            /**
             * iF USER LOGGED IN
             * fetch user favs and tweek data fo add liked key
             */
            $favs = Favorite::where('user_id', $user->id)->get();

            if($favs){
                $body->articles = array_map(
                    function ($article) use ($favs){
                        $article->liked = false;
                        foreach( $favs as $fav  ){
                            if( ($fav->publishedAt == $article->publishedAt) && ($fav->url == $article->url)){
                                $article->liked = true;
                            }
                        }
                        return $article;
                }, $body->articles);
            }
        }

        return response()->json(['results'=> $body]);
    }

}
