/**
 *  Controls mouse input
 */

var y = c.offsetTop;
var Yoffset = y + 45;
var Xoffset = 5;
c.addEventListener('click', handleEvent, false);

var numStates = 0;
var clickedState = null;

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
	  if(distance(tempState.x,tempState.y,clickX,clickY) < 20){
		  console.log("State " + tempState.label + " clicked")
		  clickedState = Qstates[i];
		  break;
	  }
  } 
  
  if(pm == PlacementMode.STATE && clickedState == null){
	  numStates += 1;
	  var newState = new State(clickX,clickY, numStates);
	  Qstates.push(newState);
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

function distance(x,y,p,q){
	var a = x - p;
	var b = y - q;
	var c = Math.sqrt((a*a) + (b*b));
	return c;
}