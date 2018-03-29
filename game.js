var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 1300;
var canvasHeight = 650;
var spriteWidth = 1400;
var spriteHeight = 770;
var baseWidth = 336;
var baseHeight = 112;
var cartWidth = 100;
var cartHeight = 100;
var charX = 60;
var charY = canvasHeight-baseHeight-80;
var cartX = 400;
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



function stopAudio(audio) {    //Function to stop audio the current audio from playing
    audio.pause();
    audio.currentTime = 0;
}

var pat1 = ctx.createPattern(bg1,"repeat");
ctx.rect(0,0,canvasWidth,canvasHeight-baseHeight+50);
ctx.fillStyle = pat1;
ctx.fill();
ctx.drawImage(base,0,canvasHeight-baseHeight+50,canvasWidth,100);
ctx.drawImage(character,srcX,srcY,charWidth,charHeight,charX,charY,150,150);
ctx.drawImage(hayCart,cartX,cartY,cartWidth,cartHeight);