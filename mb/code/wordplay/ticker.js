/* ticker: a simple text scroller
 * constructo parameters: text to scroll, the size of t
 * he box in characters, and the output DOM element id
 */
var Ticker = function(text, id, size, speed) {  

  // abort constructor for invalid arguments
  if (!text || !id || !document.getElementById(id)) {
    throw new Error("Invalid argument(s)");
  }

  // insterval instance variable
  this.interval;
  
  // provide default values for size and speed
  if (!speed || speed < 1) {
    speed = 250;
  }
  if (!size || size < 1) {
    size = 10;
  }

  // variables to describe the text and  
  // beginning and end points to display
  var start = 0;
  var end = size % text.length;
   
  // this function will be called to
  // update the screen each frame
  this.update = function() {

    // conditional to help format wraparound
    if (end < start) {
      document.getElementById(id).innerHTML =
        text.substring(start, text.length) +
        text.substring(end - size, end);
    }
    else {
      document.getElementById(id).innerHTML =
        text.substring(start, end);
    }
    
    // update the start and end points.  
    // % is the modulus (remainder) operator
    // which allows the text to wrap.
    start = ++start % text.length;
    end = ++end % text.length;
  };

  // pauses the ticker
  this.pause = function() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  };

  // starts the ticker
  this.start = function() {
    this.interval = setInterval(this.update, speed);
  };
};