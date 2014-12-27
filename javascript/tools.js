/*
Reduce the number of significant digits in a number.  Return the truncated number.
*/
function chop(val,n){
     if(n<0) return eval(val);
     val=eval(val);
     for(i=0;i<n;i++) val=val*10;
     val=Math.round(val);
     for(i=0;i<n;i++) val=val/10;
     return val;    
}

/*
Check to see if a number is within a given range. 
Return true if number is within [min,max]. Return false otherwise.
*/
function checkRange(val2,min,max){
   val=parseFloat(val2);
   if(min==" ") min=0;
   if(max==" ") max=0;
   if(eval(min)>eval(max)){
		alert("Invalid min-max parameters in checkRange function.");
		return false;
	}
   if(!isFinite(val) ) return false;
   v=eval(val);
   if(v<min) return false;
   if(v>max) return false;
	return true;
}

/*
Check to see if a number is positive.
*/
function isPositive(val){
   if(!isFinite(val) ) return false;
   v=eval(val);
   if(v<=0) return false;
	return true;
}

/*
Check to see if a number is negative.
*/
function isNegative(val){
   if(!isFinite(val) ) return false;
   v=eval(val);
   if(v>=0) return false;
	return true;
}
