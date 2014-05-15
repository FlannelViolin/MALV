/**
 *  Functions and Vars for hanfling File IO
 *
 *	
 */
 
 // Determine Environment (Mozilla/Chrome)
 
// TODO will finish
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

// Collection to check for cyclic graph
var CyclicCache = [];

function packToString(){
	CyclicCache = [];
	jQstates = arrayToObject(Qstates); // turn collection of states into an object
	
	if( Turing ){
		jQstates.Alphabet = Alphabet;
	}
	
	//DEBUG
	//console.log(JSON.stringify(jQstates));
	
	saveString = JSON.stringify(jQstates, stringifyHelp);
	return saveString;
}

// Save the current machine as a cookie text string
function saveAsCookie(){	
	saveString = packToString();
	
	//Cookie
	document.cookie=("save=" + saveString); // set cookie
}

function saveAsFile(){	
	saveString = packToString();

	var d = new Date();
	var timeVar = d.getTime();
	alert(timeVar);	 

	//PHP
    	//$.get("Save.php?q="+saveString, saveString, function(data,status){alert(status);});
	$.post("Save.php", {save: saveString, name: timeVar}, function(){});
}

function unpackString(loadString){
	parsed = JSON.parse(loadString || "null", parseHelp); // turn returned string into an object

	if ( Turing ){
		Alphabet = parsed.Alphabet;
	}
	
	Qstates = [];
	numStates = 0;
	// repopulate the machine with states
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
	
	// repopulate the machine with transitions
	for( i in parsed ){
		for( j in parsed[i].tranList ){
			newTran = new Transition( Qstates[i], Qstates[(parsed[i].tranList[j].endState)-1] );
			newTran.character = parsed[i].tranList[j].character;
			Qstates[i].addTransition( newTran );
		}
	}
}

function loadFromCookie(){
	//Cookie
	cookieString = getCookie("save");
	unpackString(cookieString);
}

function loadFromFile(){
	// LOAD TEXT FROM PHP
	
	unpackString(cookieString);
}


// TODO fill this in
function parseHelp(key, value) {
	
	// USE TO RECONSTRUCT OBJECTS
	
	return value;
}


//create the entire cookie 
function stringifyHelp(key, value) {
	//DEBUG
	//console.log(key);
	if (key == "Alphabet"){
		return value;
	}
	
	if (typeof value == 'function'){
		return; // functions take up alot of space
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

function getCookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++){
		var c = ca[i].trim();
  		if (c.indexOf(name)==0){
			return c.substring(name.length,c.length);
		}
 	}
	return "";
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

function openStringWindow(){
	var stringWindow = window.open('String.html');
	stringWindow.focus();

	//stringWindow.document.write(stringText); 
}

function showString(){
	document.getElementById("stringTextWrapper").innerHTML = "<textarea id='stringText'></textarea>"
	document.getElementById("stringText").value = packToString();
	
}

function loadString(){
	var stringToLoad = document.getElementById("stringText").value; 
	console.log(stringToLoad);
	unpackString(stringToLoad);
}