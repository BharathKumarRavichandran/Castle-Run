var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canvasWidth = 1100;
var canvasHeight = 600;
var spriteWidth = 1400;
var spriteHeight = 770;
var rows;
var cols;
var curFrame=0;
var frameCount;
var x=0;
var y=0;
var srcX=0;
var srcY=0;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var bg = new Image();
bg.src = "bg.jpg";
var character = new Image();
character.src = "spritesheetvolt_run.png";
var cloud = new Image();
cloud.src = "cloud.png";
var pipeGreen = new Image();
pipeGreen.src = "pipe-green.png";
var pipeRed = new Image();
pipeRed.src = "pipe-red.png";

var gameOver = new Audio("gameOver.mp3");
var jump = new Audio("jump.wav");

ctx.drawImage(bg,x,y/*,canvasWidth,canvasHeight*/ );

alert("hello");

function updateFrame(){

}
