@extends('layouts.main')

@section('title')
<title>{{$page->title}}</title>
@stop

@section('content')
<div class="title row">
	<div class="large-12">
		<h1 class="editable" id="title">{{$page->title}}</h1>
	</div>
</div>
<div class="content main">
	<div class="blocks">
		@foreach($contents as $content)
		<div data-content-id="{{$content->id}}" class="<?php echo strlen(trim($content->content)) == 0 ? 'empty' : ''; ?> block row">
			<div class="moveme right"><i class="foundicon-up-arrow"></i>
				<i class="foundicon-down-arrow"></i>
			</div>			
			<div class="editable">
				{{$content->content}}
			</div>

		</div>
		@endforeach
	</div>
</div>
<div class="row">
	<a class="large-12 columns text-center add-content" id="main">
		<i class="foundicon-plus"></i>
	</a>
</div>
@stop

@section('scripts')
<script>
var broken = window.broken || {};
broken.page = {{$page->id}};
</script>
@stop