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
var cartX;
var cartY;
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

function gameStartCard(){
	var pat1 = ctx.createPattern(bg1,"repeat");
	ctx.rect(0,0,canvasWidth,canvasHeight-baseHeight+50);
	ctx.fillStyle = pat1;
	ctx.fill();
	ctx.fillStyle = "#000000";
	ctx.globalAlpha = 0.6;
	ctx.fillRect(400,180,450,250);
	ctx.globalAlpha = 1;
	ctx.fillStyle = "red";
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
	ctx.fillText("Tap ENTER to start the game!",480,400);	
}

function start(){

	var cartXconst = canvasWidth+Math.random()*700 ;
	var cartYconst = charY+45;
	var dx = -7;
	var flag = 1;
	var gravity = 6;
	var pause = false;
	var score = 0;

	var cartArray = new Array();

	function stopAudio(audio) {    //Function to stop audio the current audio from playing
	    audio.pause();
	    audio.currentTime = 0;
	}

	function cart(cartX,cartY){
		this.cartX = cartX;
		this.cartY = cartY;

		this.update = function(){
			if(this.cartX <= -cartWidth){
				this.cartX = canvasWidth + Math.random()*700 ;
			}
		}

		this.collide = function(){

		}
	}

	function cartArrayInitialiser(){
		cartArray.push(new cart(cartXconst,cartYconst));
		cartArray.push(new cart(cartXconst+Math.random()*700,cartYconst));
	}

	function draw(){
		
		var pat1 = ctx.createPattern(bg1,"repeat");
		ctx.rect(0,0,canvasWidth,canvasHeight-baseHeight+50);
		ctx.fillStyle = pat1;
		ctx.fill();
		ctx.drawImage(base,0,canvasHeight-baseHeight+50,canvasWidth,100);
		ctx.drawImage(character,srcX,srcY,charWidth,charHeight,charX,charY,150,150);
		
		for(j=0;j<cartArray.length;j++){
			cartArray[j].update();
			ctx.drawImage(hayCart,cartArray[j].cartX,cartArray[j].cartY,cartWidth,cartHeight);
			cartArray[j].cartX += dx;
		}


		if(charY <= charYconst){
			charY += gravity;
		}

		document.addEventListener('keydown',function(event){
		if(event.keyCode == 32){ //spacebar keyevent
			flag=1;
			if(flag==1){
				jump.play();
				charY -= 2;
				flag=0;
			}
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

	cartArrayInitialiser();
	draw();
}

gameStartCard();

document.addEventListener('keydown',function(event){
		if(event.keyCode == 13){ //enter keyevent
			start();	
		}
		}, false);