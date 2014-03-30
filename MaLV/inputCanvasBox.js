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
		ictx.fillStyle = 'black';
		ictx.fillText("Checked Input: " + checkedInputs[i],10, 10 +i*bufferX);
	}
	
	
	if(go){
		checkedInputs.push(input);
		go = false;
	}
	drawAccepted();

	
}


function drawReadingCharacters(index){
	ictx.fillStyle="#728C9A";
	ictx.fillRect(0,0,inputCanvas.width,inputCanvas.height);
	displayInputs(input,false);
	var currentString = checkedInputs[checkedInputs.length - 1];
	for(var i = 0; i < index; i++){
		ictx.fillStyle="black";
		ictx.fillText("Checking input: ",10, 20 +checkedInputs.length * bufferX);
		ictx.fillText(currentString[i], 100+(7*i),20 +checkedInputs.length*bufferX);
	
	}
	
}

function drawAccepted(){
	line(inputCanvas.width-60,0,inputCanvas.width-60,inputCanvas.height,ictx);
	for(i in didAccept){
		if(didAccept[i]){
			ictx.fillStyle = 'AAFF00';
			ictx.fillText("O",inputCanvas.width-50,10+i*bufferX);
		}
		if(didAccept[i] == false){
			ictx.fillStyle = 'AA0000';
			ictx.fillText("X",inputCanvas.width-50,10+i*bufferX);
		}
		
	}
}

function setAcceptedForInput (inputAccepted){
	didAccept.push(inputAccepted);
	animating = false;
}

function clearInputCanvas(){
	checkedInputs = [];
	didAccept = [];
}

function clearAccepted(){
	didAccept = [];
}

