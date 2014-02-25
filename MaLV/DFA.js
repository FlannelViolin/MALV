/**
 * 
 */

// ---------- VARS -----------
// List of states
var Qstates     = [];
// transitions ( for current state )
var transitions = {};
// Start State
var Qzero       = null;
// Accept States
var FStates     = [];

// input
var input = "";



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
	// Check valid machine state
	//
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

function checkValidMachine(){
	//
}

function getNextState( current, inputChar){
	// Find the state at the end of the transition that matches the input Character
	// return that state ( or NULL )
}

