@extends('layouts.main')

@section('title')
<title>404 - Broken CMS Sample Package Not Found</title>
@stop


@section('content')

<div class="row">
	<div class="large-12 columns">
		<h1 class="brokencms large">(404) Welcome to Broken CMS</h1>
		<p>
			Welcome to the <span class="brokencms">Broken CMS</span> sample package. Check out the <a href="http://www.brokencms.com/docs"><span class="brokencms">Broken CMS</span> docs</a> to learn more about this fantastically broken cms!
		</p>
	</div>
</div>

<div class="row">
	<div class="large-12 columns">
		<p>Below is a list of the pages currently managed by <span class="brokencms">Broken CMS</span>.</p>
		<div>
			<ul id="pages"></ul>
		</div>
	</div>
</div>

@stop


@section('scripts')
<script>
broken.breakDownThePages($('#pages'), 'li');
</script>
@stop