/**
 *  Controls mouse input
 */

 // Mouse position
var mouseX = 0;
var mouseY = 0;

// Offsets for drawing canvas and detecting input
var y = c.offsetTop;
var Yoffset = y;
var Xoffset = 5;

// Define functions to be called on mouse clicks
c.addEventListener('mousedown', moveState, false);
c.addEventListener('mouseup', stopMoveState, false);
c.onmousemove = updateMousePos;

var numStates = 0;
var clickedState = null;
var tranStartState = null;
var selectedState = null;
var selectedTran = null;

// Called on mouseDown event
function moveState(e){
	handleEvent(e);
	if( selectedState != null && pm == PlacementMode.STATE && selectedTran == null){
		selectedState.moving = true;
	}
}

// Called on mouseUp event
function stopMoveState(e){
	if( selectedState != null && pm == PlacementMode.STATE ){
		selectedState.moving = false;
	}
}

// Called on any mouse Click
function handleEvent(e){
 var evt = e ? e:window.event;
 var clickX=0, clickY=0;

 // Determine location of click
 if ((evt.clientX || evt.clientY) &&
     document.body &&
     document.body.scrollLeft!=null) {
  clickX = evt.clientX + $(window).scrollLeft();
  clickY = evt.clientY + $(window).scrollTop();
  clickX -= Xoffset;
  clickY -= Yoffset;
  
  clickedState = null;
  
  // Check each state
  for(var i=0;i<numStates;i++){
	  var tempState = Qstates[i];
	  
	  // Successful click on a state
	  if(distance(tempState.x,tempState.y,clickX,clickY) < 42){
		  console.log("State " + tempState.label + " clicked");
		  clickedState = Qstates[i];
		  break;
	  }
  }
  
  // A state is already selected
  if( selectedState != null){
  
	  // Check transitions belonging to selected state
	  for(var j=0; j < selectedState.tranList.length; j++){
		  tempTran = selectedState.tranList[j];
		  
		  // Successful click on a transition
		  if( distance( tempTran.entX, tempTran.entY, clickX, clickY) < 30 ){
			  // DEBUG
			  //console.log("Transition " +  tempTran.character + " from State " + selectedState.label + " clicked");
			  lastKeyCode = tempTran.character;
			  selectedTran = tempTran;
			  if( Turing ){
				populateRWS();
			  }
			  selectedState.moving = false;	
			  selectedState.toggleSelect();
			  selectedState = null;			  
			  return;
		  }
	  }
  }
 	
 
  
  if(pm == PlacementMode.TRANSITION){
	  if(drawingTran == false){
		  drawingTran = true;
		  tranStartState = clickedState;
	  }
	  else{
		  if( clickedState != null && tranStartState != null ){
			  makeNewTran(tranStartState, clickedState);
			  clickedState = null;
			  tranStartState = null;
		  }
		  drawingTran = false;
	  }
  }
  
  if(pm == PlacementMode.STATE){
	  if( selectedState != null ){
		  console.log(selectedState.label);
		  selectedState.toggleSelect();
		  selectedState = null;
	  }	  
	  if( clickedState == null ){
		  numStates += 1;
		  if( Turing ){
			var newState = new TuringState(clickX,clickY, numStates);
		  }
		  else{
			var newState = new State(clickX,clickY, numStates);
		  }
		  Qstates.push(newState);
		  clearAccepted();
	  }
	  else{
		  selectedState = clickedState;
		  selectedState.toggleSelect();
		  selectedTran = null;
	  }
  }
 }
 
// DEBUG
// alert (evt.type.toUpperCase() + ' mouse event:'
//  +'\n pageX = ' + clickX
//  +'\n pageY = ' + clickY 
//  +'\n clientX = ' + evt.clientX
//  +'\n clientY = '  + evt.clientY 
//  +'\n screenX = ' + evt.screenX 
//  +'\n screenY = ' + evt.screenY
// );
 return false;
}

// Updates the variables tracking the mouse's position
function updateMousePos(e){
	y = c.offsetTop;
	Yoffset = y;
	Xoffset = 5;
	mouseX = e.clientX -= Xoffset;
	mouseY = e.clientY -= Yoffset;
}

// Make a new transition with start and end states as params
function makeNewTran( start, end ){
	var newTran = new Transition(start, end);
	if( Turing ){
		newTran.writeCharacter = Alphabet[0];
		newTran.tapeShift = 0;
	}
	start.addTransition(newTran);
	clearAccepted();
}

function deleteSelected(){
	// If current selection is a state
	if( selectedState != null ){
		console.log("Deleting State " + selectedState.label);
		selectedState.destroy();
		selectedState = null;
		numStates -= 1;
	}
	
	// If current selection is a transition
	if( selectedTran != null ){
		console.log("Deleting Transition " + selectedTran.character);
		selectedTran.destroy();
	}
}
