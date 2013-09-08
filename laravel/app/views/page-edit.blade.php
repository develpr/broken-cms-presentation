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


/**
 *		setup the aloha editor
 */ 

Aloha.ready( function() {
	Aloha.jQuery('.editable').aloha();
});

Aloha.bind('aloha-editable-activated', function (event, eventArgument) {
	$editing = $(eventArgument.editable.obj[0]).parent();
	$editing.removeClass('empty');
});

Aloha.bind('aloha-editable-deactivated', function (event, eventArgument) {
	
	$content = $(eventArgument.editable.obj[0])
	$editing = $content.parent();
	
	if($content.attr('id') == 'title'){
		broken.breakTitleChange($content);
		return;
	}
		
	if($.trim($content.html()).length < 0){
		$editing.addClass('empty');
	}else{
		broken.breakContentUpdate($editing);
		return;
	}
	
});

</script>
@stop