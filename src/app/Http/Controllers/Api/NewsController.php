<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use GuzzleHttp\Client;

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

        $newsResponse = $httpClient->get('top-headlines', [
            'query' => [
                'country' => 'eg',
                'category' => $request->query('category'),
                'apiKey' => env('NEWS_API_KEY', '')
            ]
        ]);

        return response()->json(['results'=> json_decode($newsResponse->getBody())]);
    }

}
