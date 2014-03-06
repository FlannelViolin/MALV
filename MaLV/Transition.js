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
	
	this.anchorPoints = new Array(2);
	
	
	// Functions
	this.display = transitionDisplay;
	this.getCharacter = getCharacter;
	this.setCharacter = setCharacter;
	this.getEndState = getEndState;	
	this.setAnchors = setAnchors;
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
	
	setAnchors(startState.snapTransition(endState.position));
	
	line(this.startState.x, this.startState.y, this.endState.x, this.endState.y);
	
	ctx.font="15px Georgia";
	ctx.fillText(this.character,this.midX,this.midY);
}



/*
function getAnchors(){

}*/

// _start and end are vectors that have been snapped
function setAnchors(_start, _end){
	if(_start != null){
		if(anchorPoints[0] == null){
			anchorPoints[0] = new AnchorPoints(_start, this);
		}
		else{
			anchorPoints[0].position = _start;
		}
	}
	if(_end != null){
		if(anchorPoints[1] == null){
			anchorPoints[1] = new AnchorPoint(_end, this);
		}
		else{
			anchorPoints[1].position=_end;
		}
	}
}
