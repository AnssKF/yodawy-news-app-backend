<?php

namespace App\GraphQL\Mutations;

use Closure;
use GraphQL;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Mutation;

use Illuminate\Support\Facades\Auth;
use App\Models\Favorite;

class FavDeleteMutation extends Mutation
{
    protected $attributes = [
        'name' => 'DeleteFav'
    ];

    public function type(): Type
    {
        return Type::int();
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

        $fav = Favorite::where([
            ['user_id', $userId],
            ['url', $args['url']],
            ['publishedAt', $args['publishedAt']]
        ])->delete();

        return $fav;
    }
}