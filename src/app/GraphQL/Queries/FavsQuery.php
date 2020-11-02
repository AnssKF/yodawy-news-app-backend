<?php

namespace App\GraphQL\Queries;

use Closure;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

use App\Models\Favorite;

class FavsQuery extends Query
{
    protected $attributes = [
        'name' => 'favs',
    ];

    public function type(): Type
    {
        return Type::listOf(GraphQL::type('fav'));
    }

    public function args(): array
    {
        return [
            'user' => ['name' => 'user', 'type' => Type::string()]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        if (isset($args['user'])) {
            return Favorite::where('user_id', $args['user'])->get();
        }

        $fields = $getSelectFields();
        $select = $fields->getSelect();
        $with = $fields->getRelations();

        $favs = Favorite::select($select)->with($with);

        return $favs->get();
        // return Favorite::all();
    }
}
