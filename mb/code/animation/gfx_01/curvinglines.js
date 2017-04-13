"use strict";

// initialize constants and global variables
let cvs = document.getElementById("paper");
let ctx = cvs.getContext("2d");

const CTR_X = cvs.width / 2;
const CTR_Y = cvs.height / 2;
const TWO_PI = Math.PI * 2;

let time = 0;
let ytilt = 0;
let xtilt = 0;

// set basic styles
ctx.strokeStyle = "#fff";
ctx.shadowColor = "#333";

// draws rotating shapes
let drawShape = function(strokeColor, timeOffsetX, timeOffsetY, 
                       sizeX, sizeY, timeIncrement, points) {
  ctx.fillStyle = strokeColor;
  ctx.beginPath();        
  for (let i = 1; i < points; i++) {
    let x = Math.atan(i * timeOffsetX + time) * 
            Math.sin(i * sizeX) * (xtilt++ % 100) + CTR_Y;
    let y = Math.cos(i * timeOffsetY + time) * 
            Math.sin(i * sizeY) * (ytilt++ % 100) + CTR_X;
    time += timeIncrement;
    ctx.lineTo(x, y);
    //ctx.moveTo(x, y);
    //ctx.fillRect(x, y, 1, 1);
  }
  ctx.closePath();
  ctx.stroke();
};

// callback function for the animation
(function animate() {
  
  // clear background with alpha for trails
  ctx.shadowBlur = 0;
  ctx.fillStyle = "rgba(0, 0, 0, .4)";
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  ctx.shadowBlur = 1;
  
  // draw the arc
  drawShape("#ffffff", 0.0002, 0.05, 0.08, 0.008, 0.00001, 400);

  requestAnimationFrame(animate);
})();

function rFloat(lo, hi) {
  return Math.random() * (hi - lo) + lo;
}
