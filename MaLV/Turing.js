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

function execute(){
	Tape = document.getElementById('input').value.split("");
	currentState = Qzero;
	nextState = null;
	//
	var safety = 0;
	while( true ){
		safety++;
		if( safety > 500 ){
			break;
		}	
		
		// 	Check the character on the tape using TapeIndex
		var tempChar = Tape[TapeIndex];
		//	Get the transition attached to that character
		var tempTran = currentState.transitions[tempChar];
		//	If there is no matching transition - Failure
		if( tempTran == null ){
			// FAILURE
		}		
		// 	Write the character attached to the transition
		Tape[TapeIndex] = tempTran.writeCharacter;
		//  Move the TapeIndex according to the transition
		TapeIndex += tempTran.tapeShift;
		if( TapeIndex < 0 ){
			// shift the whole tape right
			// write null at new [0] position
		}
		if( TapeIndex > tape.length ){
			// add new null character to end of tape
		}
		// 	Advance to the transitions "endState"
		currentState = tempTran.endState;
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

function setSelectedAsAccept(){
	if( selectedState != null ){
		FStates.push(selectedState);
		//toggle this for display
		selectedState.isAccept = !selectedState.isAccept;
		console.log(selectedState.label + " is accept? "  +selectedState.isAccept);
	}
}

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

function populateRWS(){
	if( selectedTran != null ){
		document.getElementById('Read').value = selectedTran.character;
		document.getElementById('Write').value = selectedTran.writeCharacter;
		document.getElementById('Shift').value = selectedTran.tapeShift;
	}
}