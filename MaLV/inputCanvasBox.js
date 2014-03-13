/**
 * 
 */
var bufferX = 15; // this var is for the space between inputs in input box

var checkedInputs = [];  // checked inputs for input box
var didAccept = []; // array of booleans if an input was accepted or not
//input is a string
function displayInputs(input,go){
	// I would like to draw a line here but line only draws on the first cnavas not the second one.
	
	ictx.font="10px Georgia";

	for(i in checkedInputs){
	
		ictx.fillText("Checked Input: " + checkedInputs[i],10, 10 +i*bufferX);
	}
	
	ictx.fillText("Checking input: "+ input,10, 20 +checkedInputs.length * bufferX);
	if(go){
		checkedInputs.push(input);
		go = false;
	}
	
	
}

function setAcceptedForInput (inputAccepted){
	didAccept.push(inputAccepted);
}