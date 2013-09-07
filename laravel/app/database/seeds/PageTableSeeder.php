<?php

class PageTableSeeder extends Seeder {

    public function run()
    {
        DB::table('pages')->delete();

        Broken\Page::create(array(
            'title'		=> 'Welcome to Broken CMS',
			'content' 	=> '<p>This is some awesome content!</p>',
			'slug'		=> Str::slug('Welcome to Broken CMS'),
			'parent'	=> 1
        ));
    }

}
