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

	cd ~
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





