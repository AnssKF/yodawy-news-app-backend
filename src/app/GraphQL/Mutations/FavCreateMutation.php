<?php

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Mutation;

use Illuminate\Support\Facades\Auth;
use App\Models\Favorite;

class FavCreateMutation extends Mutation
{
    protected $attributes = [
        'name' => 'CreateFav'
    ];

    public function type(): Type
    {
        return GraphQL::type('fav');
    }

    public function args(): array
    {
        return [
            'url' => ['name' => 'url', 'type' => Type::nonNull(Type::string())],
            'publishedAt' => ['name' => 'publishedAt', 'type' => Type::nonNull(Type::string())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $userId = Auth::guard('api')->user()->id;

        $fav = Favorite::firstOrCreate([
            'url' => $args['url'],
            'publishedAt' => $args['publishedAt'],
            'user_id' => $userId
        ]);

        return $fav;
    }
}