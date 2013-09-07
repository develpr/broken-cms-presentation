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
    $table->timestamp('sorted_at');
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
	}
	

----

	<?php
	
	namespace Broken;
	
	use \Eloquent;
	
	class Content extends Eloquent{
	    protected $table = 'contents';
	}
	


###5. Do even more programming - *Controllers*

> *Controllers* handle requests when they come in from a user (first they are *routed* to the controller, which we'll handle in a second). They communicated between the *models* and the *views*. 
