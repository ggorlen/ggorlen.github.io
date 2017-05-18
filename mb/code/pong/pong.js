/** 
 * Pong
 *
 * - Add option to wait for key input on initial serve?
 * - Add max number of wins -- 11 
 *
 * Table tennis service rules : https://sports.stackexchange.com/questions/5675/who-serves-when-in-ping-pong
 */
 
"use strict";


// Declare game constants
const BALL_SIZE = 5;
const BALL_SPEED = 11;
const PADDLE_H = 80;
const PADDLE_W = 10;
const PADDLE_SPEED = 7;
const MAX_ANGLE = 3.5 * Math.PI / 12;

// Declare global variables
let ball;
let paddles;
let scores;

// Grab canvas and context from the DOM
let canvas = document.getElementById("paper");
let ctx = canvas.getContext("2d");
ctx.font = "14px Courier";

// Keyboard handler
let kbd = {
  'u': false, 
  'd': false,
  'w': false, 
  's': false,
};


/**
 * Represents a Pong paddle
 */
let Paddle = function (x, y) {
  this.height = PADDLE_H;
  this.width = PADDLE_W;
  this.x = x;
  this.y = y;
  this.vy = 0;
  
  /**
   * Updates the position of the paddle
   */
  this.move = function (dir) {
    switch (dir) {
      case "u": this.vy = -PADDLE_SPEED; break;
      case "d": this.vy = PADDLE_SPEED;  break;
      default : this.vy = 0;
    }

    // Update paddle position
    this.y += this.vy;

    // Prevent the paddle from exiting the game area
    if (this.y < 0) {
      this.y = 0;
    }
    else if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
    }
  }; // end move
  
  /**
   * Draws the paddle on a canvas context
   */
  this.draw = function (ctx) {
    ctx.fillStyle = "#000";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }; // end draw
}; // end Paddle


/**
 * Represents a Pong ball
 */
let Ball = function (x, y, vx, vy){
  this.size = BALL_SIZE;
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;

  /**
   * Updates the position of the ball
   */
  this.move = function (paddles) {

    // Check for a collision with a paddle
    paddles.forEach((p) => {
      if (this.x + this.size >= p.x &&
          this.x - this.size <= p.x + p.width &&
          this.y + this.size >= p.y &&
          this.y - this.size <= p.y + p.height) {
        let relativeIntersectY = p.height / 2 + p.y - ball.y;
        let normalizedRelIntY = relativeIntersectY / (p.height / 2);
        let bounceAngle = normalizedRelIntY * MAX_ANGLE;
        this.vx = BALL_SPEED * Math.cos(bounceAngle) * (this.x > canvas.width / 2 ? -1 : 1);
        this.vy = BALL_SPEED * -Math.sin(bounceAngle);
      }
    });
    
    // Handle collisions with edges
    if (this.x - this.size < 0) {
      scores[1]++;
      newServe(BALL_SPEED);
    }
    else if (this.x + this.size > canvas.width) {
      scores[0]++;
      newServe(-BALL_SPEED);
    }
    if (this.y - this.size < 0 || 
        this.y + this.size > canvas.height) {
      this.vy *= -1;
    }
    
    // Update the ball x and y coordinates
    this.x += this.vx;
    this.y += this.vy;
  }; // end move

  /**
   * Draws this ball on a canvas context
   */
  this.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
  }; // end draw
}; // end Ball


// Resets the ball and paddles to the center of the game area
function newServe(initSpeedX) {
  paddles = [];
  ball = new Ball(canvas.width / 2, canvas.height / 2, 
                 (initSpeedX ? initSpeedX : 
                 (rInt() ? BALL_SPEED : -BALL_SPEED)), 0);
  paddles.push(new Paddle(0, canvas.height / 2 - (PADDLE_H / 2)));
  paddles.push(new Paddle(canvas.width - PADDLE_W, 
                          canvas.height / 2 - (PADDLE_H / 2)));
} // end newServe


// Initializes a new game
function init() {
  scores = [0, 0];

  // Add event listeners to handle key events
  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 38: kbd.u = true; break;
      case 40: kbd.d = true; break;
      case 83: kbd.s = true; break;
      case 87: kbd.w = true; break;
    }
  });
  document.addEventListener("keyup", (e) => {
    switch (e.keyCode) {
      case 38: kbd.u = false; break;
      case 40: kbd.d = false; break;
      case 83: kbd.s = false; break;
      case 87: kbd.w = false; break;
    }
  });

  newServe();
  update();
}; // end init


// Main game loop
function update() {  

  // Move the paddles and ball for this frame
  paddles[0].move(kbd.w ? "u" : kbd.s ? "d" : ""); 
  paddles[1].move(kbd.u ? "u" : kbd.d ? "d" : ""); 
  ball.move(paddles);
 
  // Clear canvas
  ctx.clearRect(0, 0, PADDLE_W + 1, canvas.height);
  ctx.clearRect(canvas.width - PADDLE_W -1, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Redraw screen 
  ctx.fillStyle = "#000";
  ctx.fillText(scores[0], canvas.width / 2 - 35, 15);
  ctx.fillText(scores[1], canvas.width / 2 + 25, 15);

  ctx.strokeStyle = "#000";
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  ball.draw(ctx);
  paddles.forEach((p) => p.draw(ctx));
  
  requestAnimationFrame(update);  
}; // end update


// Returns a random integer between two bounds, [lo, hi)
function rInt(lo, hi) {
  if (!hi) {
    hi = lo;
    lo = 0;
  }
  else if (!lo) {
    hi = 2;
    lo = 0;
  }
  return Math.random() * (hi - lo) + lo | 0;
} // end rInt
