/**
 * 
 */
// p being the position of the anchor point on the canvas, t being the transition.
function AnchorPoint(p, t){
	this.position = p;
	this.myTransition = t;
	this.radius = 5;
	this.display = anchorPointDisplay;
}

function anchorPointDisplay(){
	ctx.strokeStyle = '#ff0000';
	ellipse(p.x, p.y, radius);
	
}