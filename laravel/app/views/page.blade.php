@extends('layouts.main')

@section('title')
<title>{{$page->title}}</title>
@stop

@section('content')
<div class="title row">
	<div class="large-12">
		<h1 id="title">{{$page->title}}</h1>
	</div>
</div>
<div class="content main">
	<div class="blocks">
		@foreach($contents as $content)
		<div class="block row">			
			{{$content->content}}
		</div>
		@endforeach
	</div>
</div>
@stop

@section('scripts')
@stop