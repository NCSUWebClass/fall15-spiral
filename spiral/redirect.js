//If we don't see an orientation event in the first 3 seconds, assume invalid device and redirect accordingly. Otherwise, redirect to the game.

window.addEventListener("deviceorientation", handleDirChange, true);

setTimeout(function(){ 
   window.location.href = "./spiral/desktop.html"; 
}, 3000);

function handleDirChange(e){
  if(e.beta){
	 window.location.href = "./spiral/welcome.html";
  }
}
