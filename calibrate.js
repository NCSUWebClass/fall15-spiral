window.addEventListener("deviceorientation", handleDirChange, true);

function handleDirChange(e){
  var b = e.beta;
  var g = e.gamma;

  var flag = false;

  	if(b > 70 && Math.abs(g) < 20){ //Orientation is up
		var flag = true;
  	}else{
		var flag = false;
  	}

  if(flag){
	window.location.href = "http://www4.ncsu.edu/~epswartz/spiral/lv1/play.html";
  }
}
