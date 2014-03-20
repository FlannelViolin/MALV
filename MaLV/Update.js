/**
 *  Called at frequent interval, updates the Application State
 *  
 */

var drawingTran = false;
var pm = PlacementMode.STATE;
var animating = false;

function update(){
	var d=new Date();
	var t=d.toLocaleTimeString();
	document.getElementById("demo").innerHTML=t;	
	if(!animating){
		ctx.clearRect(0,0,c.width,c.height);
		//console.log("not animating");
		
		ictx.clearRect(0,0,inputCanvas.width,inputCanvas.height);
		displayInputs(input);
		for(var i=0; i<Qstates.length; i++){
			Qstates[i].display();
		}
		

		if( drawingTran == true && clickedState != null && pm == PlacementMode.TRANSITION ){
			line(clickedState.x, clickedState.y, mouseX, mouseY, ctx);
			ctx.fillText(lastKeyCode,mouseX,mouseY);
		}
	}
	//ictx.clearRect(0,0,inputCanvas.width,inputCanvas.height);
	//displayInputs(input);
	//curvedLine(c.width/2,c.height/2,mouseX,mouseY);
	//console.log("MouseX " + mouseX);
	//console.log("MouseY " + mouseY);
	
	/*for(var i=0; i<Qstates.length; i++){
		Qstates[i].display();
	}
	

	if( drawingTran == true && clickedState != null && pm == PlacementMode.TRANSITION ){
		line(clickedState.x, clickedState.y, mouseX, mouseY, ctx);
		ctx.fillText(lastKeyCode,mouseX,mouseY);
	}*/
	
// ------------------------ Everything that happens in Processing update: ----------------------------
// 
//	  background(DEFAULT_BACKGROUND); 	// Reset Background ( not necessary ? )
//	  for( State s: allStates){
//		    s.display();				// Call display() for all states
//		  }
	
//		  drawNewTransition();
//
//		  hud.display();				
//		  eBox.display();
//		  
//		  line(250,0,250,height);		// The control panel Boundary ( not necessary because of Canvas )
//		 
//		  
//		  // Textbox					// Draw the textbox ( should be unnecessary because of TextBox object )
//		  fill(0);
//		  text(inputString, 10, 300);
//		  text("Seperate characters with commas", 10, 330);
//		  noFill();
//		  rect(9,260, 200, 45);
//		  // END Textbox
//		  
//		  if(hud.pleaseClear()){		// Hud management, should be dealt with by button objects
//		     allStates.clear(); 
//		  }
// ----------------------------------------------------------------------------------------------------------
}

var timeVar = setInterval(function(){update();},10);


function changePlacement(newPlacement){
		
	pm = newPlacement;
	console.log(pm + " " + pm.value);
	if(selectedState != null){
		selectedState.toggleSelect();
	}
	selectedState = null;
	
}


