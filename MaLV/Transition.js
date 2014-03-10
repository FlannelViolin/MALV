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
	
	this.anchorPoint1 = null;
	this.anchorPoint2 = null;

	// Functions
	this.display = transitionDisplay;
	this.drawArrow = drawArrow;
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

function transitionDisplay(){

	this.midX = (this.startState.x + this.endState.x)/2;
	this.midY = (this.startState.y + this.endState.y)/2;

	// THIS DOESNT WORK 

	//this.setAnchors(this.startState.snapTransition(this.endState.position),this.endState.snapTransition(this.startState.position));
	if(this.startState != this.endState){
		//line(this.anchorPoint1.x,this.anchorPoint1.y,this.anchorPoint2.x, this.anchorPoint2.y);
		curvedLine(this.startState.x, this.startState.y,this.endState.x,this.endState.y);
		
		ctx.font="15px Georgia";
		ctx.fillText(this.character,this.midX,this.midY);
	}
	else{
		recursiveLine(this.startState.x,this.startState.y,this.startState.radius);
		ctx.font="15px Georgia";
		ctx.fillText(this.character,this.startState.x,this.startState.y-this.startState.radius-10);
	}
	this.drawArrow();
	
	if(Qzero == this.startState){
		ctx.strokeStyle = '#ff0000';
	}
	else{
		ctx.strokeStyle = '#000000';
	}

}



/*
function getAnchors(){

}*/

// _start and end are vectors that have been snapped
function setAnchors(_start, _end){
	if(_start != null){
		if(!this.anchorPoint1){
			this.anchorPoint1 = new AnchorPoint(_start, this);
		}
		else{
			this.anchorPoint1.position = _start;
		}
	}
	if(_end != null){
		if(!this.anchorPoint2){
			this.anchorPoint2 = new AnchorPoint(_end, this);
		}
		else{
			this.anchorPoint2.position=_end;
		}
	}
}


function drawArrow(){
	var a = this.startState.x - this.endState.x;
	var b = this.startState.y - this.endState.y;
	
	var angle = Math.atan(b/a);
	if(a < 0){
		angle += Math.PI;
	}
	
	var tail1XOffset = Math.cos((angle - 20*Math.PI/180))*-20;
	var tail1YOffset = Math.sin((angle - 20*Math.PI/180))*-20;
	
	var tail2XOffset = Math.cos((angle + 20*Math.PI/180))*-20;
	var tail2YOffset = Math.sin((angle + 20*Math.PI/180))*-20;
	
	line(this.midX, this.midY, this.midX - tail1XOffset, this.midY-tail1YOffset);
	line(this.midX, this.midY, this.midX - tail2XOffset, this.midY-tail2YOffset);
	
	//var anchorVector = new Vector(this.stateState.x - this.endState.x,this.startState.y - this.endState.y);
	//anchorVector = normalizee(anchorVector);
	//anchorVector.x *= radius
}