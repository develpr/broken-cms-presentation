<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	@yield('title')
	<link rel="stylesheet" href="/stylesheets/foundation.min.css">
	<link rel="stylesheet" href="/stylesheets/general_foundicons.css">	
	<link rel="stylesheet" href="/stylesheets/general_foundicons.css">	
	@if(Auth::check())
	<link rel="stylesheet" href="/stylesheets/aloha.css">
	@endif
	<link href='http://fonts.googleapis.com/css?family=Quicksand:300|Amatic+SC' rel='stylesheet' type='text/css'>	
	<link rel="stylesheet" href="/stylesheets/app.css">	
	<!--[if IE]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->
</head>

<body>
	@if(Auth::check())
	<div class="row">
		<div class="large-12">
			<nav class="top-bar">
			  <ul class="title-area">
			    <!-- Title Area -->
			    <li class="name">
			      <h2 class="brokencms"><a href="/">Broken CMS</a></h2>
			    </li>
			    <!-- Remove the class "menu-icon" to get rid of menu icon. Take out "Menu" to just have icon alone -->
			    <li class="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
			  </ul>
			  <section class="top-bar-section">			    
			    <!-- Right Nav Section -->
			    <ul class="right">
			      <li class="divider hide-for-small"></li>
			      <li class="has-dropdown"><a href="#">Pages</a>
			        <ul class="dropdown">
			          <li><label>$this</label></li>			          
			          <li><a href="#" id="deletePage">delete</a></li>
			          <li class="divider"></li>
			          <li><label>GLOBAL</label></li>
			          <li><a href="#" id="newPage">new</a></li>
			        </ul>
			      </li>
				  <li class="has-dropdown"><a href="#">/me</a>		
  			        <ul class="dropdown">
  			          <li><a href="/logout">logout</a></li>
  			        </ul>
  			      </li>	      
			    </ul>
			  </section>
			</nav>
		</div>
	</div>
	@endif

	@yield('content')
	
	<div id="broken-loader" style="display:none;"><div class="panic">&nbsp;</div></div>
 	<script src="/scripts/vendor/jquery-1.10.2.min.js"></script>
	<script src="/scripts/vendor/jquery-ui-1.10.3.custom.min.js"></script>	
    <script src="/scripts/vendor/foundation.min.js"></script>
	
	@if(Auth::check())

	
	<script src="/scripts/vendor/jquery-1.7.2.js"></script>
	<script>
	Aloha = window.Aloha || {};
	Aloha.settings = Aloha.settings || {};
	// Restore the global $ and jQuery variables of your project's jQuery
	Aloha.settings.jQuery = window.jQuery.noConflict(true);
	Aloha.settings.sidebar = { disabled: true };
	</script>
	<script src="/scripts/vendor/require.js"></script>
	<script src="/scripts/vendor/aloha.js" data-aloha-plugins="common/ui,common/format,common/link"></script>
	@endif
	<script src="/scripts/app.js"></script>
	@yield('scripts')
	
</body>
</html>