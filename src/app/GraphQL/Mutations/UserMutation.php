<?php

namespace App\GraphQL\Mutations;

use Closure;
use App\Models\User;
use GraphQL;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\ResolveInfo;
use Rebing\GraphQL\Support\Mutation;

class UserMutation extends Mutation
{
    protected $attributes = [
        'name' => 'RegisterUser'
    ];

    public function type(): Type
    {
        return GraphQL::type('user');
    }

    public function args(): array
    {
        return [
            'name' => ['name' => 'name', 'type' => Type::nonNull(Type::string())],
            'email' => ['name' => 'email', 'type' => Type::nonNull(Type::string())],
            'password' => ['name' => 'password', 'type' => Type::nonNull(Type::string())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        $user = User::find($args['email']);
        if($user) {
            return null;
        }

        $user=User::create([
            "name" => $args["name"],
            "email" => $args["email"],
            "password" => bcrypt($args["password"])
        ]);
        $user->save();

        return $user;
    }
}