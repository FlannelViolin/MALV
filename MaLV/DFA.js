/**
 * 
 */

// ---------- VARS -----------
var Turing = false;
// List of states
var Qstates     = [];
// Start State
var Qzero       = null;
// Accept States
var FStates     = [];

// input

// step state information
var currentState;
var prevState;


var boxInput = "";
var error = "";
var animate = false; // this boolean will be toggled for running the DFA in check or debug mode.
var alerts = true; // this boolean will turn on and off alerts because the annoy me.
// -------- FUNCTIONS --------

// s is an index in the input string, newInput is if it hasn't been proceessed before	
function step(s,newInput){
	
	// get next state from currentState with next character
	nextState = getNextState( currentState, inputList[s] ); 
	if( nextState == null ){
		alert("Failure, no transition found");
		if(newInput){setAcceptedForInput(AcceptedForInput.NOTACCEPTED);}
		return AcceptedForInput.NOTACCEPTED;
	}
	
	// reset states
	prevState = currentState;
	currentState = nextState;
	nextState = null;
}

function isAccepted(input,newInput){
	// if machine ends in accept state
	if( $.inArray(currentState, FStates) != -1 ){
		alert("Machine completed in accept " + currentState.label + " State for string " + input);
		if(newInput){setAcceptedForInput(AcceptedForInput.ACCEPTED);}
		return AcceptedForInput.ACCEPTED;
	}
	alert("Not accepted, \n finished  in state " + currentState.label + " for string " + input);
	if(newInput){setAcceptedForInput(AcceptedForInput.NOTACCEPTED);}
	return AcceptedForInput.NOTACCEPTED;
}

function readInput(input,newInput){	

	// Check valid machine state
	if(newInput){displayInputs(input,true);}
	if( !checkValidMachine() ){
		alert("Invalid Machine state: " + error);
		if(newInput){setAcceptedForInput(AcceptedForInput.IMPOSSIBLE);}
		return AcceptedForInput.IMPOSSIBLE;
	}
	// DEBUG
	//console.log(input);
	
	// set up initial states
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");
	
	// step through input
	for( s in inputList ){
		if(step(s,newInput)==AcceptedForInput.NOTACCEPTED){
			return AcceptedForInput.NOTACCEPTED;
		}
	}
	
	// return if it was accepted or not
	return isAccepted(input,newInput);
	
}

function checkValidMachine(){
	
	// set up error message
	error = "";
	var isValid = true;
		if(Qzero == null){
			isValid = false;
			error += "\n No Start State set";
		}
		if(FStates[0] == null){
			isValid = false;
			error += "\n No Accept States set";
		}
	return isValid;
	// FIX THIS
}

var animatedInput = 0; // index for reading input
function readInputAnimated(input){
	
	// set up recursive loop
	setTimeout(function(){
		
		ctx.fillStyle="#B7AA86";
		ctx.fillRect(0,0,c.width,c.height);
		
		// draws the machine, needs to be done because we stopped the update
		drawMachine();
		
	
		drawReadingCharacters(animatedInput);

		
		drawHighlighted(currentState.x,currentState.y,currentState.radius+3);

		if(animatedInput  == inputList.length){ // at the end of the input list
		
			if( $.inArray(currentState, FStates) != -1 ){
				
				alert("Machine completed in accept State");
				
				setAcceptedForInput(AcceptedForInput.ACCEPTED);
				animating = false; // updates can start drawing again
				return;
			}
			else{
				alert("Not accepted, \n finished  in state" + currentState.label);
				setAcceptedForInput(AcceptedForInput.NOTACCEPTED);
				animating = false; // updates can start drawing again
				return;
			}
		}
		
		// step with current input
		step(animatedInput,false);
		animatedInput++;
		// calls readInputAnimated, replaces for loop
		requestAnimationFrame(readInputAnimated); // basic recursion 
	},1000); // updates every once every 1 second
	
}



// Draws the current machine state
function drawMachine(){
	for(var i=0; i<Qstates.length; i++){
		Qstates[i].display();
	}
	

	if( drawingTran == true && clickedState != null && pm == PlacementMode.TRANSITION ){
		line(clickedState.x, clickedState.y, mouseX, mouseY, ctx);
		ctx.fillText(lastKeyCode,mouseX,mouseY);
	}
}

//  steps through machine
function debugInput(){
	animatedInput = 0;
	animating = true; // stops updating
	input = document.getElementById('input').value;
	
	displayInputs(input,true);
	// DEBUG
	//console.log(input);
	if( !checkValidMachine() ){
		alert("Invalid Machine state: " + error);
		animating = false;
		setAcceptedForInput(AcceptedForInput.IMPOSSIBLE);
		return false;
	}
	
	// set up states
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");

	boxInput = document.getElementById('input').value;
	
	// start animating through input
	readInputAnimated(boxInput);
}

// just checks input and tells user of accept or reject
function checkInput(){

	boxInput = document.getElementById('input').value;
	console.log(boxInput);
	readInput(boxInput,true);
}



// draws an ellipse 
function drawHighlighted(X,Y,R){
	ctx.strokeWidth = 1;
	ctx.strokeStyle = '#00FF00';
	ctx.clear;
	ellipse(X,Y,R);

}

function setSelectedAsStart(){
	if( selectedState != null ){
		
		clearAccepted();
		Qzero = selectedState;
		//toggle this for display
	
	
	}
}

// toggles accept on and off
function setSelectedAsAccept(){
	if( selectedState != null ){
		clearAccepted();
		if( $.inArray(selectedState, FStates) != -1){
			i = FStates.indexOf(selectedState);
			if(i != -1){
				FStates.splice(i,1);
			}
		}
		else{
			FStates.push(selectedState);
			//toggle this for display
			selectedState.isAccept = !selectedState.isAccept;
			console.log(selectedState.label + " is accept? "  +selectedState.isAccept);
		}
	}
}

function getNextState( current, inputChar){
	// Find the state at the end of the transition that matches the input Character
	// return that state ( or NULL )
	
	next = current.transitions[inputChar];
	
	return next;
}



function clearSelectedState(){
	if( selectedState == null){
		return;
	}
	var index = Qstates.indexOf(selectedState);
	Qstates.splice(index,1);
	selectedState = null;
}

function clearSelectedTransitions(){
	if( selectedState == null){
		return;
	}
	selectedState.transitions = {};
}

// takes array of all previous inputs and rechecks them with a new machine
function checkAllPreviousInput(){ // array should all be strings
	clearAccepted();
	alerts = false;
	for(i in checkedInputs){
		didAccept[i] = readInput(checkedInputs[i],false);
	}
}
