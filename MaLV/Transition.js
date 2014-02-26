/**
 * 
 */

//
// -------------- VARS ----------------
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

// ------------ FUNCTIONS -------------
//
var startAnchor = new Array();
startAnchor[0] = -1;
startAnchor[1] = -1;
//var endAnchor = new Array();

function Transition(_beginState, _endState){
	this.display = transitionDisplay();
	this.getCharacter = getCharacter();
	this.setCharacter = setCharacter();
	this.getEndState = getEndState();
	
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
		line(startAnchor[0],startAnchor[1])
	}
}

/*
function getAnchors(){

}

function setAnchors(_start, _end){

}
*/