/**
 *  Controls mouse input
 */

var mouseX = 0;
var mouseY = 0;

var y = c.offsetTop;
var Yoffset = y + 45;
var Xoffset = 5;
c.addEventListener('click', handleEvent, false);
c.onmousemove = updateMousePos;

var numStates = 0;
var clickedState = null;
var tranStartState = null;
var selectedState = null;

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
	  //console.log("Distance to " + tempState.label + ": " + distance(tempState.x,tempState.y,clickX,clickY));
	  if(distance(tempState.x,tempState.y,clickX,clickY) < 42){
		  console.log("State " + tempState.label + " clicked");
		  clickedState = Qstates[i];
		  break;
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
		  var newState = new State(clickX,clickY, numStates);
		  Qstates.push(newState);
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
}
