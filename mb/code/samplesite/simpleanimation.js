// grab canvas and context from DOM
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");

// constants
const NUM_BOXES = 100;
const FPS = 30;

// variables
let boxes;
let interval;

// class to represent boxes
let Box = function(x, y, vx, vy, size, color) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.size = size;
  this.color = color;
  
  // collision detection for this box
  this.collisionDetection = function() {
  
    // right wall
    if (this.x + this.size >= canvas.width) {
      this.x = canvas.width - this.size;
      this.vx = -this.vx + rInt(-3, 3);
    }
    // left wall
    if (this.x <= 0) {
      this.x = 0;
      this.vx = -this.vx + rInt(-3, 3);
    }
    // top
    if (this.y + this.size >= canvas.height) {
      this.y = canvas.height - this.size;
      this.vy = -this.vy + rInt(-3, 3);
    }
    // bottom
    if (this.y <= 0) {
      this.y = 0;
      this.vy = -this.vy + rInt(-3, 3);
    }
  };
    
  // draw this box
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  };
  
  // update position
  this.move = function() {
    this.x += this.vx;
    this.y += this.vy;
  };
};

// function to set up the animation
function init() {
    
  // create an array to hold all of the boxes
  boxes = [];

  // populate the boxes array with box objects
  for (let i = 0; i < NUM_BOXES; i++) {
      
    // create some properties for a box
    let x = rInt(0, canvas.width);
    let y = rInt(0, canvas.height); 
    let vx = rInt(-6, 6);
    let vy = rInt(-6, 6);
    let size = rInt(1, 20);
    let color = "hsl(" + rInt(0, 255) + ", 100%, 50%)";
    
    // make a new box and add it to the boxes array
    boxes.push(new Box(x, y, vx, vy, size, color));
  }
  
  // set a timer to call our update function
  interval = setInterval(update, FPS);
}

// update function called each frame
let update = function() {

  // clear canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // update each box for this frame
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].collisionDetection();
    boxes[i].move();
    boxes[i].draw();
  }
};

// a function to return a random integer between two bounds
function rInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}



// start the game!
init();