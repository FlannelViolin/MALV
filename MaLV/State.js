/**
 * 
 */

//
// -------------- VARS ----------------
//
// radius
// position
// id
//
// list or hash of transitions
//
// Color
// ------------------------------------

// ------------ FUNCTIONS -------------
//
function State( X, Y){
	//alert('State Created');
	this.x = X;
	this.y = Y;
	this.display = stateDisplay;
}

function stateDisplay(){
	ctx.strokeStyle = '#ff0000';
	ellipse(this.x, this.y, 20);
	// Draw the state with a circle
	// Use radius and Color
	
	// Draw all attached transitions
}

function snapTransition(){
	// MATH
}

function toggleSelect(){
	// Change selection status
}

function addTransition( transition ){
	// add a transition to the attached transition list
}

