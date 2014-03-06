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
	// Vars
	this.character = "x";
	this.midX = (_beginState.x + _endState.x)/2;
	this.midY = (_beginState.y + _endState.y)/2;
	
	this.startState = _beginState;
	this.endState = _endState;
	
	this.startAnchor = new Array();
	this.startAnchor[0] = -1;
	this.startAnchor[1] = -1;
	this.endAnchor = new Array();
	
	// Functions
	this.display = transitionDisplay;
	this.getCharacter = getCharacter;
	this.setCharacter = setCharacter;
	this.getEndState = getEndState;	
}

function getCharacter(){
	return this.character;
}

function setCharacter(c){
	this.character = c;
}

function getEndState(){
	
}

function drawRecursiveArrow(){
	
}

function drawArrow(){
	
}

function transitionDisplay(){
	this.midX = (this.startState.x + this.endState.x)/2;
	this.midY = (this.startState.y + this.endState.y)/2;
	line(this.startState.x, this.startState.y, this.endState.x, this.endState.y);
	arrowHead( this.endState.x, this.endState.y );
	ctx.font="15px Georgia";
	ctx.fillText(this.character,this.midX,this.midY);
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