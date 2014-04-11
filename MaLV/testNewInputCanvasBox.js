var bufferX = 15;

checkedInputs = []; // array of inputs[]s 
input = []; // 2 index arry of all a single input and its relative accepted state 

// takes a new input 
function takeInputs(newInput,go){
	ictx.font="10px Georgia";
	console.log(newInput);
	for(i in checkedInputs){
		ictx.fillStyle = 'black';
		ictx.fillText("Checked Input: " + checkedInputs[i][0],10, 10 +i*bufferX);
	}
	
	
	if(go){
		
		// set up the 'dict'
		input.push(newInput);
		input.push(null);
		checkedInputs.push(input);
		go = false;
	}
	drawAccepted();

}

function drawAccepted(){
	line(inputCanvas.width-60,0,inputCanvas.width-60,inputCanvas.height,ictx);
	for(i in checkedInputs){
		if(checkedInputs[i][1] == AcceptedForInput.ACCEPTED){
			ictx.fillStyle = '#AAFF00';
			ictx.fillText("Accepted",inputCanvas.width-50,10+i*bufferX);
		}
		if(checkedInputs[i][1]== AcceptedForInput.NOTACCEPTED){
			ictx.fillStyle = '#AA0000';
			ictx.fillText("Rejected",inputCanvas.width-50,10+i*bufferX);
		}
		if(checkedInputs[i][1]== AcceptedForInput.IMPOSSIBLE){
			ictx.fillStyle = '#FFFFFF';
			ictx.fillText("Impossible",inputCanvas.width-50,10+i*bufferX);
		}
		
	}
}

function setAcceptedForInput (inputAccepted){
		for(i in checkedInputs){
			if(checkedInputs[i][1] ==null){ // find the latest null value, fill it in
				checkedInputs[i][1] = inputAccpted;
				break;
			}
		}
}

function clearInputCanvas(){
	checkedInputs = [];
}

function clearAccepted(){
	for(i in checkedInputs){
		checkedInputs[i][1] = null;
	}
}