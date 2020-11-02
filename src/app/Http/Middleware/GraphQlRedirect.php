<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class GraphQlRedirect
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $body = json_decode($request->getContent());
        $uri = $request->path();

        if($body && array_key_exists('query', $body) && strpos($uri, 'api') === 0){
            $qlpath = 'graphql/' . explode('/', $uri)[1];

            $request = Request::create($qlpath, 'POST', [
                'query' => $body->query
            ]);

            return app()->handle($request);
        }

        return $next($request);
    }
}
