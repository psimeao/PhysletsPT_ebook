///////////////////////////////////////////////////////////////
/////////////There are two main areas to edit (besides the
////////////question and applet down in the body of the page
///////////below the javascript).
//////////
///////// (1) Edit the grading criteria immediately below.
////////  (2) Edit the startProb() function to include all
///////       of the physlet methods to create the animation;
//////	      be sure to add the line 
/////			appletLoaded=true;
////	      to your startProb() funtion.
///
//////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////
/////////////Bugs and features to be added:
////////////
///////////
//////////
///////// (1) Zero-magnitude vectors can cause a correct answer
////////       to be graded wrong.
///////   (2) Need to add a grading criteria of "vector magnitude ratios"
//////        so that on free-body diagrams, for example, you can grade 
/////         whether one vector is twice the magnitude of another.
////	  (3) Change vector drawing to draw a vector based on mouse clicks; 
///           click for the tail of the vector, and click for the head of 
//            the vector.
//
//////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
/////////////Credits:
////////////
///////////
////////// The JavaScript code used here to grade vector drawings
/////////  on Physlets was developed by Aaron Titus and is based upon 
////////   work supported by the National Science Foundation under 
///////    Grant No. DUE-9952323.  Physlets were created by 
//////     Wolfgang Christian of Davidson College.
/////    
////       Please include these credits and give any comments, 
///        suggestions, or additional code to Aaron Titus at
//	   titus@mailaps.org. You may freely modify, use, and 
//         distribute this code.
//
//
//////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
/////////////
////////////	Developers
///////////
//////////	Please add your name to this list if you've 
///////// 	contributed to this code.
////////  
///////       	Aaron Titus
//////
//////////////////////////////////////////////////////////////


//grading criteria
	gradeMagnitudes=false;
	gradeAngles=false;
	gradeComponents=true; //same as gradeMagnitudes=true and gradeAngles=true except tolerance for components is used
	gradePositions=false; //evaluate the location where vectors are drawn from
	
	posTol=0; //absolute
	compTol=0.1; //absolute
	magTol=0; //absolute
	angTol=5*Math.PI/180; //in radians
//

//display options
	showMagnitude=false;
	showAngle=false;
	showLabel=false;
	setDragable=true;
	setResizable=true;
//

//components of correct vectors in the form of variables, x1 and y1, x2 and y2 etc.
//and positions from which vectors should be drawn
	x1=-1.08-(-8);
	y1=0.64;
	xPos1=-8;
	yPos1=0;
	label1="displacement";
//

//use this for more than one vector, make sure all vector components are in the array	
//	xVectorCompAnswers=new Array(x1,x2);
//	yVectorCompAnswers=new Array(y1,y2);
//	xVectorPosAnswers=new Array(xPos1,xPos2);
//	yVectorPosAnswers=new Array(yPos1,yPos2);
//	labelAnswers=new Array(label1,label2);
//

//use this if you only have one vector; otherwise comment out these four lines
	xVectorCompAnswers=new Array();
	yVectorCompAnswers=new Array();
	xVectorPosAnswers=new Array();
	yVectorPosAnswers=new Array();
	labelAnswers=new Array();
	
	xVectorCompAnswers[0]=x1;
	yVectorCompAnswers[0]=y1;	
	xVectorPosAnswers[0]=xPos1;
	yVectorPosAnswers[0]=yPos1;
	labelAnswers[0]=label1;


//positions at which new vectors are first drawn; the student can move the vectors from this position; this should be near the center of the applet
	x=0.25;
	y=0;
	xTailPos=0;
	yTailPos=0;
//


//global variables initialized
	dr=0;
	appletLoaded=false;

//initialization of arrays
		vectorID=0; //physlet object id number initialized
		vectorArray=new Array(); //array of physlet object id numbers for the drawn vectors
		xVectorComponents=new Array(); //array of x-components of drawn vectors
		yVectorComponents=new Array();//array of y-components of drawn vectors
		xVectorPositions=new Array(); //array of x-positions of tails of vectors
		yVectorPositions=new Array();//array of y-positions of tails of vectors
		vectorLabels=new Array(); //array of label values



////////////////////////////////////

function test() {
	var str=getResponse();
//	alert(str);
//	setResponse(str);
	grade=isCorrect(str);
	alert(grade);
}

function setKey() {
	var str=computeAnswer();
//	alert(str);
	setResponse(str);
//	grade=isCorrect(str);
//	alert(grade);
}

function reinitArrays() {
//initialization of arrays
		vectorID=0; //physlet object id number initialized
		vectorArray=new Array(); //array of physlet object id numbers for the drawn vectors
		xVectorComponents=new Array(); //array of x-components of drawn vectors
		yVectorComponents=new Array();//array of y-components of drawn vectors
		xVectorPositions=new Array(); //array of x-positions of tails of vectors
		yVectorPositions=new Array();//array of y-positions of tails of vectors
		vectorLabels=new Array(); //array of label values
	
}

function getResponse() {
	var i=0;
//	alert(vectorArray.length);
	do {
		id=vectorArray[i];
		if(id==undefined){break;} //check to make sure vector is indeed drawn since getW and getH will return an error
		x=document.Animator.getXPos(id);
		y=document.Animator.getYPos(id);
		dx=document.Animator.getW(id);
		dy=document.Animator.getH(id);
		xVectorComponents[i]=dx;
		yVectorComponents[i]=dy;
		xVectorPositions[i]=x;
		yVectorPositions[i]=y;
		i++;
	}
	while(i<(vectorArray.length));
	xPosStr=xVectorPositions.join();
	yPosStr=yVectorPositions.join();
	xCompStr=xVectorComponents.join();
	yCompStr=yVectorComponents.join();
	labelStr=vectorLabels.join();
	response=xPosStr+"~"+yPosStr+"~"+xCompStr+"~"+yCompStr+"~"+labelStr;
//	alert(response);
	return response;
}

function setResponse(response) {
	startProb();
	document.Animator.pause();
	document.Animator.stepBack();
	document.Animator.setAutoRefresh(false);
	delimiter="~";
	responseArray=response.split(delimiter);
	xPosStr=(responseArray[0]);
	yPosStr=(responseArray[1]);
	xCompStr=(responseArray[2]);
	yCompStr=(responseArray[3]);
	labelStr=(responseArray[4]);
	
	xVectorPositions=xPosStr.split(",");
	yVectorPositions=yPosStr.split(",");
	xVectorComponents=xCompStr.split(",");
	yVectorComponents=yCompStr.split(",");
	vectorLabels=labelStr.split(",");

	var i=0;
	do {
//		alert(i);
		id=document.Animator.addObject("arrow2","x=0,y=0,v=1,h=1,filled,thickness=5");
		document.Animator.setDragable(id,true);
		document.Animator.setResizable(id,true);
		
		document.Animator.setW(id,eval(xVectorComponents[i]));
		document.Animator.setH(id,eval(yVectorComponents[i]));
		document.Animator.setX(id,eval(xVectorPositions[i]));
		document.Animator.setY(id,eval(yVectorPositions[i]));

		     	if(setDragable==true){document.Animator.setDragable(id,true);} //false is default
			if(setDragable==true){document.Animator.setResizable(id,true);} //false is default
			
			if(showMagnitude==true) {
				magCalcID=document.Animator.addObject("calculation","x=-2.7,y=0,text=Mag.=");
				document.Animator.makeDataConnection(id,magCalcID,2,"sqrt(w*w+h*h)","0");
				document.Animator.makeDataConnection(id,magCalcID,1,"x+w/2","y+h/2");
			}

			if(showAngle==true) {
				angCalcID=document.Animator.addObject("calculation","x=-2.7,y=0,text=Ang.=");
				document.Animator.makeDataConnection(id,angCalcID,2,"atan2(h,w)*180/pi","0");
				document.Animator.makeDataConnection(id,angCalcID,1,"x+w/4","y+h/4");
			}

			if(showLabel==true) {
				labelID=document.Animator.addObject("text","x=0,y=0,text="+vectorLabels[i]);
				document.Animator.makeDataConnection(id,labelID,1,"x+w*0.8","y+h*0.8");
			}


		vectorArray[i]=id;
		i++;
	}
	while(i<(xVectorComponents.length));
	
	document.Animator.setAutoRefresh(true);
	document.Animator.updateDataConnections();


}

function isCorrect() {

	response=getResponse();

	result=1;
	
	delimiter="~";
	responseArray=response.split(delimiter);
	xPosStr=(responseArray[0]);
	yPosStr=(responseArray[1]);
	xCompStr=(responseArray[2]);
	yCompStr=(responseArray[3]);
	
	xVectorPositions=xPosStr.split(",");
	yVectorPositions=yPosStr.split(",");
	xVectorComponents=xCompStr.split(",");
	yVectorComponents=yCompStr.split(",");

	matchedIndex=new Array(); //store index when a correct vector is matched with the answer

	var i=0;
	do {	//loop through all correct vectors to look for a match
		xPosResp=eval(xVectorPositions[i]);
		yPosResp=eval(yVectorPositions[i]);
		xResp=eval(xVectorComponents[i]);
		yResp=eval(yVectorComponents[i]);
		magResp=Math.sqrt(xResp*xResp+yResp*yResp);
		angRadResp=Math.atan2(yResp,xResp);

		//for this correct vector, look for a drawn vector that matches

		j=0;
		do {
			match=0;
			matchComp=false;
			matchMag=false;
			matchAng=false;
			matchPos=false;
			
//			alert("i="+i+"\n\nj="+j);

			//if student does not draw enough vectors or draws too many vectors, the answer is wrong; it should trap for vectors of zero magnitude--this is a feature to be added
			if (xVectorComponents.length != xVectorCompAnswers.length) {
				match=0;
//				alert("no match");
				break;
			}
			
			matchedBefore=false;
			//see if vector has been matched before
			for (var index=0; index<matchedIndex.length; index++) {
				if(matchedIndex[index]==j) {matchedBefore=true; break;}
			}
			
			if(matchedBefore==false) {
				
				xPosAns=eval(xVectorPosAnswers[j]);
				yPosAns=eval(yVectorPosAnswers[j]);
				xAns=eval(xVectorCompAnswers[j]);
				yAns=eval(yVectorCompAnswers[j]);
				magAns=Math.sqrt(xAns*xAns+yAns*yAns);
				angRadAns=Math.atan2(yAns,xAns);
				
				if(gradeComponents==true) {
//					alert(xResp+"\t"+xAns);
//					alert(yResp+"\t"+yAns);
//					alert(xPosResp+"\t"+xPosAns);
//					alert(yPosResp+"\t"+yPosAns);
					if(((xAns-compTol)<=xResp && xResp<=(xAns+compTol)) && ((yAns-compTol)<=yResp && yResp<=(yAns+compTol))) {
						matchComp=true;
					}				
				}
	
				if(gradeMagnitudes==true) {
//					alert(xResp+"\t"+xAns);
//					alert(yResp+"\t"+yAns);
//					alert(magResp+"\t"+magAns);
					if(((magAns-magTol)<magResp && magResp<(magAns+magTol))) {
						matchMag=true;
					}
				}
	
				if(gradeAngles==true) {
	//				alert(xResp+"\t"+xAns);
	//				alert(yResp+"\t"+yAns);
	//				alert(angRadResp+"\t"+angRadAns);
					if(((angRadAns-angTol)<=angRadResp && angRadResp<=(angRadAns+angTol))) {
						matchAng=true;
					}
				}

				if(gradePositions==true) {
					if(((xPosAns-posTol)<=xPosResp && xPosResp<=(xPosAns+posTol)) && ((yPosAns-posTol)<=yPosResp && yPosResp<=(yPosAns+posTol))) {
						matchPos=true;
					}
				}

				if(matchComp==gradeComponents && matchMag==gradeMagnitudes && matchAng==gradeAngles && matchPos==gradePositions) {match=1;}
				if(match==1){matchedIndex.push(j); break;}
			}
			j++;
		}
		while(j<xVectorCompAnswers.length)
			
		if(match==0){result=0; break;} //break out of loop no correct match was found
		
		i++;

	}
	while(i<(xVectorCompAnswers.length));
	
	return result;

}

function computeAnswer() {

	xPosStr=xVectorPosAnswers.join();
	yPosStr=yVectorPosAnswers.join();
	xCompStr=xVectorCompAnswers.join();
	yCompStr=yVectorCompAnswers.join();
	labelStr=labelAnswers.join();
	answer=xPosStr+"~"+yPosStr+"~"+xCompStr+"~"+yCompStr+"~"+labelStr;

	return answer;

}

function computeFeedback(feedback) {
	feedback="Please review the concepts";
	return feedback;
}
	
function draw() {
		
		var myLabel=0;
		if (appletLoaded==false) {startProb();}
		document.Animator.pause();
		document.Animator.setAutoRefresh(false);
		
		     	vectorID=document.Animator.addObject("arrow2","x="+xTailPos+",y="+yTailPos+",v="+x+",h="+y+",filled,thickness=5");
		     	if(setDragable==true){document.Animator.setDragable(vectorID,true);} //false is default
			if(setDragable==true){document.Animator.setResizable(vectorID,true);} //false is default
			
			if(showMagnitude==true) {
				magCalcID=document.Animator.addObject("calculation","x=-2.7,y=0,text=Mag.=");
				document.Animator.makeDataConnection(vectorID,magCalcID,2,"sqrt(w*w+h*h)","0");
				document.Animator.makeDataConnection(vectorID,magCalcID,1,"x+w/2","y+h/2");
			}

			if(showAngle==true) {
				angCalcID=document.Animator.addObject("calculation","x=-2.7,y=0,text=Ang.=");
				document.Animator.makeDataConnection(vectorID,angCalcID,2,"atan2(h,w)*180/pi","0");
				document.Animator.makeDataConnection(vectorID,angCalcID,1,"x+w/4","y+h/4");
			}

			if(showLabel==true) {
				myLabel=prompt("Please type a label for the vector","");
				labelID=document.Animator.addObject("text","x=0,y=0,text="+myLabel);
				document.Animator.makeDataConnection(vectorID,labelID,1,"x+w*0.8","y+h*0.8");
			}

	
		lastIndex=vectorArray.length;
		vectorArray[lastIndex]=vectorID;
		xVectorComponents[lastIndex]="default";
		yVectorComponents[lastIndex]="default";
		xVectorPositions[lastIndex]="default";
		yVectorPositions[lastIndex]="default";
		if(myLabel!=0){vectorLabels[lastIndex]=myLabel;}
		else{vectorLabels[lastIndex]="default";}

		document.Animator.setAutoRefresh(true);

		document.Animator.updateDataConnections();

}

function clearScreen() {
	document.Animator.setDefault();
	reinitArrays();
	startProb();
	document.Animator.updateDataConnections();
}

function resetToZero() {

	var str=getResponse();
//	alert(str);
	if(str!="~~~~"){
		startProb();
		setResponse(str);
		document.Animator.pause();
	}
	else{	
		startProb();
		document.Animator.pause();
	}
}


//
