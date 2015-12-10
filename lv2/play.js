var orient; //orientation. gives the direction that the top of the device is facing.
var character; //character sprite
var bg; //background sprite
var monster;
var monster2;

var song;//music object


//nongoal physics pieces
var a = [
  {x:362,y:112,w:85,h:223},
  {x:455,y:115,w:101,h:55},
  {x:563,y:318,w:282,h:84},
  {x:674,y:146,w:94,h:52},
  {x:763,y:86,w:84,h:172},
  {x:1087,y:21,w:312,h:41},
  {x:1030,y:172,w:291,h:105},
  {x:949,y:292,w:129,h:136},
  {x:1387,y:327,w:445,h:66},
  {x:1313,y:231,w:94,h:127},
  {x:1486,y:70,w:176,h:139},
  {x:1691,y:214,w:101,h:56},
  {x:1783,y:234,w:84,h:253},
  {x:177,y:269,w:175,h:182},
  {x:71,y:29,w:141,h:57},
  ];

var p = []; //we will store the created sprites in here

//the goal piece
var goalcoords = {x:1783,y:71,w:70,h:73};
var goal;

var bgsize = {x:2160,y:360};

var charpos = {x:130,y:100};

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

var monsterPos = {x:556,y:265};
var monster2Pos = {x:1430,y:282};



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
    if(playing && (character.position.x > bgsize.x || character.position.y > bgsize.y || character.position.x < 0 || character.position.y < 0 || character.overlap(monster) || character.overlap(monster2))){
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
  drawSprite(monster);
  drawSprite(monster2);
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
  monsterImg1 = loadImage("./assets/Mini3_Final.png");
  monsterImg2 = loadImage("./assets/Mini1_Final.png");

  //document.write("2");
  //create invisible physics pieces
  for(i = 0;i < a.length;i++){
    p[i] = createSprite(a[i].x,a[i].y,a[i].w,a[i].h);
    p[i].visible = false;
  }
  
  goal = createSprite(goalcoords.x, goalcoords.y, goalcoords.w, goalcoords.h);
  character = createSprite(charpos.x, charpos.y);
  monster = createSprite(monsterPos.x, monsterPos.y);
  monster2 = createSprite(monster2Pos.x, monster2Pos.y);

  monster.addImage(monsterImg1);
  monster2.addImage(monsterImg2);

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