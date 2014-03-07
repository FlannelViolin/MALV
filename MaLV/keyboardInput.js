var lastKeyCode = "";

//function handleKeyPress(e){
//	lastKeyCode = e.keyCode;
//   console.log("Keycode set to " + lastKeyCode);
//}

$(document).ready(function(){
	console.log("MERP");
  $(this).keydown(function(e){
    lastKeyCode = String.fromCharCode(e.keyCode);
    console.log("Keycode set to " + lastKeyCode);
  });
  $("input").keyup(function(){
   //
  });
});