/**
 * 
 */
function Vector(X,Y){
	this.x = X;
	this.y = Y;
	this.normalize = normalizee;
	this.heading = heading;
}
function normalizee(vector){
	//console.log("Normalize called");
	var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	vector.x/=length;
	vector.y/=length;
	console.log(vector.x + " " + vector.y);
	return vector;
}

function heading(vector){
	return Math.atan(vector.y/vector.x);
}
