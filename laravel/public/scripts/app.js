$(document).foundation();

var broken = {};

broken.breakContent = function(){
	$(".content.main .blocks").append('<div class="empty block row"><div class="moveme right"><i class="foundicon-up-arrow"></i><i class="foundicon-down-arrow"></i></div><div class="editable"></div></div>');
	Aloha.jQuery('.editable').aloha();
}

$(function(){
	$( ".blocks" ).sortable({
      delay: 300,
	  handle: '.moveme'
    });

	$('.add-content').on('click', function(event){
		event.preventDefault();
		broken.breakContent();
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

	if($.trim($content.html()).length < 5){
		$editing.addClass('empty');
	}

});