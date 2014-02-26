/**
 *  Controls mouse input
 */

//var el = document.getElementById("machineSpace");
//el.addEventListener("click", checkMouseLocation, false);

var y = c.offsetTop;
var Yoffset = y + 35;
var Xoffset = 5;
c.addEventListener('click', handleEvent, false);
//document.onclick = handleEvent;
var numStates = 0;

function handleEvent(e){
 var evt = e ? e:window.event;
 var clickX=0, clickY=0;

 if ((evt.clientX || evt.clientY) &&
     document.body &&
     document.body.scrollLeft!=null) {
  clickX = evt.clientX + document.body.scrollLeft;
  clickY = evt.clientY + document.body.scrollTop;
  
  //ellipse(clickX-Xoffset,clickY-Yoffset,20);
  
  if(pm.STATE){
	  numStates += 1;
	  var newState = new State(clickX-Xoffset,clickY-Yoffset);
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