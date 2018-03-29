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
/*
var bg = new Image();
bg.src = "bg.jpg";
var character = new Image();
character.src = "spritesheetvolt_run.png";
var cloud = new Image();
cloud.src = "cloud.png";
var pipeGreen = new Image();
pipeGreen.src = "pipe-green.png";
var pipeRed = new Image();
pipeRed.src = "pipe-red.png";*/
var test = new Image();
test.src = "character.png";/*

var gameOver = new Audio("gameOver.mp3");
var jump = new Audio("jump.wav");

function stopAudio(audio) {    //Function to stop audio the current audio from playing
    audio.pause();
    audio.currentTime = 0;
}

ctx.drawImage(test,srcX,srcY,width,height,x,y,width,height);
//ctx.drawImage(bg,0,0,canvasWidth,canvasHeight);

alert("hello...testing to check errors");

function updateFrame(){

test.onload = function() {
 ctx.drawImage(test,100,100);
}*/

function draw(){
	ctx.drawImage(test,srcX,srcY,width,height,x,y,width,height);	
}

setInterval(draw,100);

}
