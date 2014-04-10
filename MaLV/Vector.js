/**
 *  Script to model Vectors for use in drawing
 *  	Contains functions to create and manipulate vectors
 *		
 */
 
// Takes the vectors components as params
function Vector(X,Y){
	this.x = X;
	this.y = Y;
	this.normalize = normalizee;
	this.heading = heading;
}

// Normalizes a given vector
function normalizee(vector){
	var length = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
	vector.x/=length;
	vector.y/=length;
	// DEBUG
	// console.log(vector.x + " " + vector.y);
	return vector;
}

// Returns the heading of a given vector
function heading(vector){
	return Math.atan(vector.y/vector.x); 	
}
