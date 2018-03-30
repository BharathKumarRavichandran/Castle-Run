var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 1300;
var canvasHeight = 610;
var spriteWidth = 1400;
var spriteHeight = 770;
var baseWidth = 336;
var baseHeight = 112;
var cartWidth = 100;
var cartHeight = 100;
var charX = 50;
var charY = canvasHeight-baseHeight-80;
var charYconst = canvasHeight-baseHeight-80;
var cartX = canvasWidth+50;
var cartY = charY+45;
var rows=2;
var cols=5;
var charWidth = spriteWidth/cols;
var charHeight = spriteHeight/rows;
var curFrame=0;
var frameCount;
var x=0;
var y=0;
var srcX=0;
var srcY=0;
var score = 0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var base = new Image();
var bg = new Image();
var bg1 = new Image();
var bg2 = new Image();
var character = new Image();
var cloud = new Image();
var hayCart = new Image();

base.src = "sprites/base.png";
bg.src = "sprites/bg.jpg";
bg1.src= "sprites/sand_brick.png";
bg2.src = "sprites/dark_bricks.png";
character.src = "sprites/character.png";
cloud.src = "sprites/cloud.png";
hayCart.src = "sprites/Hay_Cart.png";


var dead = new Audio("audio/dead.wav");
var gameOver = new Audio("audio/gameOver.mp3");
var jump = new Audio("audio/jump.wav");

function start(){

	var dx = -3;
	var gravity = 4;
	var pause = false;
	var score = 0;

	function stopAudio(audio) {    //Function to stop audio the current audio from playing
	    audio.pause();
	    audio.currentTime = 0;
	}

	score = 0;

	function draw(){
		
		var pat1 = ctx.createPattern(bg1,"repeat");
		ctx.rect(0,0,canvasWidth,canvasHeight-baseHeight+50);
		ctx.fillStyle = pat1;
		ctx.fill();
		ctx.drawImage(base,0,canvasHeight-baseHeight+50,canvasWidth,100);
		ctx.drawImage(character,srcX,srcY,charWidth,charHeight,charX,charY,150,150);
		ctx.drawImage(hayCart,cartX,cartY,cartWidth,cartHeight);

		cartX += dx;

		if(charY <= charYconst){
			charY += gravity;
		}

		document.addEventListener('keydown',function(event){
		if(event.keyCode == 32){ //spacebar keyevent
			jump.play();
			charY -= 2;
		}

		}, false);

		if(pause==true){

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
					stopAudio(gameOver);
					start();
				}
			}, false);
		
		return;
	}

		requestAnimationFrame(draw);
	}

	draw();
}

start();