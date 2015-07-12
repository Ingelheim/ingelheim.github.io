$(document).ready(function(){

	IO.input.registerKeyPressEvents();
	IO.output.welcomeUser();
	IO.input.disableBackButton();
	//
	// window.onbeforeunload = function(e) {
	// 	e.preventDefault();
	// 	 return
	//  };

});
