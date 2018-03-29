var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 1100;
var canvasHeight = 600;
var spriteWidth = 1400;
var spriteHeight = 770;
var rows=2;
var cols=8;
var width = spriteWidth/cols;
var height = spriteHeight/rows;
var curFrame=0;
var frameCount;
var x=0;
var y=0;
var srcX=0;
var srcY=0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var bg = new Image();
var character = new Image();
var cloud = new Image();
var hayCart = new Image();
var hayBundle = new Image();
var hayFork = new Image();

bg.src = "sprites/bg.jpg";
character.src = "sprites/character.png";
cloud.src = "sprites/cloud.png";
hayCart = "sprites/Hay_Cart.png";
hayBundle = "sprites/Heuballen.png";
hayFork = "sprites/Ferskt_hay.png";


var dead = new Audio("audio/dead.wav");
var gameOver = new Audio("audio/gameOver.mp3");
var jump = new Audio("audio/jump.wav");


function stopAudio(audio) {    //Function to stop audio the current audio from playing
    audio.pause();
    audio.currentTime = 0;
}


ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);
ctx.drawImage(hayCart);