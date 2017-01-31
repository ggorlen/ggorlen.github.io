/* ticker: a simple text scroller */

// global interval and callback
var interval;
var update;
var speed;

// parameters: text to scroll, the size of the box 
// in characters, and the output DOM element id
function ticker(text, id, size, tickerSpeed) {  
  
  // validate input
  if (text && id && document.getElementById(id)) {
  
    // assign parameter speed to global speed
    speed = tickerSpeed;
    
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
    update = function () {

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
    
    // start the interval, calling the update 
    // function every 250 ms
    interval = setInterval(update, speed);
  }
}

// pauses the ticker
function pause() {
  if (interval) {
    clearInterval(interval);
  }
}

// resumes the paused ticker
function resume() {
  if (speed) {
    interval = setInterval(update, speed);
  }
}