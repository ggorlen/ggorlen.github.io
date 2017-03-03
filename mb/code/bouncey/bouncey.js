"use strict";

// declare constants
const GRAVITY = .5;
const DRAG = 0.98;
const BOUNCE = .7;
const NUM_BALLS = 20;

// create variables
let canvas = document.getElementById("bounceycanvas");
let ctx = canvas.getContext("2d");
let framerate;
let interval;
let ballBox;

// represents a ball
let Ball = function(x, y, vx, vy, size, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.color = color;
  
  // move the ball to a new position
  this.move = function() {
    this.vx *= DRAG;
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
    
    // check for collisions
    if (this.x + this.size >= canvas.width) {
      this.x = canvas.width - this.size;
      this.vx *= -1;
    }
    if (this.x - this.size <= 0) {
      this.x = 0 + this.size;
      this.vx *= -1;
    }
    if (this.y + this.size >= canvas.height) {
      this.y = canvas.height - this.size;
      this.vy *= -BOUNCE;
    }
    if (this.y - this.size <= 0) {
      this.y = 0 + this.size ;
      this.vy *= -1;
    }
  };
  
  // draw the ball
  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  };
};

// update animation state on each frame
let update = function() {
  ctx.fillStyle = "rgba(255,255,255,0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < ballBox.length; i++) {
    ballBox[i].move();
    ballBox[i].draw();
  }
};

// initializes the animation
let init = function() {
  framerate = 30;
  ballBox = [];
  for (let i = 0; i < NUM_BALLS; i++) { 
    ballBox.push(makeBall());
  }
  interval = setInterval(update, framerate);
};

let makeBall = function() {
  let x = rInt(0, canvas.width);
  let y = rInt(0, canvas.height);
  let vx = rInt(4, 12);
  let vy = rInt(15, 20);
  let size = rInt(2, 10);
  let color = "hsl(" + rInt(0, 255) + ", 50%, 50%)";
  return new Ball(x, y, vx, vy, size, color);
};

// generates a random integer between two bounds
function rInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}



init();