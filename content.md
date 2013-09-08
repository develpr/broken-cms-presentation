Laravel - an introduction
=====

--------

We are going to learn about Laravel.

--------

###What is Laravel?

 * a **modern** php framework
 * some other things (fast, users `composer`, etc)

--------

###OK, cool, now let's build a new CMS!

We are going to build a ***powerful*** CMS, and we will (we will **try**) do it in the next 20 minutes, from scratch.

We could talk for a long time about lots of things, but hopefully this will give an idea for the FEEL of working with Laravel and a general idea of how you can use it. 

--------

###0. What are we making?

----

#####In order to truly be the most powerful CMS, we need to support:

* creating pages with titles and content
* automatically handle routing  and friendly urls
* allow editing of page content
* real time interactive reporting (HipChat?)


#####and...

----

* we want to build a foundation, so build everything on top of an API

----

#####and *not*...

* this isn't a frontend tutorial, so I'll put together the markup, css, and js
* data model will be relatively simple for now - we can make it better later

--------

###1. Install Laravel

----

Rather then creating a bunch of folders and downloading stuff and then other stuff ("stuff &#8756; stuff") we'll use `composer` to create a new Laravel instance, as [laravel.com](http://laravel.com/) tells us to do.

---
*hint* 
this takes a few minutes, so we'll start quickly!

	cd ~/Sites
	composer create-project laravel/laravel laravel --prefer-dist

----

It seems smart to tell people whenever somebody visits a page that our CMS was used to create, so let's use the HipChat API to tell the Broken CMS room that something happened. We'll use `composer` to install the HipChat php library.
  
[Packagist](http://www.packagist.org) will help us find what we're looking for.

---
*hint*:

	"hipchat/hipchat-php": "dev-master"

----

*note*: see "[other things I did first but didn't tell you](http://localhost:8000/#/12/3)" if you have any interest in re-creating this entire process on your own.

----

Now we have to make sure composer installs all of the dependencies, including the newly included HipChat package

	composer update

In the future perhaps we can talk more about `composer` itself and look at how it works (it's not super complex but it is super awesome)

--------

###2. Setup Laravel

----

We need to setup Laravel so that it has a database connection, and while we're at it we'll drag all of the pre-created files we have created into place (mainly css/js/html templates, but a few database seed files).

----

`app/config/database.php` needs to have our database connection info:

	database: brokencms
	username: bieber
	password: fever

----

Let's put into place the files we need for the frontend/display layer (see [github](https://github.com/develpr/broken-cms-presentation/tree/master/laravel) for these files)

1. stylesheets, images, javascript
2. views (a bit more on this later)
3. seed data (a bit more on this later!)


--------

###3. Use `artisan` to create skeleton

----

> `artisan` is a command line tool that comes with Laravel. It provides a bunch of handy tools that let you do things automatically that you might otherwise spend hours doing manually.

Because we are in a bit of a hurry we'll go ahead and use it now to help us setup our project. 

---

----

**But first**, I think we should go over what features we want the CMS to support so we know what to build:

**we should be able to...**

 * login to the CMS
 * create pages
 * add content to a page
 * delete pages
 * move content around within the page
 * edit content
 * thematic

----

It sounds like we will need to keep track of **`Page`**s as well as **`Content`** for the CMS, plus **`User`**s so we can control who can edit pages in the CMS.

Because this entire thing is going to be built as a web application, we'll also need resourceful controllers (basically controllers that can handle normal RESTful interactions).

So let's go..

----

`artisan` has a tool for creating controllers for us, so we'll use that now:

	php artisan controller:make PageController
	php artisan controller:make ContentController
	php artisan controller:make UserController


----

So now we have Controllers (which will handle the actual requests that come in from the web browser). That's exciting. I'm excited about it at least. But, `artisan` can also help us create the actual database tables that will store our Page, Content, and User data. Laravel uses *migrations* and *seeds* to handle database setup. *migrations* create the structure of the database tables, and *seeds* insert seed data (in our example, we'll use seeds to automatically generate a User for us to login with, and maybe some sample Pages and Contents).

    php artisan migrate:make create_users_table --table=users --create
	php artisan migrate:make create_pages_table --table=pages --create
	php artisan migrate:make create_contents_table --table=contents --create

----

OK, we've avoided writing code long enough now (hopefully around 4 minutes +- 30 seconds). Luckily we're about 25% done with our CMS now, believe it or not. We have the following tasks to finish:

1. We need to create the models that we'll use to interact with our database (we don't want to be writing MySQL queries)
1. The Controllers that we created earlier need to be completed so they actually do something
1. Our database migrations need to be filled out to actually create 


--------

###4. Do some programming - *Migrations*

----

> **migrations** are instructions on how to setup the database. Things like which fields we want to store and what type of fields they are (numbers, strings, dates, etc), plus they tell the database how to delete or rollback any changes that were made.

A user might have a

* username
* password (hashed)
* first_name
* last_name
* email (which should be unique)

----

**User**

	$table->string('username');
	$table->string('password', 100);
	$table->string('first_name');
	$table->string('last_name');
	$table->string('email')->unique();

----

**Page**

	$table->increments('id');
    $table->string('title');
    $table->text('content');
    $table->string('slug');
    $table->integer('parent');
	$table->timestamps();
    $table->softDeletes();


----

**Content**

	$table->increments('id');
    $table->integer('position');
    $table->integer('page_id');
    $table->text('content');
    $table->timestamp('positioned_at');
	$table->timestamps();
    $table->softDeletes();


----

> *seed* data is just sample data that `artisan` wll insert for us automatically. I've included some seed data files in this example to speed things up (i.e. I've included a user *kevin* with the password *password*)


--------

###4. Do some (more) programming - *Models*

> *models* are (for the sake of simplicity and this simple example) the tools that we use to communicate with the database. Models are also where business logic will often be "modeled".

Laravel uses parts of Doctrine (point being it's relatively robust!), but has it's own ORM called "Eloquent". For this simple project, all this means is that our models will just be very simple files.

Laravel "gives" us a User model out of the box, so we only need to make the Content model and the Page model.

----

	<?php
	
	//Namespaces please
	namespace Broken;
	
	use \Eloquent;
	
	class Page extends Eloquent{
	    protected $table = 'pages';
		
		public function contents()
		{
			$this->hasMany('Broken\Content');
		}
				
	}
	

----

	<?php
	
	namespace Broken;
	
	use \Eloquent;
	
	class Content extends Eloquent{
	    protected $table = 'contents';
		
		public function page()
		{
			$this->belongsTo('Broken\Page');
		}
	}
	


###5. Do even more programming - *Controllers*

> *Controllers* handle requests when they come in from a user (first they are *routed* to the controller, which we'll handle in a second). They communicated between the *models* and the *views*.

We already used `artisan` to automatically create the basic controller stubs. Because e want to build Broken CMS on top of an API, we want to be able to handle various web requests (GET/POST/PUT/DELETE) in our controllers. 

----

####Page

	public function index()
	{
		//Get a list of pages
		return Response::json(Page::all());
	}

	public function store()
	{
		$page = new Page;
		$page->title = "a brand new page!";
		$page->save();
		
		return Response::json($page, 201);
	}

----

	public function show($id)
	{
		$slug = Input::get('slug');
	
		$page = Page::where('id', '=', $id)->where('slug', '=', $slug)->first();
	
		if(!$page)
			return Response::json(array('error' => "This page was not found"), 404);
		else
			return Response::json($page, 200);
		
	}


	public function update($id)
	{
		$page = Page::find($id);
		if(Input::has('title') && Input::get('title') != $page->title){
			$page->title = Input::get('title');
			$page->slug = Str::slug($page->title);
		}
	}


	public function destroy($id)
	{
		Page::destroy($id);
		return Response::json(array(), 200);
	}

####Contents

	public function index()
	{
		if(!Input::has('page_id'))
			return Response::json(Content::all(), 200);	
		$contents = Content::where('page_id', '=', Input::get('page_id'))->orderBy('position', 'asc')->orderBy('positioned_at', 'desc')->get();
		return Response::json($contents, 200);
	}

	public function store()
	{
		$content = new Content;
		$content->position = Input::get('position');
		$content->page_id = Input::get('page_id');
		$content->save();
		return Response::json($content, 201);
	}

----

	public function show($id)
	{
		return Content::find($id);
	}

	public function update($id)
	{
		$content = Content::find($id);
		
		if(Input::has('content') && Input::get('content') != $content->content)
			$content->content = Input::get('content');
			
		if(Input::has('position') && Input::get('position') != $content->position)
		{
			$content->position = Input::get('position');
			$content->positioned_at = date("Y-m-d H:i:s", time()-(60*60*7));
		}
		
		$content->save();
		
		return Response::json($content, 200);
		
	}

--------

###6. Routes (last step!)

> Routes tell Laravel how to handle a particular request from the web browser. For example, it will tell Laravel to send a user to the login page if it sees the /login URL.

Laravel automatically can handle "resourceful" routes for our API endpoints (Contents, Pages, Users), so that is easy to setup by simply adding

	Route::resource('api/v1/contents', 'ContentController');
	Route::resource('api/v1/pages', 'PageController');

To the routes.php file.

----

We also want to handle login, logout, a home page, and also a route that will display a particular Page and it's Content.

One great feature of Laravel is that we don't need to create a seperate controller for every little route that we have.

----

First, showing the login page:

	Route::get('/404', function(){
		return View::make('login');
	});

Then processing the login

	Route::post('/login', function(){
		if (Auth::attempt(array('username' => Input::get('username'), 'password' => Input::get('password'))))
		{
			return Redirect::to('/');
		}
	});

and loggin out

	
	Route::get('/logout', function(){
		Auth::logout();
		return Redirect::to('/');
	});
	
	

----

And finally, the most complicated route, handling the actual viewing of a page and it's content. Note here that we are getting the page and content data by calling the API that we created directly.


	Route::get('/page/{page}/{slug?}', function($page, $slug = ''){
		
		$api = new ApiConnector();
		
		$page = $api->get('/api/v1/pages/' . $page . '?slug=' . $slug);
		
		$contents = array();
		
		if($api->getStatusCode() != '404')
			$contents = $api->get('/api/v1/contents?page_id=' . $page->id);
		else
			return Redirect::to('/');
			
		if(Auth::check())
			return View::make('page-edit')->with(array('page' => $page, 'contents' => $contents));
		else
			return View::make('page')->with(array('page' => $page, 'contents' => $contents));
			
	});

---------

###7. Bonus (HipChat)

To give an idea of how simple/quick it is to add awesome (and super useful) functionality when you use Composer with Laravel, we'll quickly implement the **HipChat Broken CMS Broken Real Time Reporting** feature. 

----

Composer automatically downloaded the HipChat API library from github fro us, and has setup all of the autoloading (so that we can directly start using the library without having to specifically include it in our code somewhere).

I think it'd be nice to notify the *Broken CMS* room on hipchat anytime a non-admin user accesses a Broken CMS page.

----

All we need to do is check if there is a logged in user and if not then send the message!

	if(!Auth::check())
	{
		$room = "Broken CMS";
		$person = "ERROR 500";
		$message = "Attention @all - somebody is accessing a page that was created using our fabulous new CMS! The page was " .  Request::url() . "  (tableflip)";
		
		$token = '';
		$hc = new HipChat\HipChat($token);
		
		$hc->message_room($room, $person, $message, true, 'red', 'text');
	
	}

