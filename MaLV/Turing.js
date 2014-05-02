// Simulates a Turing Machine

// ---------- VARS -----------
var Turing = true;
// List of states
var Qstates     = [];
// Tape
var Tape		= [];
var TapeIndex   = 0;
// Start State
var Qzero       = null;
// Accept States
var FStates     = [];
// Alphabet
var Alphabet 	= new Array('X');

var currentState = null;
var nextState 	 = null;

document.getElementById('RWS').style.visibility = "hidden";

function setup(){
	Tape = document.getElementById('input').value.split("");
	currentState = Qzero;
	if( currentState == null ){
		alert("No start state");
	}
	TapeIndex = 0;
	nextState = null;
	displayInputs(Tape.toString(),true);
}

function step(){
	//DEBUG
	//alert("Current State: " + currentState.label);
	//alert("Input: " + Tape);
		
	// 	Check the character on the tape using TapeIndex
	var tempChar = Tape[TapeIndex];
	//	Get the transition attached to that character
	var tempTran = currentState.transitions[tempChar];
	//	If there is no matching transition - Failure
	if( tempTran == null ){
		return false;
	}		
	// 	Write the character attached to the transition
	Tape[TapeIndex] = tempTran.writeCharacter;
	//  Move the TapeIndex according to the transition
	TapeIndex += tempTran.tapeShift;
	if( TapeIndex < 0 ){
		Tape.unshift(0);
	}
	if( TapeIndex > Tape.length ){
		Tape.push(0);
	}
	// 	Advance to the transitions "endState"
	currentState = tempTran.endState;
		
	// Update the input string
	var tempstring = "";
	for( i in Tape ){
		tempstring += Tape[i];
	}
	document.getElementById('input').value = tempstring;
	
	return true;
}

function readInputAnimated(){

	
	
	// set up recursive loop
	setTimeout(function(){
		
		ctx.fillStyle="#B7AA86";
		ctx.fillRect(0,0,c.width,c.height);
		
		// draws the machine, needs to be done because we stopped the update
		//drawMachine();
		for(var i=0; i<Qstates.length; i++){
			Qstates[i].display();
		}
		
	
		drawReadingCharacters(TapeIndex);

		
		//drawHighlighted(currentState.x,currentState.y,currentState.radius+3);
		
		// step with current input
		foundAState = step();

		if(!foundAState){ // at the end of the input list
		
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
		
		// calls readInputAnimated, replaces for loop
		requestAnimationFrame(readInputAnimated); // basic recursion 
	},1000); // updates every once every 1 second
	
}

function checkInput(){
	//
}

function debugInput(){
	setup();
	readInputAnimated();
}

function setSelectedAsStart(){
	if( selectedState != null ){
		Qzero = selectedState;
		//toggle this for display	
	}
}

// toggles the if a state is an accepted state or not
function setSelectedAsAccept(){
	if( selectedState != null ){
		if( $.inArray(selectedState, FStates) != -1){
			i = FStates.indexOf(selectedState);
			// remove it from the array
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

//Updates alphabets based on input box
function RefreshAlphabet(){
	Alphabet = new Array();
	var ab = document.getElementById('Alphabet').value;
	for( var c in ab.split("") ){
		Alphabet.push(ab.split("")[c]);
	}
	for(var i=0; i<Qstates.length; i++ ){
		st = Qstates[i];
		st.refreshTrans();
	}
}

// Populates the transition property text boxes when a transition is selected
function populateRWS(){
	if( selectedTran != null ){
		document.getElementById('RWS').style.visibility='visible';
		document.getElementById('Read').value = selectedTran.character;
		document.getElementById('Write').value = selectedTran.writeCharacter;
		document.getElementById('Shift').value = selectedTran.tapeShift;
	}
}

