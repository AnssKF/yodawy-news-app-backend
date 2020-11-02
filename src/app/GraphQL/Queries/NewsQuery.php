<?php

namespace App\GraphQL\Queries;

use Closure;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

use Illuminate\Support\Facades\Auth;
use GuzzleHttp\Client;
use App\Models\Favorite;

class NewsQuery extends Query
{
    protected $attributes = [
        'name' => 'news',
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('news'));
    }

    public function args(): array
    {
        return [
            'country' => ['name' => 'country', 'type' => Type::string()],
            'category' => ['name' => 'category', 'type' => Type::nonNull(Type::string())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $httpClient = new Client([
            'base_uri' => 'http://newsapi.org/v2/',
        ]);

        $country = $args['country'] ? $args['country']: 'eg';
        $category = $args['category'];

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

        return $body->articles;
    }
}
