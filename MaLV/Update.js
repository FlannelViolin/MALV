/**
 *  Called at frequent interval, updates the Application State
 *
 *	Should be used for things that are time dependent  
 */

 // Variables to determine state of the application 
var drawingTran = false;		// If a transition is being created
var pm = PlacementMode.STATE;	// The placement mode
var animating = false;			// If the application is animating the current machine

// Called at a set interval
function update(){
	
	// animating is turned off when we want normal functionality, this will allow debug input to work	
	if(!animating){
	
		// Clear the canvases
		ctx.fillStyle="white";
		ctx.fillRect(0,0,c.width,c.height);
		ictx.fillStyle="#728C9A";
		ictx.fillRect(0,0,inputCanvas.width,inputCanvas.height);
		pctx.fillStyle="#EEE9E9";
		pctx.fillRect(0,0,pointerCanvas.width,pointerCanvas.height);
		// Draw the elements in their current state
		displayInputs(input,false);
		for(var i=0; i<Qstates.length; i++){
			Qstates[i].display();
		}		
	}
	
	// Set the selected transitions attributes to those in the text boxes
	if( Turing && selectedTran != null ){
		selectedTran.character = document.getElementById('Read').value;
		selectedTran.writeCharacter = document.getElementById('Write').value;
		selectedTran.tapeShift = parseInt(document.getElementById('Shift').value);
	}

	// Draw a line simulating the transition being created
	if( drawingTran == true && clickedState != null && pm == PlacementMode.TRANSITION ){
		line(clickedState.x, clickedState.y, mouseX, mouseY+$(window).scrollTop(), ctx);
		ctx.fillText(lastKeyCode,mouseX,mouseY+ $(window).scrollTop());
	}
}

// The interval that update is called on (milliseconds)
var timeVar = setInterval(function(){update();},10);

// Placement mode control
function changePlacement(newPlacement){		
	pm = newPlacement;
	// DEBUG
	// console.log(pm + " " + pm.value);
	if(selectedState != null){
		selectedState.toggleSelect();
	}
	selectedState = null;	
}


