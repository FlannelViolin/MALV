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

var boxInput = "";
var error = "";
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

function readInput(input,newInput){

	//boxInput = document.getElementById('input').value;

	/*if( Qzero == null ){
		Qzero = Qstates[0];
	}*/
	// Check valid machine state
	if( !checkValidMachine() ){
		alert("Invalid Machine state: " + error);
		return false;
	}
	displayInputs(input,newInput);
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");
	

	for( s in inputList ){
		if(alerts){
			if(prevState!=null)
			drawNotHighlighted(prevState.x,prevState.y,prevState.radius+3);
			drawHighlighted(currentState.x, currentState.y, currentState.radius+3);
		}
		if(alerts){
			alert("Searching for transition " + inputList[s] + " from state " + currentState.label);
		}
	
		nextState = getNextState( currentState, inputList[s] );
		if( nextState == null ){
			alert("Failure, no transition found");
			setAcceptedForInput(false);
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
		alert("Machine completed in accept " + currentState.label + " State for string " + input);
		setAcceptedForInput(true);
		return;
	}
	alert("Not accepted, \n finished  in state " + currentState.label + " for string " + input);
	setAcceptedForInput(false);
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
	error = "";
	var returnMe = true;
		if(Qzero == null){
			returnMe = false;
			error += "\n No Start State set";
		}
		if(FStates[0] == null){
			returnMe = false;
			error += "\n No Accept States set";
		}
	return returnMe;
	// FIX THIS
}

var animatedInput = 0; // index for reading input
function readInputAnimated(input){
	
	setTimeout(function(){
		
		
		
		ctx.clearRect(0,0,c.width,c.height);

		//clears ctx for this current state of the machine
		drawMachine();
		//highlights the currrent state
		
		// gets next state 
		drawReadingCharacters(animatedInput+1);
		console.log(inputList[animatedInput]);
		nextState = getNextState(currentState,inputList[animatedInput]); // using animated input instead of for each loop s
		animatedInput++;
		console.log(nextState);
		if(nextState == null){
			alert("no transition found");
			animating = false; // resumes the update method clearing the context
			setAcceptedForInput(false);
			return false; // breaks out of method
		}
		
		prevState = currentState;
		currentState = nextState;
		drawHighlighted(currentState.x,currentState.y,currentState.radius+3);
		nextState = null;
		

		if(animatedInput  == inputList.length){ // at the end of the input list
		
			if( $.inArray(currentState, FStates) != -1 ){
				
				
				alert("Machine completed in accept State");
				setAcceptedForInput(true);
				animating = false; // updates can start drawing again
				return;
			}
			else{
				alert("Not accepted, \n finished  in state" + currentState.label);
				setAcceptedForInput(false);
				animating = false; // updates can start drawing again
				return;
			}
		}
		
		
		// calls readInputAnimated, replaces for loop
		requestAnimationFrame(readInputAnimated);
	},1000); // updates every once every two seconds
	
}




function drawMachine(){
	for(var i=0; i<Qstates.length; i++){
		Qstates[i].display();
	}
	

	if( drawingTran == true && clickedState != null && pm == PlacementMode.TRANSITION ){
		line(clickedState.x, clickedState.y, mouseX, mouseY, ctx);
		ctx.fillText(lastKeyCode,mouseX,mouseY);
	}
}

// alerts are true, steps through machine
function debugInput(){
	animatedInput = 0;
	animating = true;
	input = document.getElementById('input').value;
	console.log(input);
	if( !checkValidMachine() ){
		alert("Invalid Machine state: " + error);
		animating = false;
		return false;
	}
	displayInputs(input,true);
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");

	alerts = true;
	boxInput = document.getElementById('input').value;
	readInputAnimated(boxInput);
}

// just checks input and tells user of accept or reject
function checkInput(){

	alerts = false;
	boxInput = document.getElementById('input').value;
	readInput(boxInput,true);
}


function drawNotHighlighted(X,Y,R){
	ctx.strokeWidth = 3;
	ctx.strokeStyle = '#ffffff';
	ctx.clear;
	ellipse(X,Y,R);
	ellipse(X,Y,R);
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
	//next = null;
	//for( t in current.tranList ){
	//	console.log("input charactger: " + inputChar + " available transition: " + current.tranList[t].character);
	//	if( current.tranList[t].character == inputChar ){
	//		next = current.tranList[t].endState;
	//	}
	//}
	
	//USE THESE vvv
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
		readInput(checkedInputs[i],false);
	}
}
