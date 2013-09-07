<?php

class ContentTableSeeder extends Seeder {

    public function run()
    {
        DB::table('contents')->delete();
    }

}