/* Basic tree/forest generator using recursion and setTimeout()
 */

// create canvas object and context
var canvas = document.getElementById("treecanvas");
var ctx = canvas.getContext("2d");

var drawLine = function(x, y, distance, angle, delay) {
    
    // end the tree drawing when distance is a negative number
    if (distance >= 0) {
    
        // start drawing
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        // update the x and y coordinates
        x += angle;
        y -= distance;
        
        // move the pen and finish the line
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // update delay times for each branch
        delayLeft = rand(200, 8000);
        delayRight = rand(200, 8000);

        // add conditionals here, e.g., (if distance % 2 === 0 ). ...
        setTimeout(drawLine, delayLeft, x, y, (distance - 1) * Math.random(), angle - 1, delayLeft);
        setTimeout(drawLine, delayRight, x, y, (distance - 1) * Math.random(), angle + 1, delayRight);
    }
};

function start() {
  var spread = rand(3, 10);
  
  for (var x = 0; x < canvas.width; x += rand(1, 5)) {
    var angleFactor = Math.random() * 10 - 5;
    var delay = rand(200, 8000);
    
    // start the animation          /*-->         arguments for the drawLine function         <--*/
    setTimeout(drawLine, delay, x, canvas.height, Math.random() * 50, 0, angleFactor, delay);
  }
}

// generate a random integer between two bounds
function rand(lo, hi) {
  return Math.floor((hi - lo) * Math.random()) + lo;
}

start();
