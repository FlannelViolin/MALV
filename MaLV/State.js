/**
 * 
 */
//
// ------------ State -------------
//
function State( X, Y, id){
	//alert('State Created');
	this.id = id;
	this.label = id;
	this.x = X;
	this.y = Y;
	this.radius = 20;
	this.display = stateDisplay;
	
	this.transitions = {};
	this.tranList = [];
}

function stateDisplay(){
	ctx.strokeStyle = '#ff0000';
	ellipse(this.x, this.y, this.radius);
	// Draw the state with a circle
	// Use radius and Color
	ctx.font="20px Georgia";
	ctx.fillText(this.label,this.x-5,this.y+5);
	
	// Draw all attached transitions
}

// p is a vector (2 space array)
function snapTransition(p){
	// MATH
	var snapped = new Array(this.x - p[0], this.y - p[1]);
	snapped = noramlize(snapped);
}

function toggleSelect(){
	// Change selection status
}

function addTransition( transition ){
	tranList.push(transition);
	transitions[transition.character] = transition.end;
}

