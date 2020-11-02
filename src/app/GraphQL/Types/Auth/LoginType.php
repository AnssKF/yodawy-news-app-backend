<?php

namespace App\GraphQL\Types\Auth;

use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Facades\GraphQL;
use Rebing\GraphQL\Support\Type as GraphQLType;

use App\Models\User;

class LoginType extends GraphQLType
{
    protected $attributes = [
        'name'          => 'Login',
        'model'         => User::class,
    ];

    public function fields(): array
    {
        return [
            'access_token' => [
                'type' => Type::string(),
                'description' => 'access token of current user.',
                'resolve' => function($root, $args) {
                    return $root->createToken('authToken')->accessToken;
                },
                'selectable' => false,
            ],
            'id' => [
                'type' => Type::nonNull(Type::string()),
                'description' => 'The id of the user',
            ],
            'email' => [
                'type' => Type::string(),
                'description' => 'The email of user',
                'resolve' => function($root, $args) {
                    return strtolower($root->email);
                }
            ],
        ];
    }
}