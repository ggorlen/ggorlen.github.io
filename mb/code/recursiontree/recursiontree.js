/* Basic tree/forest generator using recursion and setTimeout()
 */

// create canvas object and context
var canvas = document.getElementById("treecanvas");
var ctx = canvas.getContext("2d");

var drawLine = function(x, y, distance, angle, angleFactor, frameRate) {
    
    if (distance > 0) {
    
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        x += angle;
        y -= distance;
        
        ctx.lineTo(x, y);
        ctx.stroke();
        
        frameRateLeft = frameRate + Math.floor(Math.random() * 100000);
        frameRateRight = frameRate + Math.floor(Math.random() * 100000);

        // (if distance % 2 === 0 ). ...
        setTimeout(drawLine, frameRateLeft, x, y, (distance - 1) * Math.random(), angle - 1, frameRate);
        setTimeout(drawLine, frameRateRight, x, y, (distance - 1) * Math.random(), angle + 1, frameRate);
    }
};

function start() {
  for (var x = 0; x < canvas.width; x += Math.floor(Math.random() * 5)) {
    var angleFactor = Math.random() * 10 - 5;
    var frameRate = Math.random() * 800;
    
    // start the animation
    setTimeout(drawLine, framerate, x, canvas.height, Math.random() * 50, 0, angleFactor, frameRate);
  }
}

start();