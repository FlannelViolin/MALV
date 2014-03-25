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
	//
	//The Loop
	// 	Check the character on the tape using TapeIndex
	//	Get the transition attached to that character
	//		If there is no matching transition - Failure
	// 	Write the character attached to the transition
	//  Move the TapeIndex according to the transition
	// 	Advance to the transitions "endState"
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