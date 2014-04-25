
// ------------ State -------------
//
var overlapping = new Array();
var textoffset = 0;
//
function State( X, Y, id){
	// Vars
	this.transitions = {};
	this.tranList = new Array();
	this.id = id;
	this.label = id;
	this.x = X;
	this.y = Y;
	this.radius = 20;
	this.selected = false;
	this.moving = false;
	this.drawStartArrow = drawStartArrow;

	// Functions
	//this.snapTransition = snapTransitionToState;
	this.display = stateDisplay;
	this.addTransition = addTransition;
	this.toggleSelect = toggleSelect;
	this.destroy = StateDestroy;
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
	this.radius = 20;
	this.selected = false;
	this.moving = false;
	this.drawStartArrow = drawStartArrow;

	// Functions
	//this.snapTransition = snapTransitionToState;
	this.display = stateDisplay;
	this.addTransition = addTuringTransition;
	this.toggleSelect = toggleSelect;
	this.refreshTrans = refreshTrans;
	this.destroy = StateDestroy;
	
	// Call this initially
	this.refreshTrans();
}
//----------------------------------

function stateDisplay(){
	if(this.moving){
		this.x = mouseX + $(window).scrollLeft();
		this.y = mouseY + $(window).scrollTop();
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
	ctx.fillStyle="black";
	ctx.fillText(this.label,this.x-5,this.y+5);
	
	// Draw all attached transitions
	overlapping = new Array();
	textoffset = 0;
	for(var i=0; i<this.tranList.length; i++){
		T = this.tranList[i];
		T.display();
		overlapping.push(T.endState);
	}
}


function toggleSelect(){
	this.selected = !this.selected;
}


function addTransition( transition ){
	// hook up end state to transition
	this.transitions[transition.character] = transition.endState;
	for( var i=0; i<this.tranList.length; i++ ){
		var T = this.tranList[i];
		
		if( T.character == transition.character ){
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
	this.transitions[transition.character] = transition;
	for(var i=0; i<this.tranList.length; i++){
		var T = this.tranList[i];
		if( T.character == transition.character ){
			var index = this.tranList.indexOf(T);
			this.tranList.splice( index, 1 );
		}
	}
	this.tranList.push(transition);	
}

// refreshes all transitions on alphabet change in turing machine
function refreshTrans(){
	this.transitions = {};
	this.tranList = new Array();
	
	for(var i=0;i<Alphabet.length;i++){
		this.transitions[Alphabet[i]] = this;
		var newT = new Transition( this, this );
		newT.character = Alphabet[i];
		this.tranList.push( newT );
	}
}

function drawStartArrow(){
	// MATH
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

function StateDestroy(){
	// Delete all transitions leading TO this state
	var resetQueue = new Array();
	for(var i=0;i<numStates;i++){
		var deleteTempState = Qstates[i];
		for(var j=0; j < deleteTempState.tranList.length; j++){
			deleteTempTran = deleteTempState.tranList[j];
			if( deleteTempTran.endState == this ){
				resetQueue.push( deleteTempTran );
			}
		}
	}
	for(var k=0;k<resetQueue.length;k++){
		resetQueue[k].reset();
	}

	// Delete myself
	deleteAtIndex = $.inArray(this, Qstates);
	Qstates.splice( deleteAtIndex, 1 );	
	delete this;
}