<?php

class UserTableSeeder extends Seeder {

    public function run()
    {
        DB::table('users')->delete();

        User::create(array(
            'email'         => 'kevin@infielddesign.com',
            'username'      => 'kevin',
            'password'      => Hash::make('password'),
            'first_name'     => 'Kevin',
            'last_name'      => 'Mitchell',
        ));
    }

}