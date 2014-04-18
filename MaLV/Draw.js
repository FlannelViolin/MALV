/**
* Draws Stuff
* With Math!
*/

//xy are the center point, r is the radius of the circle
function ellipse(x,y,r){
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI);
	ctx.stroke();
}

// startX/Y point1 of line, endX/y point 2 of line
function line(startX, startY, endX, endY, targetContext){
	targetContext.beginPath();
	targetContext.moveTo(startX, startY); //begin drawing
	targetContext.lineTo(endX,endY);
	targetContext.stroke();
}

// mid point of state
function recursiveLine(midX, midY,radius){

	ctx.beginpath;
	ctx.moveTo(midX - radius,midY);
	var controlPoints = new Array(); //bezierCurveTo([0],[1],[2],[3],endX,endY); after the first moveTo(startX,startY)
	// first point
	controlPoints[0] = midX - radius*2;
	controlPoints[1] = midY - radius;
	///
	controlPoints[2] = midX - radius;
	controlPoints[3] = midY- radius*2;
	ctx.bezierCurveTo(controlPoints[0],controlPoints[1],controlPoints[2],controlPoints[3],midX,midY-radius);
	
	ctx.stroke();
}

// will draw a curved Line
function originalCurvedLine(startX, startY, endX, endY){

	/*var a = startX - endX;
	var b = startY - endY;
	
	var calc = Math.atan(b/a);

	//var calc = heading(new Vector(startX-startY,endX-endY));
	var diffDist; // distance between control points and end points
	var xDiff;
	var yDiff;
	var controlPoints = new Array(); //bezierCurveTo([0],[1],[2],[3],endX,endY); after the first moveTo(startX,startY)

	// is it a vertical line or a horizontal line?
	if(Math.abs(endY - startY) > Math.abs(endX-startX)){
		diffDist  = (endY-startY)/10;		
	}
	else{	
		diffDist  = (endX-startX)/10;
	}
	
	//console.log(calc);
	yDiff = (1.7-calc)*diffDist; // x distance from end points to two control points
	xDiff = calc*diffDist; // y distance from end points to two control points*/
	diffArray = calcDiff(startX,startY,endX,endY);
	//console.log("xDiff:" + xDiff + " yDiff: " + yDiff);
	yDiff = diffArray[1];
	xDiff = diffArray[0];
	var controlPoints = new Array(); //bezierCurveTo([0],[1],[2],[3],endX,endY); after the first moveTo(startX,startY)
	if(endX < startX){ // end point is to the left of the start point
		if(endY > startY){ // end point is under start point
			xDiff = Math.sqrt((xDiff*xDiff));
			yDiff = Math.sqrt((yDiff*yDiff));
			controlPoints[0] = startX-xDiff;//x coord on first control point
			controlPoints[1] = startY-yDiff;//y coord on first control point
			controlPoints[2] = endX-xDiff;//x coord on second control point
			controlPoints[3] = endY-yDiff;// y coord on second control point
		}
		else{ // end point is above start point
			controlPoints[0] = startX-xDiff;//x coord on first control point
			controlPoints[1] = startY+yDiff;//y coord on first control point
			controlPoints[2] = endX-xDiff;//x coord on second control point
			controlPoints[3] = endY+yDiff;// y coord on second control point
		}
	}else{ // end point is to the right of the start point *
		if(endY > startY){ // end point is under start point
			
			controlPoints[0] = startX - xDiff;//x coord on first control point
			controlPoints[1] = startY + yDiff; //y coord on first control point
			controlPoints[2] = endX - xDiff;//x coord on second control point
			controlPoints[3] = endY + yDiff;// y coord on second control point
		}
		else{ // end point is above start point
			xDiff = Math.sqrt((xDiff*xDiff));
			yDiff = Math.sqrt((yDiff*yDiff));
			controlPoints[0] = startX+xDiff;//x coord on first control point
			controlPoints[1] = startY+yDiff;//y coord on first control point
			controlPoints[2] = endX+xDiff;//x coord on second control point
			controlPoints[3] = endY+yDiff;// y coord on second control point
		}
	}
	
	ctx.beginPath;
	ctx.moveTo(startX,startY);
	ctx.bezierCurveTo(controlPoints[0],controlPoints[1],controlPoints[2],controlPoints[3],endX,endY);
	ctx.stroke();
	
	return [xDiff, yDiff];
}

// start X,Y, array of control points, end X,Y
function curvedLine(startX,startY,controlPoints,endX,endY){
	ctx.beginPath;
	ctx.moveTo(starX,startY);
	ctx.bezierCurveTo(controlPoints[0],controlPoints[1],controlPoints[2],controlPoints[3],endX,endY);
	ctx.stroke();
}

function calcDiff(startX,startY,endX,endY){
	a = startX - endX;
	b = startY - endY;
	
	calc = Math.atan(b/a);

	//var calc = heading(new Vector(startX-startY,endX-endY));
	
	// is it a vertical line or a horizontal line?
	if(Math.abs(endY - startY) > Math.abs(endX-startX)){
		diffDist  = (endY-startY)/10;		
	}
	else{	
		diffDist  = (endX-startX)/10;
	}

	//console.log(calc);
	yDiff = (1.7-calc)*diffDist; // x distance from end points to two control points
	xDiff = calc*diffDist; // y distance from end points to two control points
	return [xDiff,yDiff];
}

function distance(x,y,p,q){
	var a = x - p;
	var b = y - q;
	var c = Math.sqrt((a*a) + (b*b));
	return c;
}

