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
	this.character = lastKeyCode;
	this.midX = (_beginState.x + _endState.x)/2;
	this.midY = (_beginState.y + _endState.y)/2;
	
	this.entX = this.midX;
	this.entY = this.midY;
	
	this.startState = _beginState;
	this.endState = _endState;
	
	this.anchorPoint1 = null;
	this.anchorPoint2 = null;
	
	// For Turing
	this.writeCharacter = '';	// Must be in alphabet
	this.tapeShift = 0; 		// -1 for left, 1 for right, 0 for stay

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

	if( $.inArray(this.endState, overlapping) != -1){
		textoffset += 13;
	}
	
	if( this == selectedTran ){
		ctx.fillStyle="blue";
		if( !Turing ){
			this.character = lastKeyCode;
		}
	}
	else{
		ctx.fillStyle="black";
	}

	this.midX = (this.startState.x + this.endState.x)/2;
	this.midY = (this.startState.y + this.endState.y)/2;

	// THIS DOESNT WORK 

	//this.setAnchors(this.startState.snapTransition(this.endState.position),this.endState.snapTransition(this.startState.position));
	if(this.startState != this.endState){
		//line(this.anchorPoint1.x,this.anchorPoint1.y,this.anchorPoint2.x, this.anchorPoint2.y);
		diffArray = curvedLine(this.startState.x, this.startState.y,this.endState.x,this.endState.y);
		
		ctx.font="15px Georgia";		
		this.drawArrow( diffArray[0], diffArray[1] );
	}
	else{
		recursiveLine(this.startState.x,this.startState.y,this.startState.radius);
		ctx.font="15px Georgia";		
		if( Turing ){
			ctx.fillText((this.character + "," + this.writeCharacter + "," + this.tapeShift),
						this.startState.x,this.startState.y-this.startState.radius-10-textoffset);
			this.entX = this.x;
			this.entY = this.startState.y-this.startState.radius-10;
		}
		else{
			ctx.fillText(this.character,this.startState.x,this.startState.y-this.startState.radius-10-textoffset);
		}
	}
	
	
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

function drawArrow( diffX, diffY ){
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
	
	var pointX = 0;
	var pointY = 0;
	
	var arrowLabel;
	if( Turing ){
		arrowLabel = (this.character + "," + this.writeCharacter + "," + this.tapeShift);
	}
	else{
		arrowLabel = this.character;
	}
	
	if(this.endState.x < this.startState.x){ // end point is to the left of the start point
		if(this.endState.y > this.startState.y){ // end point is under start point
			pointX = this.midX - diffX/1.4;
			pointY = this.midY - diffY/1.4;			
			ctx.fillText(arrowLabel,pointX-diffX,pointY-diffY+textoffset);
		}
		else{ // end point is above start point
			pointX = this.midX - diffX/1.4;
			pointY = this.midY + diffY/1.4;
			ctx.fillText(arrowLabel,pointX-diffX,pointY+diffY+textoffset);
		}
	}else{ // end point is to the right of the start point *
		if(this.endState.y > this.startState.y){ // end point is under start point			
			pointX = this.midX - diffX/1.4;
			pointY = this.midY + diffY/1.4;
			ctx.fillText(arrowLabel,pointX-diffX,pointY+diffY+textoffset);
		}
		else{ // end point is above start point
			pointX = this.midX + diffX/1.4;
			pointY = this.midY + diffY/1.4;
			ctx.fillText(arrowLabel,pointX+diffX,pointY+diffY+textoffset);
		}
	}
	this.entX = pointX;	
	this.entY = pointY;
	
	if( this.startState == selectedState ){
		ctx.fillStyle = "rgba(0,0,255,.5)";
		ellipse(pointX, pointY, 17);
	}
	line(pointX, pointY, pointX - tail1XOffset, pointY-tail1YOffset, ctx);
	line(pointX, pointY, pointX - tail2XOffset, pointY-tail2YOffset, ctx);

	
	//var anchorVector = new Vector(this.stateState.x - this.endState.x,this.startState.y - this.endState.y);
	//anchorVector = normalizee(anchorVector);
	//anchorVector.x *= radius
}
