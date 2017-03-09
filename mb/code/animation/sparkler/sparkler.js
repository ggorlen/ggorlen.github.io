/* 
 * Simple sparkler animation
 *
 * based on : https://www.youtube.com/watch?v=YCI8uqePkrc
 */

// declare constants
const GRAVITY = 0.9;
const DRAG = 0.9;
const BOUNCE = .8;
const NUM_PARTICLES = 50;

// declare variables  
let canvas;
let ctx;
let interval;
let particles;
let speed;

// represents a particle entity
let Particle = function(x, y, vx, vy, life,
                        color, size) {
  this.x = x;
  this.y = y;
  this.vx = vx;
  this.vy = vy;
  this.life = life;
  this.color = color;
  this.size = size;
};

// move this particle
Particle.prototype.move = function() {
  this.x += this.vx;
  this.y += this.vy;
  this.vx *= DRAG;
  this.vy += GRAVITY;
  
  // occasionally randomize movement
  if (Math.random() < .1) {
    this.vx = rInt(-10, 10);
    this.vy = rInt(-10, 10);
  }
  
  // collision detection with ground
  if (this.y >= canvas.height || this.y <= 0) {
    this.vy *= -BOUNCE;
  }
  if (this.x >= canvas.width || this.x <= 0) {
    this.vx *= -1;
  }
  this.life--;
};

// draw this particle
Particle.prototype.draw = function() {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
};

// initializes a new animation state
function init() {
    
  // grab canvas element from the DOM and get context
  canvas = document.getElementById("sparklercanvas");
  ctx = canvas.getContext("2d");
  
  // create an array to hold the particles
  particles = [];
  numParticles = 0;
  
  // speed setting... user choosable?  varispeed?
  speed = 40;
  
  // start the animation
  interval = setInterval(update, speed);
}

// updates the animation state each frame
let update = function() {
    
  // clear screen
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
    
  // delete dead particles
  for (let i = 0; i < particles.length; i++) {
    if (particles[i].life < 1) {
      particles.splice(i--, 1);
    }
  }
  
  if (particles.length < NUM_PARTICLES) {
    numParticles++;
  }
  
  // re-populate particles
  while (particles.length < numParticles) {
    particles.push(makeParticle());
  }
  
  // move and draw particles
  ctx.globalCompositeOperation = "lighter";
  for (let i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].draw();
  }
};

// generates a new particle
function makeParticle() {
    
  // generate properties for the particle
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let vx = rInt(-10, 10);
  let vy = rInt(-10, 0);
  let life = rInt(5, 40);
  let color = "hsl(" + rInt(0, 255) + ", 50%, 50%)";
  let size = rInt(0, 5);
  return new Particle(x, y, vx, vy,
      life, color, size);
}

// returns a random integer between two bounds
function rInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}