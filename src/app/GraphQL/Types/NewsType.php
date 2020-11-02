<?php

namespace App\GraphQL\Types;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

class SourceType extends GraphQLType
{
    protected $attributes = [
        'name'          => 'NewsSource',
    ];

    public function fields(): array
    {
        return [
            "id" => [
                'type' => Type::string()
            ],
            "name" =>[
                'type' => Type::string()
            ]
        ];
    }
}

class NewsType extends GraphQLType
{
    protected $attributes = [
        'name'          => 'News',
    ];

    public function fields(): array
    {
        return [
            "source" => [
                'type' => GraphQL::type('news-source')
            ],
            "author" => [
                'type' => Type::string()
            ],
            "title" => [
                'type' => Type::string()
            ],
            "description" => [
                'type' => Type::string()
            ],
            "url" => [
                'type' => Type::string()
            ],
            "urlToImage" => [
                'type' => Type::string()
            ],
            "publishedAt" => [
                'type' => Type::string()
            ],
            "content" => [
                'type' => Type::string()
            ],
            'liked' => [
                'type' => Type::boolean()
            ]
        ];
    }
}