<?php

namespace App\GraphQL\Queries\Auth;

use Closure;
use Rebing\GraphQL\Support\Facades\GraphQL;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;
use Rebing\GraphQL\Support\Query;

use App\Models\User;

class LoginQuery extends Query
{
    protected $attributes = [
        'name' => 'login',
    ];

    public function type(): Type
    {
        return GraphQL::type('login');
    }

    public function args(): array
    {
        return [
            'email' => ['name' => 'email', 'type' => Type::string()],
            'password' => ['name' => 'password', 'type' => Type::nonNull(Type::string())]
        ];
    }

    public function resolve($root, $args, $context, ResolveInfo $resolveInfo, Closure $getSelectFields)
    {
        if(!auth()->attempt(['email'=> $args['email'], 'password'=>$args['password']])) return null;

        $user = auth()->user();

        return $user;
    }
}