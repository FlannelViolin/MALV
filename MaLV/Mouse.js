/**
 *  Controls mouse input
 */

var mouseX = 0;
var mouseY = 0;

var y = c.offsetTop;
var Yoffset = y + 45;
var Xoffset = 5;
//c.addEventListener('click', handleEvent, false);
c.addEventListener('mousedown', moveState, false);
c.addEventListener('mouseup', stopMoveState, false);
c.onmousemove = updateMousePos;

var numStates = 0;
var clickedState = null;
var tranStartState = null;
var selectedState = null;

function moveState(e){
	handleEvent(e);
	if( selectedState != null && pm == PlacementMode.STATE ){
		selectedState.moving = true;
	}
}

function stopMoveState(e){
	if( selectedState != null && pm == PlacementMode.STATE ){
		selectedState.moving = false;
	}
}

function handleEvent(e){
 var evt = e ? e:window.event;
 var clickX=0, clickY=0;

 if ((evt.clientX || evt.clientY) &&
     document.body &&
     document.body.scrollLeft!=null) {
  clickX = evt.clientX + document.body.scrollLeft;
  clickY = evt.clientY + document.body.scrollTop;
  clickX -= Xoffset;
  clickY -= Yoffset;
  
  clickedState = null;
  for(var i=0;i<numStates;i++){
	  var tempState = Qstates[i];
//	  for(var j=0; j < tempState.tranList.length; j++){
//		  tempTran = tempState.tranList[j];
//		  if( distance( tempTran.midX, tempTran.midY, clickX, clickY) < 50 ){
//			  console.log("Transition " +  tempTran.character + " from State " + tempState.label + " clicked");
//			  console.log(lastKeyCode);
//			  tempTran.character = lastKeyCode;
//		  }
//	  }
	  //console.log("Distance to " + tempState.label + ": " + distance(tempState.x,tempState.y,clickX,clickY));
	  if(distance(tempState.x,tempState.y,clickX,clickY) < 42){
		  console.log("State " + tempState.label + " clicked");
		  clickedState = Qstates[i];
		  break;
	  }
  }
  if( selectedState != null){
	  for(var j=0; j < selectedState.tranList.length; j++){
		  tempTran = selectedState.tranList[j];
		  if( distance( tempTran.midX, tempTran.midY, clickX, clickY) < 50 ){
			  console.log("Transition " +  tempTran.character + " from State " + selectedState.label + " clicked");
			  console.log(lastKeyCode);
			  tempTran.character = lastKeyCode;
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
		  var newState = new TuringState(clickX,clickY, numStates);
		  Qstates.push(newState);
		  clearAccepted();
	  }
	  else{
		  selectedState = clickedState;
		  selectedState.toggleSelect();
	  }
  }
 }
 
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

function updateMousePos(e){
	mouseX = e.clientX -= Xoffset;
	mouseY = e.clientY -= Yoffset;
}

function makeNewTran( start, end ){
	//console.log("CHECK");
	var newTran = new Transition(start, end);
	start.addTransition(newTran);
	clearAccepted();
}
