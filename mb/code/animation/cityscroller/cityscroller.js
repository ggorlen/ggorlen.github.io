/* City Scroller 
 *
 * Todos:
 * - make speed adjustable with user input
 * - handle distance more realistically
 * - add building windows/images/more interesting landscapes/cars
 */

"use strict";


// Grab canvas and its context from the DOM
let canvas = document.getElementById("paper");
let ctx = canvas.getContext("2d");

// Constants
let MIN_BLDGS = 20;
let MAX_BLDGS = 100;
let MIN_BLDG_SPEED = 2;
let MAX_BLDG_SPEED = 6;
let MIN_BLDG_HEIGHT = 40;
let MAX_BLDG_HEIGHT = canvas.height - 20;
let MIN_BLDG_WIDTH = 40;
let MAX_BLDG_WIDTH = MIN_BLDG_WIDTH * 2;

// Array to hold the buildings
let bldgs = [];


/** 
 * Building class
 */
let Building = function (x, y, height, width, speed, color) {
  this.x = x;
  this.y = y;
  this.height = height;
  this.width = width;
  this.speed = speed;
  this.color = color;
  
  // Updates the position of this building
  this.move = function () {
  
    // Check if building crossed left side of screen
    if (this.x + this.width < 0) {
      
      // Find the index of this building
      let index = bldgs.indexOf(this);
      
      // Check that the building was found
      if (index > -1) {
        
        // Remove this object from bldgs array
        bldgs.splice(index, 1);
        
        // Add a new building to the bldgs array
        bldgs.push(makeBuilding());
      }
    }

    // Update building position
    else this.x += this.speed;  
  }; // end move
  
  // Draws the Building to the screen
  this.draw = function() {
    
    // Draw a filled rectangle
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
    // Draw an outline around the rectangle
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  } // end draw
}; // end Building


// Generates a new Building
function makeBuilding() {
  let height = rand(MIN_BLDG_HEIGHT, MAX_BLDG_HEIGHT); 
  let width = rand(MIN_BLDG_WIDTH, MAX_BLDG_WIDTH); 
  let color = "hsl(" + rand(0, 255) + "," + 
                       rand(10, 90) + "%," + 
                       rand(10, 90) + "%)";
  let speed = Math.random() * (MAX_BLDG_SPEED - MIN_BLDG_SPEED) + MIN_BLDG_SPEED;
  return new Building(canvas.width, canvas.height - height,
                      height, width, -speed, color);
} // end makeBuilding


// Generates a random integer between two bounds
function rand(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
} // end rand


// Redraws the screen each frame
function update() {

  // Clears screen of previous frames
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move and redraw all buildings
  /* Use this reverse loop instead to create a "rotation" 
   * sensation where buildings in the back move faster
   * than those in the front:
   * for (let i = bldgs.length - 1; i >= 0 ; i--) */
  for (let i = 0; i < bldgs.length ; i++) {
    bldgs[i].move();
    bldgs[i].draw();
  }
  
  // Set animation to call update function
  requestAnimationFrame(update); 
} // end update


// Initializes a new landscape
function start() {
  
  // Populate the bldgs array
  for (let i = 0; i < rand(MIN_BLDGS, MAX_BLDGS); i++) {
    bldgs.push(makeBuilding());
  }
  
  // Begin animation
  requestAnimationFrame(update); 
} // end start
