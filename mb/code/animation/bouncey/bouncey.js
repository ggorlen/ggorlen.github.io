/**
 * Bouncey, a demo of basic graphics physics
 */

"use strict";


// Declare constants
const GRAVITY = .3;
const DRAG = 0.98;
const BOUNCE = .8;
const NUM_BALLS = 22;
const REPULSION = 0.2;
const PULL_STRENGTH = 0.03;

// Create variables
let canvas = document.getElementById("bounceycanvas");
let ctx = canvas.getContext("2d");
let ballBox;


/**
 * Represents a ball
 */
let Ball = function(x, y, vx, vy, size, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.color = color;
  
  /**
   * Moves the ball to a new x, y coordinate position.
   * Accepts a parameter array of balls to collide with.
   */
  this.move = function(balls) {

    // Check for collisions with walls
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

    // Check for collision with other balls
    balls.forEach((b) => {
      if (this !== b) collide(this, b);
    });

    this.vx *= DRAG;
    this.vy += GRAVITY;
    this.x += this.vx;
    this.y += this.vy;
  }; // end move
  
  /**
   * Draws the ball on a canvas context
   */
  this.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }; // end draw
}; // end Ball


// Collides two balls
function collide(a, b) {

  // Find the distance between the balls
  let dx = b.x - a.x;
  let dy = b.y - a.y;
  let distance = Math.sqrt(dx * dx + dy * dy);

  // Check for a collision
  if (distance < a.size + b.size) {

    // Find the unit vectors 
    let ux = dx / distance;
    let uy = dy / distance;

    // Multiply the collided balls' velocities by 
    // the unit vector and repulsion factor
    a.vx -= ux * REPULSION;
    a.vy -= uy * REPULSION;
    b.vx += ux * REPULSION;
    b.vy += uy * REPULSION;
  }
} // end collide


// Updates animation state on each frame
function update() {
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ballBox.forEach((b) => {
    b.move(ballBox);
    b.draw(ctx);
  });
  requestAnimationFrame(update);
} // end update


// Initializes and starts the animation
function init() {

  // Add mouse event listener
  let elem = document.getElementById("bounceycanvas")
  elem.addEventListener("mousedown", (e) => {
    ballBox.forEach((b) => {

      // Find the distance between the ball and the mouse 
      let dx = e.x - b.x;
      let dy = e.y - b.y;
      
      b.vx += dx * PULL_STRENGTH;
      b.vy += dy * PULL_STRENGTH;
    });
  }); // end addEventListener

  ballBox = [];
  for (let i = 0; i < NUM_BALLS; i++) { 
    ballBox.push(makeBall());
  }

  update();
} // end init


// Generates a new ball with random properties
function makeBall() {
  let x = rInt(canvas.width);
  let y = rInt(canvas.height);
  let vx = rInt(4, 7);
  let vy = rInt(2, 8);
  let size = rInt(4, 13);
  let color = "hsl(" + rInt(255) + ", 50%, 50%)";
  return new Ball(x, y, vx, vy, size, color);
} // end makeBall


// Generates a random integer between two bounds
function rInt(lo, hi) {
  if (!hi) {
    hi = lo;
    lo = 0;
  }
  else if (!lo) {
    lo = 0;
    hi = 2;
  }
  return Math.floor(Math.random() * (hi - lo) + lo);
} // end rInt
