var orient; //orientation. gives the direction that the top of the device is facing.
var character; //character sprite
var bg; //background sprite

var song;//music object


//nongoal physics pieces
var a = [
  {x:299,y:299,w:175,h:180},
{x:300,y:10,w:561,h:20},
{x:300,y:590,w:561,h:20},
{x:10,y:300,w:20,h:561},
{x:590,y:300,w:20,h:561}
  ];

var p = []; //we will store the created sprites in here

//the goal piece
var goalcoords = {x:295,y:424,w:67,h:69};
var goal;

var bgsize = {x:600,y:600};

var charpos = {x:230,y:150};

var characterSpeed = 2;
var gravity = 2;

var playing; //make the win messages not happen 1 million tiems

var w; //width of level
var h; //height of level

var characterImg; //image for char
var bgImg; //image for bg

var b = 0; //beta val (orientation)
var g = 0; //gamma val (orientation)

var xbound = bgsize.x; //boundary for lose condition X
var ybound = bgsize.y; //boundary for lose condition Y




function dirChange(e){
	b = e.beta;
 	g = e.gamma;

  	if(b > 50 && Math.abs(g) < 40){
		  orient = "UP";
		  character.rotation = 0;
  	}else if(b < -50 && Math.abs(g) < 40){
		  orient = "DOWN";
		  character.rotation = 180; 
 	 }else if(Math.abs(b) < 40 && g < -50){
		  orient = "LEFT";
		  character.rotation = 90;		  
  	}else if(Math.abs(b) < 40 && g > 50){
		  orient = "RIGHT";
		  character.rotation = 270;
  	}
}

function draw(){
    //window.removeEventListener("deviceorientation", dirChange,true);
    
    background(0,0,0);
    image(bgImg, 0, 0);
    groundFlag = false;
    for(i = 0;i < p.length;i++){
      if(character.overlap(p[i])){
          groundFlag = true;
      }
    }

    if(orient == "UP"){

    if(groundFlag){
      character.position.x += characterSpeed;
    }

    character.position.y += gravity;
    }else if(orient == "DOWN"){

    if(groundFlag){
      character.position.x -= characterSpeed;
    }

    character.position.y -= gravity;
    }else if(orient == "LEFT"){

    if(groundFlag){
      character.position.y += characterSpeed;
    }

    character.position.x -= gravity;
    }else{

    if(groundFlag){
      character.position.y -= characterSpeed;
    }

    character.position.x += gravity;
    }

    //collide the character with all of the physics objects
    for(i = 0;i<p.length;i++){
    	character.collide(p[i]);
    }
    
    camera.zoom = 2;
    camera.position.x = character.position.x;
    camera.position.y = character.position.y;
    

    //check lose condition
    if(playing && (character.position.x > bgsize.x || character.position.y > bgsize.y || character.position.x < 0 || character.position.y < 0)){
      window.location.href = "lose.html";

      playing = false;
    }
   
  
  //check win condition
  if(playing && character.overlap(goal)){
    window.location.href = "nextlevel1.html";
    playing = false;
  } 

  //drawSprite(bg);
  drawSprite(character);
  //window.addEventListener("deviceorientation", dirChange,true);

}

function setup() {

  playing = true;

  song.setVolume(0.1);
  song.play();


  orient = "UP";
  w = bgsize.x;
  h = bgsize.y;

  createCanvas(windowWidth,windowHeight);  


  //document.getElementById("out").innerHTML += "" + window.innerHeight + " " + window.innerWidth;
  //characterImg = loadImage("./assets/character.PNG");
  bgImg = loadImage("./assets/bg.png");

  //document.write("2");
  //create invisible physics pieces
  for(i = 0;i < a.length;i++){
    p[i] = createSprite(a[i].x,a[i].y,a[i].w,a[i].h);
    p[i].visible = false;
  }
  
  goal = createSprite(goalcoords.x, goalcoords.y, goalcoords.w, goalcoords.h);
  character = createSprite(charpos.x, charpos.y);

  character.addAnimation("walking","./assets/WC01.png","./assets/WC09.png");

  //bg = createSprite(bgsize.x / 2, bgsize.y / 2);

  //character.addImage(characterImg);
  //bg.addImage(bgImg);


  //document.write("6");
  window.addEventListener("deviceorientation", dirChange,true);
 }

  function preload(){
  song = loadSound('soundtrack.mp3');
  
 }