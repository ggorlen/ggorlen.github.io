// grab canvas and context from DOM
let canvas = document.getElementById("mycanvas");
let ctx = canvas.getContext("2d");

// variables to represent the position
let x = 50;
let y = 50;
let vx = 5;
let vy = 5;
let size = 100;

// update function called each frame
let update = function() {
  collisionDetection();
  
  // clear canvas
  ctx.clearRect(0,0,canvas.width,canvas.height);
  
  // draw a rectangle
  ctx.fillStyle = "#000000";
  ctx.fillRect(x, y, size, size);
  
  // update position
  x += vx;
  y += vy;
};

let collisionDetection = function() {
  // right wall
  if (x + size >= canvas.width) {
    x = canvas.width - size;
    vx = -vx + rInt(-3, 3);
  }
  // left wall
  if (x <= 0) {
    x = 0;
    vx = -vx + rInt(-3, 3);
  }
  // top
  if (y + size >= canvas.height) {
    y = canvas.height - size;
    vy = -vy + rInt(-3, 3);
  }
  // bottom
  if (y <= 0) {
    y = 0;
    vy = -vy + rInt(-3, 3);
  }
};

// set a timer to call our update function
let interval = setInterval(update, 30);

// a function to return a random integer between two bounds
function rInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}