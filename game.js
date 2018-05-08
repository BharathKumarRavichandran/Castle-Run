var canvas = document.getElementById("canvas");
var gameTitle = document.getElementById("gameTitle");
var ctx = canvas.getContext("2d");

var canvasWidth = 1300; //Canvas's width
var canvasHeight = 610; //Canvas's Height
var spriteWidth = 1400; //Character spritesheet's width
var spriteHeight = 770; //Character spritesheet's height
var baseWidth = 336; //Base ground's image width
var baseHeight = 112; //Base ground's image height
var cartWidth = 100; //Cart's image width
var cartHeight = 100; //Cart's ground image's height
var charX = 50; //Hero image's X-coordinate
var charY = canvasHeight-baseHeight-80; //Hero image's Y-coordinate
var charYconst = canvasHeight-baseHeight-80; //Hero image's Y-coordinate 
var cartX; //Cart's X-coordinate
var cartY; //Cart's Y-coordinate
var rows=2; //No.of rows in character's spritesheet
var cols=5; //No. of columns in character's spritesheet
var charWidth = spriteWidth/cols; //Width of a single character image in spritesheet
var charHeight = spriteHeight/rows; //Height of a single character image in spritesheet
var frameController = 6; //Speed in which frame should be changed
var x=0; //X-frame number
var y=0; //Y-frame number
var srcX=0; //X-coordinate of the current frame
var srcY=0; //Y-coordinate of the current frame
var score = 0; //Player's score 
var scoreControl = 0;
var i = 0; 
var j = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var base = new Image();
var bg1 = new Image();
var bg2 = new Image();
var character = new Image();
var hayCart = new Image();

base.src = "sprites/base.png";
bg1.src= "sprites/sand_brick.png";
bg2.src = "sprites/dark_bricks.png";
character.src = "sprites/character.png";
hayCart.src = "sprites/Hay_Cart.png";

var dead = new Audio("audio/dead.wav");
var gameOver = new Audio("audio/gameOver.mp3");
var jump = new Audio("audio/jump.wav");

var requestAnimationFrame = window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame;


function gameStartCard(){
	gameTitle.innerHTML = "";
	var pat1 = ctx.createPattern(bg1,"repeat");
	ctx.rect(0,0,canvasWidth,canvasHeight-baseHeight+50);
	ctx.fillStyle = pat1;
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(400,180,490,250);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "ORANGE";
	ctx.font = "70px Arial";
	ctx.fillText("CASTLE RUN",420,250);
	ctx.font = "25px Arial";
	ctx.globalAlpha = 0.7;
	ctx.fillStyle = "red";
	ctx.fillText("Run till you live!",550,300);
	ctx.globalAlpha = 1;
	ctx.font = "20px Arial";
	ctx.fillStyle = "green";
	ctx.fillText("Press SPACEBAR to jump.",520,345);
	ctx.fillStyle = "white";
	ctx.font = "26px Arial";
	ctx.fillText("Tap ENTER to start the game!",470,400);	
}

function start(){

	var charX = 50; //Hero image's X-coordinate
	var charY = canvasHeight-baseHeight-80; //Hero image's Y-coordinate
	var charYconst = canvasHeight-baseHeight-80; //Hero image's Y-coordinate 
	var velocity=0;
	var cartXconst = canvasWidth+Math.random()*700 ;
	var cartYconst = charY+45;
	var charFrameWidth = 100; //Character width in each frame to check collision condition
	var dx = -7; //Cart's X-velocity
	var f = 0; //framechanging variable
	var flag = 1; 
	var gravity = 6; 
	var jumpControl = 0; //To control changing of frames of character in jump
	var pause = false;
	var score = 0; //Player's score
	var isInAir=false;

	var cartArray = new Array();

	function stopAudio(audio) {    //Function to stop audio the current audio from playing
	    audio.pause();
	    audio.currentTime = 0;
	}

	function cart(cartX,cartY){ //Function which initialises, contains information about the cart 
		this.cartX = cartX;
		this.cartY = cartY;

		this.update = function(){ //Function to update the cart if it goes out of the canvas
			if(this.cartX <= -cartWidth){
				this.cartX = canvasWidth + Math.random()*700 ;
			}
		}

		this.collide = function(){ //Function to check collision between character and the cart

			if(charX+charFrameWidth >= this.cartX && charX+charFrameWidth <= this.cartX+cartWidth && charY-20+130 >= this.cartY && charY <= this.cartY + cartHeight){
				pause = true;
			}
		}
	}

	function cartArrayInitialiser(){ //Function to add carts to cartArray
		cartArray.push(new cart(cartXconst,cartYconst));
		cartArray.push(new cart(cartXconst+Math.random()*700,cartYconst));
	}

	function bgDrawer(){
		var pat1 = ctx.createPattern(bg1,"repeat");
		ctx.rect(0,0,canvasWidth,canvasHeight-baseHeight+50);
		ctx.fillStyle = pat1;
		ctx.fill();
		ctx.drawImage(base,0,canvasHeight-baseHeight+50,canvasWidth,100);
		ctx.fillStyle = "black";
		ctx.font = "bold 30px serif";
		ctx.fillText("Score: "+score,1150,594);
	}

	function characterAirCheck(){ //Function to check whether the character is in air
		if(charY < charYconst && isInAir ){  
			charY += velocity;
			velocity+=2;
			jumpControl = 1;
		}

		else{
			velocity=0;
			charY=charYconst;
			jumpControl = 0;
		}
	}

	function updateFrame(){
		srcX = x*charWidth;
		srcY = y*charHeight;
		x = ++x%cols;
		y = ++y%rows;

		if(x==0||x==1||x==2){
			charFrameWidth = 100;
		}
		else  if(x==3||x==4){
			charFrameWidth = 80;
		}
	}
	document.addEventListener('keyup',function(event){ //JUMP eventlistener
		console.log(charY);
		console.log(charYconst);
		if(event.keyCode == 32 && charY==charYconst){ //spacebar keyevent
			console.log('rigvedsukkok');
			jumpControl = 1;
			jump.play();
			velocity=-40;
			isInAir=true;
		}

		}, false);


	function draw(){
	
		bgDrawer();
		characterAirCheck();
		
		scoreControl = ++scoreControl%6;

		if(scoreControl==0){
			score++;
		}

		if(jumpControl==0){
			f = ++f%frameController;
		}
		if(f==0){  
			updateFrame();
		}
		ctx.drawImage(character,srcX,srcY,charWidth,charHeight,charX,charY-20,150,150);
		
		for(j=0;j<cartArray.length;j++){
			cartArray[j].update();
			cartArray[j].collide();
			ctx.drawImage(hayCart,cartArray[j].cartX,cartArray[j].cartY,cartWidth,cartHeight);
			cartArray[j].cartX += dx;
		}

		if(pause==true){  //To check whether the game is over

			ctx.fillStyle = "#000000";
			ctx.globalAlpha = 0.6;
			ctx.fillRect(400,180,450,250);
			ctx.globalAlpha = 1;
			ctx.fillStyle = "#FF0000";
			ctx.font = "35px Arial";
			ctx.fillText("GAME OVER",520,250);
			ctx.font = "25px Arial";
			ctx.fillStyle = "#FFFFFF";
			ctx.fillText("Score : "+score,570,300);
			ctx.fillText("Press R to restart",530,350);
			dead.play();
			
			document.addEventListener('keydown',function(event){
				if(event.keyCode == 82){ //r keyCode
					if(pause == true){
						stopAudio(gameOver);
						start();
					}	
				}
			}, false);
		
		return;
	}
		requestAnimationFrame(draw);
	}

	cartArrayInitialiser();
	draw();
}

gameStartCard();

document.addEventListener('keydown',function(event){
		if(event.keyCode == 13){ //enter keyevent
			start();
			gameTitle.innerHTML = "CASTLE RUN";	
		}
		}, false);