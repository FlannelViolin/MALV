/**
 * 
 */
var bufferX = 15; // this var is for the space between inputs in input box
var charWidth = 10;
var checkedInputs = [];  // checked inputs for input box
var didAccept = []; // array of booleans if an input was accepted or not

var fontR = 1.5;
var fontW = 3;
//input is a string, go is whether not it has already been added to the list
function displayInputs(input,go){
	
	// if you change the font size change char Width as well	
	ictx.font="10px Georgia";
	

	for(i in checkedInputs){
		ictx.fillStyle = 'black';
		ictx.fillText("Checked Input: " + checkedInputs[i],charWidth, charWidth +i*bufferX);
	}
	
	// if the input is new
	if(go){
		// add it to the list
		checkedInputs.push(input);
		// input is no longer new
		go = false;
	}
	
	drawAccepted();

}

function drawPointer(index){
	console.log(index);
	pctx.fillStyle = "black";
	pctx.strokeStyle = "black";
	// 		X1         Y1              X2       Y2  
	line(0,pointerCanvas.height/2,pointerCanvas.width,pointerCanvas.height/2,pctx);
}

// Draw each new character as we loop through the input
function drawReadingCharacters(index){
	
	ictx.fillStyle="#728C9A";
	ictx.fillRect(0,0,inputCanvas.width,inputCanvas.height);
	
	// display the inputs, needs to be called because we puase the update
	displayInputs(input,false);
	drawPointer(index);
	// the last string in the list
	var currentString = checkedInputs[checkedInputs.length - 1]; 
	
	// draw the characters
	for(var i = 0; i < index; i++){
		ictx.fillStyle="black";
		ictx.fillText("Checking input: ",charWidth, 20 +checkedInputs.length * bufferX);
		ictx.fillText(currentString[i], 100+(7*i),20 +checkedInputs.length*bufferX);
	
	}
	
}

// inform the user of various accepted states
function drawAccepted(){
	line(inputCanvas.width-60,0,inputCanvas.width-60,inputCanvas.height,ictx);
	for(i in didAccept){
		if(didAccept[i]==AcceptedForInput.ACCEPTED){
			ictx.fillStyle = '#AAFF00';
			ictx.fillText("Accepted",inputCanvas.width-50,10+i*bufferX);
		}
		if(didAccept[i] == AcceptedForInput.NOTACCEPTED){
			ictx.fillStyle = '#AA0000';
			ictx.fillText("Rejected",inputCanvas.width-50,10+i*bufferX);
		}
		if(didAccept[i] == AcceptedForInput.IMPOSSIBLE){
			ictx.fillStyle = '#AA0000';
			ictx.fillText("Invalid",inputCanvas.width-50,10+i*bufferX);
		}
		if(didAccept[i] == AcceptedForInput.CLEARED){
			ictx.fillStyle = '#AA0000';
			ictx.fillText("-",inputCanvas.width-50,10+i*bufferX);
		}
		
	}
}

// inputAccepted is an enum variable from AcceptedForInptu
function setAcceptedForInput (inputAccepted){
	didAccept.push(inputAccepted);
	// resume updating
	animating = false;
}


// clear both arrays and start over
function clearInputCanvas(){
	
	checkedInputs = [];
	
	didAccept = [];
}


// only clear accepted array not entire input array, set up for checking all previous input
function clearAccepted(){
	for(i in didAccept){
		didAccept[i] = AcceptedForInput.CLEARED;
	}
}


