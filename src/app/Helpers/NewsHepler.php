<?php

namespace App\Helpers;

use GuzzleHttp\Client;

class NewsHepler {
    public static function FetchNews($country, $category, $user_favs=null) {
        $httpClient = new Client([
            'base_uri' => 'http://newsapi.org/v2/',
        ]);
    
        $newsResponse = $httpClient->get('top-headlines', [
            'query' => [
                'country' => $country,
                'category' => $category,
                'apiKey' => env('NEWS_API_KEY', '')
            ]
        ]);
    
        $body = json_decode($newsResponse->getBody());
    
        if($user_favs){
            $body->articles = array_map(
                function ($article) use ($user_favs){
                    $article->liked = false;
                    foreach( $user_favs as $fav  ){
                        if( ($fav->publishedAt == $article->publishedAt) && ($fav->url == $article->url)){
                            $article->liked = true;
                        }
                    }
                    return $article;
            }, $body->articles);
        }
    
        return $body->articles;

    }    
}