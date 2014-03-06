/**
 * 
 */
//
// ------------ State -------------
//
function State( X, Y, id){
	//alert('State Created');
	
	// Vars
	this.transitions = {};
	this.tranList = new Array();
	
	this.id = id;
	this.label = id;
	this.x = X;
	this.y = Y;
	this.radius = 20;
	this.selected = false;
	
	// Functions
	this.display = stateDisplay;
	this.addTransition = addTransition;
	this.toggleSelect = toggleSelect;
	this.snapTransition = snapTransition;
}

function stateDisplay(){
	if(this.selected){
		ctx.strokeStyle = '#ffffff';
	}
	else{
		ctx.strokeStyle = '#ff0000';
	}
	ellipse(this.x, this.y, this.radius);
	// Draw the state with a circle
	// Use radius and Color
	ctx.font="20px Georgia";
	ctx.fillText(this.label,this.x-5,this.y+5);
	
	// Draw all attached transitions
	for(var i=0; i<this.tranList.length; i++){
		T = this.tranList[i];
		T.display();
	}
}

// p is a vector (2 space array)
function snapTransition(p){
	// MATH
	// get vector from one position to the next
	var snapped = new Array(this.x - p[0], this.y - p[1]);
	//normalize
	snapped = noramlize(snapped);
	// get angle of
	var angle = heading(snapped);
	// find point along circle and add to position
	snapped[0] = snapped[1] - (Math.cos(angle)*this.radius) + this.x;
	snapped[0] = snapped[1] - (Math.sin(angle)*this.radius) + this.y;
	
	return snapped;
}

function toggleSelect(){
	this.selected = !this.selected;
}

function addTransition( transition ){
	this.tranList.push(transition);
	this.transitions[transition.character] = transition.endState;
}

