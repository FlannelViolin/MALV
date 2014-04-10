
// Handle Keyboard input

var lastKeyCode = "X";			//variable to track the las key pressed

// Called on key press
$(document).ready(function(){
  $(this).keydown(function(e){
    lastKeyCode = String.fromCharCode(e.keyCode);		// Changes lastKeyCode
	// DEBUG
    // console.log("Keycode set to " + lastKeyCode);
    changeSelectedStateLabel();							// Changes the Label of the selected state
  });
  $("input").keyup(function(){
  });
});


function changeSelectedStateLabel(){
	if( selectedState != null ){
		selectedState.label = lastKeyCode;
	}
}