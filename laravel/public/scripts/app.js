"use strict";

$(document).foundation();

var broken = {};

broken.breakContent = function(){
	$(".content.main .blocks").append('<div class="empty block row editable"></div>');
	$( ".blocks" ).sortable( "refresh" );
	Aloha.jQuery('.editable').aloha();
}

$(function(){
	$( ".blocks" ).sortable();
	$( ".blocks" ).disableSelection();
	
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