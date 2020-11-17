<?php

namespace App\Nova;

use Illuminate\Http\Request;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Fields\Text;
use Laravel\Nova\Fields\Boolean;
use Laravel\Nova\Http\Requests\NovaRequest;

use Laravel\Nova\Fields\BelongsTo;

use App\Models\Favorite;

class Fav extends Resource
{
    /**
     * The model the resource corresponds to.
     *
     * @var string
     */
    public static $model = Favorite::class;

    /**
     * The single value that should be used to represent the resource when being displayed.
     *
     * @var string
     */
    public static $title = 'id';

    /**
     * The columns that should be searched.
     *
     * @var array
     */
    public static $search = [
        'id',
    ];

    /**
     * Show all favs to admins and only user related favs for regular users
     */
    public static function indexQuery(NovaRequest $request, $query)
    {   
        if($request->user()->isAn('admin')) return $query;

        return $query->where('user_id', $request->user()->id);
    }

    /**
     * Admin can add favs to any user, regular user can only add fav to himself
     */
    public static function relatableUsers(NovaRequest $request, $query)
    {
        if($request->user()->isAn('admin')) return $query;

        return $query->where('id', $request->user()->id);
    }

    /**
     * Get the fields displayed by the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function fields(Request $request)
    {
        return [
            ID::make(__('ID'), 'id')->sortable(),
            Text::make('Url', 'url')->showOnIndex(),
            Text::make('Published at', 'publishedAt'),
            BelongsTo::make('User', 'user')
                ->searchable()
                ->default(function ($request) {
                    /**
                     * Set default value = current user id for only regular users
                     */
                    if($request->user()->isAn('admin')) return '';
                    return $request->user()->id;
                }),
            Boolean::make('Posted', 'posted'),
        ];
    }

    /**
     * Get the cards available for the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function cards(Request $request)
    {
        return [];
    }

    /**
     * Get the filters available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function filters(Request $request)
    {
        return [];
    }

    /**
     * Get the lenses available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function lenses(Request $request)
    {
        return [];
    }

    /**
     * Get the actions available for the resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function actions(Request $request)
    {
        return [];
    }

    public static $with = ['user'];
}
