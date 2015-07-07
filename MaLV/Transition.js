/**
 *  Script defining transition 'objects' and related methods
 */

 // Transition Constructor
function Transition(_beginState, _endState){
	// Vars
	this.character = lastKeyCode;					// Transitions 'Key'
	
	this.midX = (_beginState.x + _endState.x)/2;	// Midpoint of transition
	this.midY = (_beginState.y + _endState.y)/2;	// Used in drawing calculations
	
	this.entX = this.midX;							// "Entity point" of transition
	this.entY = this.midY;							// Used for selecting transition
	
	this.startState = _beginState;					// Transition's start state
	this.endState = _endState;						// Transitions end State
	
	//this.anchorPoint1 = null;
	//this.anchorPoint2 = null;
	
	// For Turing
	this.writeCharacter = '';	// Must be in alphabet
	this.tapeShift = 0; 		// -1 for left, 1 for right, 0 for stay

	// Functions
	this.display = transitionDisplay;
	this.drawArrow = drawArrow;
	this.getCharacter = getCharacter;
	this.setCharacter = setCharacter;
	this.getEndState = getEndState;	
	//this.setAnchors = setAnchors;
	this.destroy = TranDestroy;
	this.reset = TranReset;
}

// Returns transition's key character
function getCharacter(){
	return this.character;
}

function setCharacter(c){
	this.character = c;
}

function getEndState(){
	return this.endState;
}

function transitionDisplay(){
	// Offsets text if sharing a position with another transition
	if( $.inArray(this.endState, overlapping) != -1){
		textoffset += 13;
	}
	
	// Denote that this is selected transition by color change
	if( this == selectedTran ){
		ctx.fillStyle="blue";
		if( !Turing && (this.character != lastKeyCode)){
			replaceTran = new Transition(this.startState,this.endState);
			this.startState.addTransition(replaceTran);
			selectedTran = replaceTran;
			this.destroy();
		}
	}
	else{
		ctx.fillStyle="black";
	}

	// Calculate current midpoint
	this.midX = (this.startState.x + this.endState.x)/2;
	this.midY = (this.startState.y + this.endState.y)/2;

	// Draw transition if it is between to different states
	if(this.startState != this.endState){
		diffArray = originalCurvedLine(this.startState.x, this.startState.y,this.endState.x,this.endState.y);
		
		ctx.font="15px Georgia";		
		this.drawArrow( diffArray[0], diffArray[1] );
	}
	
	// Draw transition if it is a recursive transition
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


// Draws the transition. painful and complex.
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
}


function TranReset(){
	this.startState.transitions[this.character] = this.startState;
	this.endState = this.startState;	
}

function TranDestroy(){
	clearAccepted();
	if( Turing ){
		this.reset();
		return;
	}
	this.startState.transitions[this.character] = null;
	deleteAtIndex = $.inArray(this, this.startState.tranList);
	this.startState.tranList.splice( deleteAtIndex, 1 );
}	
