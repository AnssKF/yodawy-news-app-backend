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
use App\Helpers\NewsHepler;

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
        $country = $args['country'] ? $args['country']: 'eg';
        $category = $args['category'];
        $user_favs = null;
        
        if($user = Auth::guard('api')->user()){
            $user_favs = Favorite::where('user_id', $user->id)->get();
        }

        $articles = NewsHepler::FetchNews($country, $category, $user_favs);

        return $articles;
    }
}
