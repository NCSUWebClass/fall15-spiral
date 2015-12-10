var orient; //orientation. gives the direction that the top of the device is facing.
var character; //character sprite
var bg; //background sprite


//nongoal physics pieces
var a = [
    {x:244,y:290,w:164,h:254},
  {x:244,y:558,w:164,h:200},
  {x:265,y:801,w:205,h:70},
  {x:586,y:204,w:332,h:85},
  {x:482,y:470,w:124,h:373},
  {x:502,y:712,w:82,h:110},
  {x:484,y:801,w:118,h:70},
  {x:823,y:205,w:27,h:85},
  {x:722,y:483,w:229,h:398},
  {x:707,y:777,w:197,h:119},
  {x:83,y:161,w:73,h:152},
{x:32,y:9,w:63,h:20},
{x:169,y:49,w:31,h:96},
{x:183,y:43,w:205,h:53},
{x:262,y:145,w:123,h:34},
{x:319,y:66,w:44,h:15},
{x:355,y:37,w:27,h:74},
{x:505,y:7,w:141,h:13},
{x:441,y:111,w:43,h:101},
{x:500,y:77,w:74,h:32},
{x:643,y:149,w:200,h:24},
{x:610,y:109,w:33,h:59},
{x:689,y:29,w:69,h:57},
{x:783,y:97,w:48,h:27},
{x:827,y:106,w:40,h:116},
{x:930,y:18,w:140,h:35},
{x:917,y:136,w:40,h:58},
{x:935,y:95,w:84,h:24},
{x:995,y:232,w:14,h:200},
{x:960,y:262,w:56,h:30},
{x:857,y:353,w:44,h:121},
{x:970,y:395,w:55,h:72},
{x:888,y:491,w:99,h:32},
{x:852,y:593,w:28,h:168},
{x:904,y:661,w:75,h:32},
{x:855,y:757,w:38,h:71},
{x:938,y:764,w:15,h:72},
{x:973,y:785,w:52,h:26},
//{x:935,y:90,w:128,h:71},
{x:799,y:983,w:71,h:32},
{x:714,y:848,w:199,h:26},
{x:746,y:889,w:34,h:59},
{x:801,y:984,w:68,h:34},
{x:569,y:986,w:218,h:26},
{x:506,y:952,w:19,h:41},
{x:634,y:952,w:19,h:41},
{x:330,y:949,w:46,h:98},
{x:389,y:915,w:74,h:35},
{x:488,y:865,w:43,h:14},
{x:523,y:853,w:28,h:37},
{x:215,y:889,w:44,h:104},
{x:157,y:923,w:73,h:34},
{x:20,y:925,w:40,h:38},
{x:29,y:967,w:22,h:46},
{x:111,y:780,w:107,h:31},
{x:103,y:817,w:17,h:42},
{x:37,y:704,w:73,h:28},
{x:64,y:669,w:13,h:44},
{x:153,y:558,w:22,h:200},
{x:113,y:591,w:57,h:34},
{x:15,y:556,w:30,h:72},
{x:43,y:361,w:84,h:43},
{x:69,y:420,w:31,h:79},
{x:153,y:357,w:25,h:123},
{x:933,y:902,w:131,h:79}
  ];

var p = []; //we will store the created sprites in here

//the goal piece
var goalcoords = {x:689,y:900,w:69,h:74};
var goal;

var bgsize = {x:1000,y:1000};

var charpos = {x:260,y:88};

var characterSpeed = bgsize.x/600;
var gravity = bgsize.y/600;

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

  	if(b > 70 && Math.abs(g) < 20){
		  orient = "UP";
		  character.rotation = 0;
  	}else if(b < -70 && Math.abs(g) < 20){
		  orient = "DOWN";
		  character.rotation = 180; 
 	 }else if(Math.abs(b) < 20 && g < -70){
		  orient = "LEFT";
		  character.rotation = 90;		  
  	}else if(Math.abs(b) < 20 && g > 70){
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
    window.location.href = "win.html";
    playing = false;
  } 

  //drawSprite(bg);
  drawSprite(character);
  //window.addEventListener("deviceorientation", dirChange,true);

}

function setup() {

  playing = true;
	
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

  character.addAnimation("walking","./assets/wc0001.png","./assets/wc0002.png");

  //bg = createSprite(bgsize.x / 2, bgsize.y / 2);

  //character.addImage(characterImg);
  //bg.addImage(bgImg);

  //document.write("6");
  window.addEventListener("deviceorientation", dirChange,true);
 }