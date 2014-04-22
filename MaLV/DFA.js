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

function arrayToObject(array){
	jobject = {};
	for(var i=0; i<array.length; i++){
		jobject[i] = array[i];
	}
	return jobject;
}

function objectToArray(jobject){
	array = [];
	for(i in jobject){
		array[i] = jobject[i];
	}
	return array;
}
	
function step(s,newInput){
	
	nextState = getNextState( currentState, inputList[s] );
	if( nextState == null ){
		alert("Failure, no transition found");
		if(newInput){setAcceptedForInput(AcceptedForInput.NOTACCEPTED);}
		return AcceptedForInput.NOTACCEPTED;
	}
	
	prevState = currentState;
	currentState = nextState;
	nextState = null;
}

function isAccepted(input,newInput){
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
	jQstates = arrayToObject(Qstates);
	console.log(JSON.stringify(jQstates));
	
	//boxInput = document.getElementById('input').value;

	/*if( Qzero == null ){
		Qzero = Qstates[0];
	}*/
	// Check valid machine state
	if(newInput){displayInputs(input,true);}
	if( !checkValidMachine() ){
		alert("Invalid Machine state: " + error);
		if(newInput){setAcceptedForInput(AcceptedForInput.IMPOSSIBLE);}
		return AcceptedForInput.IMPOSSIBLE;
	}
	console.log(input);
	//displayInputs(input,true);
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");
	

	for( s in inputList ){
		if(step(s,newInput)==AcceptedForInput.NOTACCEPTED){
			return AcceptedForInput.NOTACCEPTED;
		}
	}
	
	return isAccepted(input,newInput);
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
		
		
		
		//ctx.clearRect(0,0,c.width,c.height);
		ctx.fillStyle="#B7AA86";
		ctx.fillRect(0,0,c.width,c.height);
		//clears ctx for this current state of the machine
		drawMachine();
		//highlights the currrent state
		
		// gets next state 
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

		step(animatedInput);
		animatedInput++;
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
	
	displayInputs(input,true);
	// DEBUG
	//console.log(input);
	if( !checkValidMachine() ){
		alert("Invalid Machine state: " + error);
		animating = false;
		setAcceptedForInput(AcceptedForInput.IMPOSSIBLE);
		return false;
	}
	
	currentState = Qzero;
	prevState = null;
	nextState = null;
	inputList = input.split("");

	boxInput = document.getElementById('input').value;
	readInputAnimated(boxInput);
}

// just checks input and tells user of accept or reject
function checkInput(){

	boxInput = document.getElementById('input').value;
	console.log(boxInput);
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
