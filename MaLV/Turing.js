// Simulates a Turing Machine

// ---------- VARS -----------
var Turing = true;
// List of states
var Qstates     = [];
// Tape
var Tape		= [];
// Start State
var Qzero       = null;
// Accept States
var FStates     = [];
// Alphabet
var Alphabet 	= ['X'];

function execute(){
	//
}





function RefreshAlphabet(){
	for( var state in QStates ){
		state.refreshTrans();
	}
}