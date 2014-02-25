/**
 *  Controls mouse input
 */

//var el = document.getElementById("machineSpace");
//el.addEventListener("click", checkMouseLocation, false);

var y = c.offsetTop;
var Yoffset = y + 35;
var Xoffset = 5;
document.onclick = handleEvent;

function handleEvent(e){
 var evt = e ? e:window.event;
 var clickX=0, clickY=0;

 if ((evt.clientX || evt.clientY) &&
     document.body &&
     document.body.scrollLeft!=null) {
  clickX = evt.clientX + document.body.scrollLeft;
  clickY = evt.clientY + document.body.scrollTop;
  
  ctx.strokeStyle = '#ff0000';
  ellipse(clickX-Xoffset,clickY-Yoffset,20);
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