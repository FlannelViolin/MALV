/**
 * 
 */

//
// -------------- VARS ----------------
//
// id
//
//
// Color
// ------------------------------------

// ------------ FUNCTIONS -------------
//
function State( X, Y){
	//alert('State Created');
	this.x = X;
	this.y = Y;
	this.radius = 20;
	this.display = stateDisplay;
	
	this.transitions = {};
}

function stateDisplay(){
	ctx.strokeStyle = '#ff0000';
	ellipse(this.x, this.y, this.radius);
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

