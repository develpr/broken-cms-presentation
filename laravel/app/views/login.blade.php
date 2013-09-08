@extends('layouts.main')

@section('title')
<title>404 - Login Not Found</title>
@stop

@section('content')


<div class="row">
	<div class="large-12">
		<div class="special-login">
			<form action="/login" method="post">
				<h1 class="brokencms large">Broken CMS</h1>
				<p>Welcome to the Broken CMS Login page</p>
				<br />
				<div>
					<label for="username">username</label>
					<input type="text" placeholder="kevin" name='username' id='username' />
				</div>
				<div>
					<label for="password">password</label>
					<input type="password" name="password" id="password" />
				</div>
				<button type="submit" class="expand button" name="submit" >submit</button>
			</form>
		</div>
	</div>
</div>

@stop


@section('scripts')

@stop