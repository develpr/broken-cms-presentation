/* todo: keep the truth out of the dom :( */

$(document).foundation();

var broken = {};

/**
 *	Make a new page and go to that new page
 */
broken.breakGroundOnNewPage = function(){
		
	var request = $.ajax({
		url: "/api/v1/pages",
		type: "POST",
		data: {},
		dataType: "json"
	});
 
	request.done(function(result, textStatus, xhr) {
		//if a new item was created
		if(xhr.status == 201){
			window.location.href = window.location.protocol+"//"+window.location.host + "/page/" + result.id
		}
	});
 
	request.fail(function(jqXHR, textStatus) {
	  alert( "I guess it wasn't meant to be, because of this thing: " + textStatus );
	});
}

/*
 *	Create a new piece of content in a given location (location being a class)
 */
broken.breakGroundOnNewContent = function(locationClass){
	
	var position = $(".content."+locationClass+" .blocks .block").length + 1;

	var request = $.ajax({
		url: "/api/v1/contents",
		type: "POST",
		data: { position:position, page:broken.page },
		dataType: "json"
	});
 
	request.done(function(result, textStatus, xhr) {
		//if a new item was created
		if(xhr.status == 201){
			$(".content."+locationClass+" .blocks").append('<div data-content-id="'+result.id+'" class="empty block row"><div class="moveme right"><i class="foundicon-up-arrow"></i><i class="foundicon-down-arrow"></i></div><div class="editable"></div></div>');
			Aloha.jQuery('.editable').aloha();			
		}
	});
 
	request.fail(function(jqXHR, textStatus) {
	  alert("I guess it wasn't meant to be, because of this thing: " + textStatus );
	});

}

/**
 *	Allow us to update the page URL
 */
broken.breakTitleChange = function($title){
	
	var newTitle = $title.html();

	var request = $.ajax({
		url: "/api/v1/pages/" . broken.page,
		type: "PUT",
		data: { title:newTitle, '_method':'put' },
		dataType: "json"
	});
 
	request.done(function(result, textStatus, xhr) {
		//ok, we updated the title, let's push the history state		
		history.replaceState({}, result.title, 'page/' + broken.page + '/' + result.slug);
	});
 
	request.fail(function(jqXHR, textStatus) {
	  alert("Oh man, the title can't be updated for some reason. I'd refresh the page (also, " + textStatus + ")");
	});
	
}

/**
 *	Updates some content
 *	todo: keep the truth out of the dom :(
 */ 
broken.breakContentUpdate = function($content){
	var id = $content.data('content-id');	
	var updatedContent $content.find('block').html(); 
	var currentPosition = $(".content."+locationClass+" .blocks .block").length + 1;
	
	var request = $.ajax({
		url: "/api/v1/contents/" + id,
		type: "PUT",
		data: { position:currentPosition, content:updatedContent, '_method':'put'},
		dataType: "json"
	});
 
	request.done(function(result, textStatus, xhr) {
		//not much to do...
	});
 
	request.fail(function(jqXHR, textStatus) {
	  alert("Something's not right (" + textStatus + ") - maybe refresh the page?");
	});				
}
// 
// /**
//  *	Updates some content
//  *	todo: keep the truth out of the dom :(
//  */ 
// broken.breakPositionUpdate = function($content){
// 	var id = $content.data('content-id');
// 	var position = $(".content."+locationClass+" .blocks .block").length + 1;
// 	
// 	var request = $.ajax({
// 		url: "/api/v1/contents/" + id,
// 		type: "PUT",
// 		data: { position:position, '_method':'put'},
// 		dataType: "json"
// 	});
//  
// 	request.done(function(result, textStatus, xhr) {
// 		//not much to do...
// 	});
//  
// 	request.fail(function(jqXHR, textStatus) {
// 	  alert("Something's not right (" + textStatus + ") - maybe refresh the page?");
// 	});		
// }


$(function(){
	$( ".blocks" ).sortable({
      delay: 100,
	  handle: '.moveme'
    });

	$('.add-content').on('click', function(event){
		event.preventDefault();
		locationClass = $(this).attr('id');
		broken.breakGroundOnNewContent(locationClass);
	});
	
});


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
	
	console.log($editing.index());
	console.log($editing.prev().index());

	if($.trim($content.html()).length < 5){
		$editing.addClass('empty');
	}

});