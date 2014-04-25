/**
 *  Script to hold vector math for various calculations
 *  	Contains functions to create and manipulate vectors
 *		
 */
 

// Normalizes a given vector
function normalizee(x,y){
	length = Math.sqrt(x * x + y * y);
	x/=length;
	y/=length;
	// DEBUG
	// console.log(vector.x + " " + vector.y);
	return vector;
}

// Returns the heading of a given vector
function heading(x,y){
	return Math.atan(y/x); 	
}
