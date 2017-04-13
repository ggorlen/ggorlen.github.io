/* TODO
 *
 * allow editing of step speed
 */
 
"use strict";

// save the canvas and context in variables
var canvas = document.getElementById("snakecanvas");
var ctx = canvas.getContext("2d");

// load images
var aImg = new Image();
var sImg = new Image();
aImg.src = "apple.png";
sImg.src = "snake.png";

// declare constants
var INIT_X = canvas.width / 2;
var INIT_Y = canvas.height / 2;
var CELL_SIZE = 10;

// declare variables
var interval;
var stepSpeed;
var snakeX = [];
var snakeY = [];
var appleX = 0;
var appleY = 0;
var xDirection = CELL_SIZE;
var yDirection = CELL_SIZE;
var snakeLength = 3;
var best = localStorage ? localStorage['snakescore'] : 0;
if (isNaN(best)) best = 0;

// goofy variables for effect
var cascadersX = [];
var cascadersY = [];

// keyboard handler
var kbd = function () {
  this.left = false;
  this.right = false;
  this.up = false;
  this.down = false;
  this.p = true;
};

// initialize game
function init() {

  // update best score
  best = Math.max(best, snakeLength - 3);
  if (localStorage) {
    localStorage['snakescore'] = best;
  }            

  kbd.left = kbd.up = false;
  kbd.down = kbd.right = false;
  kbd.p = true;
  stepSpeed = 75;
  snakeLength = 3;
  snakeX = new Array(snakeLength);
  snakeY = new Array(snakeLength);
  snakeX[0] = INIT_X;
  snakeY[0] = INIT_Y;
  xDirection = CELL_SIZE;
  yDirection = CELL_SIZE;
  newApple();
  drawScore();
}

function newApple() {
  var valid = false;
  
  while (!valid) {  // keep attempting to place an apple until valid
    valid = true;
    
    appleX = Math.ceil((Math.random()) * (canvas.width - 30) 
                          / CELL_SIZE) * CELL_SIZE + 10;
    appleY = Math.ceil((Math.random()) * (canvas.width - 30) 
                          / CELL_SIZE) * CELL_SIZE + 10;
    
    for (var i = 0; i < snakeLength; i++) {
      if (appleX === snakeX[i] && appleY === snakeY[i]) {
        valid = false;
        break;
      }
    }
  }
}
  
function collisionDetection() {
  
  // munch an apple
  if (snakeX[0] === appleX && snakeY[0] === appleY) {
    snakeLength++;
    newApple();
    drawScore();
  }

  // left side
  if (snakeX[0] <= 0 + CELL_SIZE) {
    start();
  }
   
  // right side
  else if (snakeX[0] >= canvas.width - CELL_SIZE) {
    start();
  }
  
  // top of canvas
  else if (snakeY[0] <= 0 + CELL_SIZE) {
    start();
  }

  // bottom of screen
  else if (snakeY[0] >= canvas.height - CELL_SIZE) {
    start();
  }
  
  // tail
  for (var i = 2; i < snakeLength; i++) {
    if (snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i]) {
      start();
    }
  }
}

function moveSnake() {

  // handle keyboard presses
  if (kbd.left) {
    xDirection = -CELL_SIZE;
    yDirection = 0;
  }
  else if (kbd.right) {
    xDirection = CELL_SIZE;
    yDirection = 0;
  }
  else if (kbd.up) {
    yDirection = -CELL_SIZE;
    xDirection = 0;
  }
  else if (kbd.down) {
    yDirection = CELL_SIZE;
    xDirection = 0;
  }
  
  // update head position
  snakeX[0] += xDirection;
  snakeY[0] += yDirection;
  
  /* Set each snake part to the coordinates
     of the part before it */
  for (var i = snakeLength; i > 0; i--) {
    snakeX[i] = snakeX[i - 1];
    snakeY[i] = snakeY[i - 1];
  }
}

function drawSnake() {
  for (var i = snakeLength; i > 0; i--) {
    ctx.drawImage(sImg, snakeX[i], snakeY[i]);
  }
}

function drawApple() {
  ctx.drawImage(aImg, appleX, appleY);
}

// Draw score
function drawScore() {
  document.getElementById("score").innerHTML = 
    "Munched : " + (snakeLength - 3) + "<br>" +
    "Most : " + (best || 0);
}

// update will be called each frame
var update = function() {

  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // check for pause
  if (!kbd.p) {
    
    // check for collisions
    collisionDetection();
    
    // update snake coordinates
    moveSnake();
    
    // draw stuff
    drawSnake();
    drawApple();
  }
  else {
    cascade();
  }
};

// add keyevent listener to track arrow key actions
document.addEventListener("keydown", function (e) {
  if ((e.keyCode === 39 || e.keyCode === 68) && !kbd.left) {
    kbd.up = kbd.down = kbd.p = false;
    kbd.right = true;
  }
  else if ((e.keyCode === 38 || e.keyCode === 87) && !kbd.down) {
    kbd.left = kbd.right = kbd.p = false;
    kbd.up = true;
  }
  else if ((e.keyCode === 37 || e.keyCode === 65) && !kbd.right) {
    kbd.up = kbd.down = kbd.p = false;
    kbd.left = true;
  }
  else if ((e.keyCode === 40 || e.keyCode === 83) && !kbd.up) {
    kbd.left = kbd.right = kbd.p = false;
    kbd.down = true;
  }
  else if (e.keyCode === 80) {
    kbd.p = true;
  }
}, false);
 
function start() {

  // clear old interval
  clearInterval(interval);
  
  // initialize game
  init();
  
  // set new interval
  interval = setInterval(update, stepSpeed);
}

// goofy visual effect
function cascade() {
  for (var i = 0; i < canvas.width; i++) {
    if (Math.random() > .9995) {
      cascadersX.push(i);
      cascadersY.push(0);
    }
  }

  for (var i = 0; i < cascadersX.length; i++) {
    ctx.fillStyle = "#ededed";
    ctx.beginPath();
    ctx.arc(cascadersX[i], cascadersY[i], 1, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
    cascadersY[i]++;
    if (Math.random() > .95) {
      cascadersY[i]++;
      cascadersX[i] += Math.random() - .2;
    }
  }
  
  for (var i = 0; i < cascadersY.length; i++) {
    if (cascadersY[i] > canvas.height) {
      cascadersX.unshift();
      cascadersY.unshift();
    }
  }
}
