<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

use App\Models\Favorite;
use App\Policies\FavPolicy;

use App\Models\Revision;
use App\Policies\RevisionPolicy;

use Silber\Bouncer\Database\Role;
use App\Policies\RolePolicy;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Models\Model' => 'App\Policies\ModelPolicy',
        Favorite::class => FavPolicy::class,
        Revision::class => RevisionPolicy::class,
        Role::class => RolePolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes();

        Passport::tokensExpireIn(now()->addDays(3));

        Passport::refreshTokensExpireIn(now()->addDays(30));
    }
}
