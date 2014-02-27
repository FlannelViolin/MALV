/**
 * 
 */

//
// -------------- Transition ----------------
//
// character
// AnchorPoint[]
// endState
// beginState
//
// list or hash of transitions
//
// Color
// ------------------------------------


function Transition(_beginState, _endState){
	this.startState = _beginState;
	this.endState = _endState;
	
	this.startAnchor = new Array();
	this.startAnchor[0] = -1;
	this.startAnchor[1] = -1;
	this.endAnchor = new Array();
	
	this.display = transitionDisplay;
	this.getCharacter = getCharacter;
	this.setCharacter = setCharacter;
	this.getEndState = getEndState;	
}

function getCharacter(){
	

}

function setCharacter(c){
	
}

function getEndState(){
	
}

function drawRecursiveArrow(){
	
}

function drawArrow(){
	
}

function transitionDisplay(){
	
}

function newTransition(_x,_y){
	if(startAnchor[0] == -1 || startAnchor[1] == -1){
		startAnchor[0] = _x;
		startAnchor[1] = _y;
	}
	else{
		
	}
}

/*
function getAnchors(){

}

function setAnchors(_start, _end){

}
*/