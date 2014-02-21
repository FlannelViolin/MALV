/**
 *  Called at frequent interval, updates the Application State
 *  
 */

function update(){
	var d=new Date();
	var t=d.toLocaleTimeString();
	document.getElementById("demo").innerHTML=t;
}

var timeVar = setInterval(function(){update();},10);



