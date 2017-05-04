/**
 * This script demonstrates JS canvas with a simple ball animation
 */

"use strict";


// Save the canvas and context in variables
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");

// Declare constants
let BALL_INIT_X = canvas.width / 2;
let BALL_INIT_Y = canvas.height / 2;
let BALL_INIT_VX = 3;
let BALL_INIT_VY = 3;
let BALL_SIZE = 15;


/**
 * Class to represent a Ball
 */
let Ball = function (x, y, vx, vy, size, color) {
  this.x = x;
  this.y = y;  
  this.vx = vx; // velocity x
  this.vy = vy;
  this.size = size;
  this.color = color;

  // Updates the ball's position
  this.move = function () {
    this.x += this.vx;
    this.y += this.vy;
    this.bounceOffWalls();
  }; // end move

  // Causes the ball to bounce off walls with a little randomness
  this.bounceOffWalls = function () {

    // Left side
    if (this.x <= 0 + this.size) {
      this.x = this.size;
      this.vx = (Math.floor(Math.random() * 12) - 4);
    }
    
    // Top of canvas
    if (this.y <= 0 + this.size) {
      this.y = this.size;
      this.vy = (Math.floor(Math.random() * 12) - 4);
    }
    
    // Right side
    if (this.x >= canvas.width - this.size) {
      this.x = canvas.width - this.size;
      this.vx = -(Math.floor(Math.random() * 12) - 4);
    }
    
    // Bottom of screen
    if (this.y >= canvas.height - this.size) {
      this.y = canvas.height - this.size;
      this.vy = -(Math.floor(Math.random() * 12) - 4);
    }
  }; // end bounceOffWalls

  // Renders the ball to the canvas
  this.draw = function () {
    ctx.beginPath();

    // Make a circle        
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  
    // Set a color for our ball and draw it with a solid fill
    ctx.fillStyle = this.color; 
    ctx.fill();
  }; // end move
}; // end Ball class


// Called each frame to update and draw the gamestate
let update = function () {

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Move the ball
  ball.move();
  
  // Draw the ball
  ball.draw();

  // Continue calling the animation function
  requestAnimationFrame(update);
}; // end update


// Create a ball object
let ball = new Ball(BALL_INIT_X, BALL_INIT_Y, BALL_INIT_VX, 
                    BALL_INIT_VY, BALL_SIZE, "#cc0000");

// Start animating!
requestAnimationFrame(update);
