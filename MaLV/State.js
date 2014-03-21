
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
	this.position = new Vector(X,Y);
	this.radius = 20;
	this.selected = false;
	this.moving = false;
	this.drawStartArrow = drawStartArrow;

	// Functions
	this.snapTransition = snapTransitionToState;
	this.display = stateDisplay;
	this.addTransition = addTransition;
	this.toggleSelect = toggleSelect;
}
//----------------------------------
// ---------- Turing State ---------
//
function TuringState( X, Y, id){
	//alert('State Created');
	
	// Vars
	this.transitions = {};
	this.tranList = new Array();
	this.id = id;
	this.label = id;
	this.x = X;
	this.y = Y;
	this.position = new Vector(X,Y);
	this.radius = 20;
	this.selected = false;
	this.moving = false;
	this.drawStartArrow = drawStartArrow;

	// Functions
	this.snapTransition = snapTransitionToState;
	this.display = stateDisplay;
	this.addTransition = addTuringTransition;
	this.toggleSelect = toggleSelect;
	this.refreshTrans = refreshTrans;
	
	this.refreshTrans();
}
//----------------------------------

function stateDisplay(){
	if(this.moving){
		this.x = mouseX;
		this.y = mouseY;
	}	
	if(this.selected){
		ctx.strokeStyle = '#ff0000';
	}
	else{
		ctx.strokeStyle = '#000000';
	}

	if($.inArray(this, FStates) != -1){
		//ctx.strokeStyle = "#00ff00"; // the correct way to denote accept state is nested circles
		ellipse(this.x,this.y, this.radius-5);
	}
	if(Qzero == this){
		// the correct way to denote start state is an arrow pointing to the state
		//ctx.strokeStyle = "#0000ff";
		this.drawStartArrow();
		
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
function snapTransitionToState(p){

	// MATH
	// get vector from one position to the next

	var snapped = new Vector(this.x - p.x, this.y - p.y);

	//normalize
	snapped = normalizee(snapped);
	// get angle of
	var angle = snapped.heading(snapped);
	// find point along circle and add to position
	snapped.x = snapped.x - (Math.cos(angle)*this.radius) + this.x;
	snapped.y = snapped.y - (Math.sin(angle)*this.radius) + this.y;
}

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
	this.transitions[transition.character] = transition.endState;
	for( var T in this.tranList ){
		if( T.character = transition.character ){
			var index = this.tranList.indexOf(T);
			this.tranList.splice( index, 1 );
		}
	}
	this.tranList.push(transition);	
}

function addTuringTransition( transition ){
	if( !(Alphabet.indexOf(transition.character) > -1 ) ){
		return;
	}
	console.log("CHECK");
	this.transitions[transition.character] = transition.endState;
	for( var T in this.tranList ){
		if( T.character = transition.character ){
			var index = this.tranList.indexOf(T);
			this.tranList.splice( index, 1 );
		}
	}
	this.tranList.push(transition);	
}

function refreshTrans(){
	this.transitions = {};
	this.tranList = new Array();
	
	for( var symbol in Alphabet ){
		this.transitions[symbol] = this;
		this.tranList.push( new Transition( this, this ));
	}
}

function drawStartArrow(){
	var a = this.radius*3;
	var b = -this.radius;
	
	var angle = Math.atan(b/a);
	if(a < 0){
		angle += Math.PI;
	}
	var xPoint = this.x - this.radius;
	var yPoint = this.y;
	
	var tail1XOffset = Math.cos((angle - 20*Math.PI/180))*-20;
	var tail1YOffset = Math.sin((angle - 20*Math.PI/180))*-20;
	
	var tail2XOffset = Math.cos((angle + 20*Math.PI/180))*-20;
	var tail2YOffset = Math.sin((angle + 20*Math.PI/180))*-20;
	
	line(xPoint, yPoint, xPoint + tail1XOffset, yPoint-tail1YOffset, ctx);
	line(xPoint, yPoint, xPoint + tail2XOffset, yPoint-tail2YOffset, ctx);
	
}