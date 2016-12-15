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
        
        // lighten stroke color here?
        
        // move the pen and finish the line
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // update delay times for each branch
        delayLeft = rand(200, 8000);
        delayRight = rand(200, 8000);

        // add conditionals here, e.g., (if distance % 2 === 0 ). ...
        setTimeout(drawLine, delayLeft, x, y, 
            (distance - 1) * Math.random(), angle - 1, delayLeft);
        setTimeout(drawLine, delayRight, x, y, 
            (distance - 1) * Math.random(), angle + 1, delayRight);
    }
};

function start() {
  
  for (var x = 0; x < canvas.width; x += rand(1, 5)) {
    var angleFactor = rand(-5, 5);
    var delay = rand(200, 8000);
    
    // start the animation      
    setTimeout(drawLine, delay, 
        /*-->   arguments for the drawLine function    <--*/
        x, canvas.height, rand(1, 50), 0, angleFactor, delay);
  }
}

// generate a random integer between two bounds
function rand(lo, hi) {
  return Math.floor((hi - lo) * Math.random()) + lo;
}

// generate a random float between two bounds
function randFloat(lo, hi) {
  return (hi - lo) * Math.random() + lo;
}
