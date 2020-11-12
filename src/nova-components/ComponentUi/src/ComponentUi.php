<?php

namespace Yodawy\ComponentUi;

use Laravel\Nova\Nova;
use Laravel\Nova\Tool;

class ComponentUi extends Tool
{
    /**
     * Perform any tasks that need to happen when the tool is booted.
     *
     * @return void
     */
    public function boot()
    {
        Nova::script('component-ui', __DIR__.'/../dist/js/tool.js');
        Nova::style('component-ui', __DIR__.'/../dist/css/tool.css');
    }

    /**
     * Build the view that renders the navigation links for the tool.
     *
     * @return \Illuminate\View\View
     */
    public function renderNavigation()
    {
        return view('component-ui::navigation');
    }
}
