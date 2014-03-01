/**
 * 
 */
function Vector(X,Y){
	this.x = X;
	this.y = Y;

}
function normalize(vector){
	var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	vector.x/=length;
	vector.y/=length;
	return vector;
}

function heading(vector){
	return Math.atan(vector.y/vector.x);
}
