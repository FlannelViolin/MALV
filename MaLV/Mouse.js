/**
 *  Controls mouse input
 */

//document.write("<p>merp</p>");

//function checkMouseLocation(ev){
//	
//}
//
//var el = document.getElementById("machineSpace");
//el.addEventListener("click", checkMouseLocation, false);

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
  ellipse(clickX,clickY,20);
 }
 if ((evt.clientX || evt.clientY) &&
     document.compatMode=='CSS1Compat' && 
     document.documentElement && 
     document.documentElement.scrollLeft!=null) {
  clickX = evt.clientX + document.documentElement.scrollLeft;
  clickY = evt.clientY + document.documentElement.scrollTop;

 }
 if (evt.pageX || evt.pageY) {
  clickX = evt.pageX;
  clickY = evt.pageY;
 }

 alert (evt.type.toUpperCase() + ' mouse event:'
  +'\n pageX = ' + clickX
  +'\n pageY = ' + clickY 
  +'\n clientX = ' + evt.clientX
  +'\n clientY = '  + evt.clientY 
  +'\n screenX = ' + evt.screenX 
  +'\n screenY = ' + evt.screenY
 );
 return false;
}