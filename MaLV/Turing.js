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

document.getElementById('RWS').style.visibility = "hidden";

function execute(){
	Tape = document.getElementById('input').value.split("");
	currentState = Qzero;
	if( currentState == null ){
		alert("No start state");
	}
	TapeIndex = 0;
	nextState = null;
	//
	var safety = 0;
	while( true ){
		safety++;
		if( safety > 500 ){
			break;
		}
		
		//DEBUG
		//alert("Current State: " + currentState.label);
		//alert("Input: " + Tape);
		
		// 	Check the character on the tape using TapeIndex
		var tempChar = Tape[TapeIndex];
		//	Get the transition attached to that character
		var tempTran = currentState.transitions[tempChar];
		//	If there is no matching transition - Failure
		if( tempTran == null ){
			if( $.inArray(currentState, FStates) != -1){
				alert("Finished in Accept State");
				return;
			}
			alert("No valid transition found or No character to read");
			return;
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
	}
}

function checkInput(){
	execute();
}

function debugInput(){
	execute();
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

