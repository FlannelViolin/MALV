/**
 *  Functions and Vars for hanfling File IO
 *
 *	
 */
 
 // Determine Environment (Mozilla/Chrome)
 
 // CHROME??
 /*
 require('fs');
 
 fs.open("TESTING.txt",'r+',err);
 */
 
// FIREFOX??
/* 
var file = Components.classes["@mozilla.org/file/local;1"].
           createInstance(Components.interfaces.nsILocalFile);
file.initWithPath("/home");
 
Components.utils.import("resource://gre/modules/NetUtil.jsm");

NetUtil.asyncFetch(file, function(inputStream, status) {
  if (!Components.isSuccessCode(status)) {
    // Handle error!
    return;
  }

  // The file data is contained within inputStream.
  // You can read it into a string with
  var data = NetUtil.readInputStreamToString(inputStream, inputStream.available());
});
*/

var CyclicCache = [];
function saveAsCookie(){
	CyclicCache = [];
	jQstates = arrayToObject(Qstates);
	
	if( Turing ){
		jQstates.Alphabet = Alphabet;
	}
	
	//DEBUG
	//console.log(JSON.stringify(jQstates));
	document.cookie=JSON.stringify(jQstates, stringifyHelp);
}

function loadFromCookie(){
	cookieString = document.cookie;
	parsed = JSON.parse(cookieString || "null", parseHelp);
	
	if ( Turing ){
		Alphabet = parsed.Alphabet;
	}
	
	Qstates = [];
	numStates = 0;
	for( i in parsed ){
		if( Turing ){
			newState = new TuringState( parsed[i].x, parsed[i].y, parsed[i].id );
		}
		else{
			newState = new State( parsed[i].x, parsed[i].y, parsed[i].id );
		}
		Qstates[numStates] = newState;
		numStates ++;		
	}
	for( i in parsed ){
		for( j in parsed[i].tranList ){
			newTran = new Transition( Qstates[i], Qstates[(parsed[i].tranList[j].endState)-1] );
			newTran.character = parsed[i].tranList[j].character;
			Qstates[i].addTransition( newTran );
		}
	}


}

function parseHelp(key, value) {
	
	// USE TO RECONSTRUCT OBJECTS
	
	return value;
}

function stringifyHelp(key, value) {
	//DEBUG
	//console.log(key);
	if (key == "Alphabet"){
		return value;
	}
	
	if (typeof value == 'function'){
		return;
	}
	//DEBUG
	//console.log(key + "---" + value + "---" + typeof value);
    if (typeof value == 'object' && value != null) {
        if (key == "tranList"){
			return value;
		}
		if (key == "endState"){
			return value.id;
		}
    }
	if (key == "character" || key == 'label' || key == 'id' || key == 'x' || key == 'y'){
		return value;
	}
	if (key > -1){
		return value;
	}
    return;
}

function arrayToObject(array){
	jobject = {};
	for(var i=0; i<array.length; i++){
		jobject[i] = array[i];
	}
	return jobject;
}

function objectToArray(jobject){
	array = [];
	for(i in jobject){
		array[i] = jobject[i];
	}
	return array;
}