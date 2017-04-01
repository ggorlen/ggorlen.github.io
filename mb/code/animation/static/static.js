/* Simple static animation */

var Static = function(canvasId, gap, pixelSize, speed) {
  
  var canvas = document.getElementById(canvasId);
  var ctx = canvas.getContext("2d");
  this.interval;
    
  this.start = function() { 
    this.interval = setInterval(function() {
      for (var y = 0; y < canvas.height; y += gap) {
        for (var x = 0; x < canvas.width; x += gap) {
          ctx.fillStyle = Math.random() >= .5 ? 
                          "#FFFFFF" : "#000000";
          ctx.fillRect(x, y, pixelSize, pixelSize);  
        }
      }
    }, speed);
  }; 
  
  this.stop = function() {
    if (this.interval) {
      clearInterval(this.interval);
    } 
  };
};
