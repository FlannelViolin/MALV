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
	
	//DEBUG
	//console.log(JSON.stringify(jQstates));
	document.cookie=JSON.stringify(jQstates, stringifyHelp);
}

function loadFromCookie(){
	cookieString = document.cookie;
	parsed = JSON.parse(cookieString, parseHelp);
	loaded = objectToArray(parsed);
	
	// set Qstates based on loaded

}

function parseHelp(key, value) {
	
	// USE TO RECONSTRUCT OBJECTS
	
	return value;
}

function stringifyHelp(key, value) {
    if (typeof value == 'object' && value != null) {
        if (CyclicCache.indexOf(value) != -1) {
            // Circular reference found, discard key
            return;
        }
        // Store value in cache
        CyclicCache.push(value);
    }
    return value;
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