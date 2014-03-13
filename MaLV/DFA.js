/**
 * 
 */

// ---------- VARS -----------
// List of states
var Qstates     = [];
// Start State
var Qzero       = null;
// Accept States
var FStates     = [];

// input
var input = "";

var animate = false; // this boolean will be toggled for running the DFA in check or debug mode.
var alerts = true; // this boolean will turn on and off alerts because the annoy me.
// -------- FUNCTIONS --------

function setupDFA(){
	// Get the start state
	// Get the state list
	// Get the accept states
	//
	// Set transitions to the start state's transitions
	//  
	// Check if machine state is valid
}

function readInput(){

	input = document.getElementById('input').value;

	if( Qzero == null ){
		Qzero = Qstates[0];
	}
	// Check valid machine state
	if( !checkValidMachine() ){
		alert("Invalid Machine state, check definitions");
		return false;
	}
	
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");
	
	ctx.font="10px Georgia";
	ctx.fillText("Checking input: "+ input,5,20);
	for( s in inputList ){
	
		if(prevState!=null)
		drawNotHighlighted(prevState.x,prevState.y,prevState.radius+3);
		drawHighlighted(currentState.x, currentState.y, currentState.radius+3);
		if(alerts){
			alert("Searching for transition " + inputList[s] + " from state " + currentState.label);
		}
	
		nextState = getNextState( currentState, inputList[s] );
		if( nextState == null ){
			alert("Failure, no transition found");
			return false;
		}
		if(alerts){
			alert("Found transition, advancing to State: " + nextState.label);
		}
		prevState = currentState;
		currentState = nextState;
		nextState = null;
	}
	
	if( $.inArray(currentState, FStates) != -1 ){
		alert("Machine completed in accept State");
		return;
	}
	alert("No more input, finished  in state" + currentState.label);
	// set current state to start state
	// set 'nextState' to null
	//
	// Iterate through input 
	//		set next state to the return of GetNextState( currentState, inputCharacter )
	// 		if its null
	// 			fail and quit
	//		advance to next state
	//
	// Check for success or failure
}

// TODO
function checkValidMachine(){
	// TEMPORARY
	return true;
	// FIX THIS
}

function drawNotHighlighted(X,Y,R){
	ctx.strokeWidth = 3;
	ctx.strokeStyle = 'ffffff';
	ctx.clear;
	ellipse(X,Y,R);
	ellipse(X,Y,R);
}
// draws an ellipse 
function drawHighlighted(X,Y,R){
	ctx.strokeWidth = 1;
	ctx.strokeStyle = '00ff00';
	ctx.clear;
	ellipse(X,Y,R);
}

function setSelectedAsStart(){
	if( selectedState != null ){
		

		Qzero = selectedState;
		//toggle this for display
	
	
	}
}

function setSelectedAsAccept(){
	if( selectedState != null ){
		FStates.push(selectedState);
		//toggle this for display
		selectedState.isAccept = !selectedState.isAccept;
		console.log(selectedState.label + " is accept? "  +selectedState.isAccept);
	}
}

function getNextState( current, inputChar){
	// Find the state at the end of the transition that matches the input Character
	// return that state ( or NULL )
	
	// CHANGE THIS
	next = null;
	for( t in current.tranList ){
		if( current.tranList[t].character == inputChar ){
			next = current.tranList[t].endState;
		}
	}
	
	//USE THESE vvv
	
	//alert(current.transitions.inputChar);
	//next = current.transitions[inputChar];
	
	return next;
}

