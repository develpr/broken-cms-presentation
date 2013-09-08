/* todo: keep the truth out of the dom :( */

$(document).foundation();

var broken = window.broken || {};

/**
 *	Make a new page and go to that new page
 */
broken.breakGroundOnNewPage = function(){

	broken.loader(true);

	var request = $.ajax({
		url: "/api/v1/pages",
		type: "POST",
		data: {},
		dataType: "json"
	});

	request.done(function(result, textStatus, xhr) {

		broken.loader(false);

		//if a new item was created
		if(xhr.status == 201){
			window.location.href = "/page/" + result.id
		}
	});

	request.fail(function(jqXHR, textStatus) {
		broken.loader(false);
		alert( "I guess it wasn't meant to be, because of this thing: " + textStatus );
	});
}

/*
 *	Create a new piece of content in a given location (location being a class)
 */
broken.breakGroundOnNewContent = function(locationClass){

	broken.loader(true);

	var position = $(".content."+locationClass+" .blocks .block").length + 1;

	var request = $.ajax({
		url: "/api/v1/contents",
		type: "POST",
		data: { position:position, page:broken.page },
		dataType: "json"
	});

	request.done(function(result, textStatus, xhr) {
		broken.loader(false);
		//if a new item was created
		if(xhr.status == 201){
			$(".content."+locationClass+" .blocks").append('<div data-content-id="'+result.id+'" class="empty block row"><div class="moveme right"><i class="foundicon-up-arrow"></i><i class="foundicon-down-arrow"></i></div><div class="editable"></div></div>');
			Aloha.jQuery('.editable').aloha();
		}
	});

	request.fail(function(jqXHR, textStatus) {
		broken.loader(false);
		alert("I guess it wasn't meant to be, because of this thing: " + textStatus );
	});

}

/**
 *	Allow us to update the page URL
 */
broken.breakTitleChange = function($title){

	broken.loader(true);

	var newTitle = $title.html();

	var request = $.ajax({
		url: "/api/v1/pages/" + broken.page,
		type: "PUT",
		data: { title:newTitle, '_method':'put' },
		dataType: "json"
	});

	request.done(function(result, textStatus, xhr) {
		broken.loader(false);
		//ok, we updated the title, let's push the history state
		history.replaceState({}, result.title, '/page/' + broken.page + '/' + result.slug);
	});

	request.fail(function(jqXHR, textStatus) {
		broken.loader(false);
		alert("Oh man, the title can't be updated for some reason. I'd refresh the page (also, " + textStatus + ")");
	});

}

/*
 *
 */
broken.breakPositionUpdate = function(event, ui){

	//todo: figure out how to get the actual element we want from this
	$element = ui.item;

	broken.breakContentUpdate($element, true);

}

/**
 *	Updates some content
 *	todo: keep the truth out of the dom :(
 *
 *  @param updatePosition do we update the position
 */
broken.breakContentUpdate = function($content, updatePosition){

	broken.loader(true);

	var id = $content.data('content-id');
	var updatedContent = $content.find('.editable').html();
	var currentPosition = $content.index();

	var updateData = { 'content':updatedContent, '_method':'put'};

	if(updatePosition)
		updateData.position = currentPosition;

	var request = $.ajax({
		url: "/api/v1/contents/" + id,
		type: "PUT",
		data: updateData,
		dataType: "json"
	});

	request.done(function(result, textStatus, xhr) {
		//not much to do...
		broken.loader(false);
	});

	request.fail(function(jqXHR, textStatus) {
		broken.loader(false);
		alert("Something's not right (" + textStatus + ") - maybe refresh the page?");
	});
}


/**
 *	Delete a page - modeled after mariah carey
 */
broken.breakBreakDown = function($content){

	broken.loader(true);

	var request = $.ajax({
		url: "/api/v1/pages/" + broken.page,
		type: "delete",
		data: { '_method':'delete'},
		dataType: "json"
	});

	request.done(function(result, textStatus, xhr) {
		window.location.href = '/';
	});

	request.fail(function(jqXHR, textStatus) {
		broken.loader(false);
		alert("Something's not right (" + textStatus + ") - maybe refresh the page?");
	});
}

/*
 *	Get a list of all pages
 */
broken.breakDownThePages = function($outputContainer, elementTag){

	var request = $.ajax({
		url: "/api/v1/pages",
		type: "get",
		dataType: "json"
	});

	request.done(function(result, textStatus, xhr) {

		$.each(result, function(index, item){
			title = item.title;
			if($.trim(title).length < 1)
				title = "**no title**";

			$outputContainer.append('<' + elementTag + '><a href="'+'/page/' + item.id + '/' + item.slug + '">' + title + '</a></' + elementTag + '>');
		});
	});

}

/*
 *	Show the broken loading page
 */
broken.loader = function(enabled){

	if(enabled)
		$('#broken-loader').show();
	else
		$('#broken-loader').hide();

}


/*
 *
 *			EVENT BINDINGS!!!!!!
 *
 */
$(function(){

	$( ".blocks" ).sortable({
      delay: 100,
	  handle: '.moveme',
	  update: function(event, ui){
		  broken.breakPositionUpdate(event, ui);
	  }
    });

	$('.add-content').on('click', function(event){
		event.preventDefault();
		locationClass = $(this).attr('id');
		broken.breakGroundOnNewContent(locationClass);
	});

	$('#newPage').on('click', function(event){
		event.preventDefault();
		broken.breakGroundOnNewPage();
	});

	$('#deletePage').on('click', function(event){
		event.preventDefault();
		broken.breakBreakDown();
	});


});


