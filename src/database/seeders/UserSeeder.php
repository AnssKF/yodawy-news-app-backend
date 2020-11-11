<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superuser = User::create([
            'name'=> 'SuperUser',
            'email'=> 'admin@admin.com',
            'password'=>Hash::make('admin')
        ]);
        $superuser->assign('admin');

        $regularUser = User::create([
            'name'=> 'RegularUser',
            'email'=> 'regular@user.com',
            'password'=>Hash::make('regular')
        ]);
        $regularUser->assign('regular-user');
    }
}
