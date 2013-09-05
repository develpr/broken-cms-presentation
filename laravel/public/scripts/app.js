"use strict";

$(document).foundation();

var broken = {};

broken.breakContent = function(){
	$(".content.main .blocks").append('<li class="empty block row editable"></li>');
	$( ".blocks" ).sortable( "refresh" );
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

// Aloha.ready( function() {
// 	Aloha.jQuery('.editable').aloha();
// });