<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

use App\Models\Favorite;

class FavType extends GraphQLType
{
    protected $attributes = [
        'name'          => 'Favorite',
        'description'   => 'A Favorite',
        'model'         => Favorite::class,
    ];

    public function fields(): array
    {
        return [
            'id' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The id of the fav'
            ],
            'url' => [
                'type' => Type::string(),
                'description' => 'The url of headline'
            ],
            'publishedAt' => [
                'type' => Type::string(),
                'description' => 'The publishedAt of headline'
            ],
            'user' => [
                'type' => GraphQL::type('user'),
                'description' => 'The User of Fav',
            ]
        ];
    }
}