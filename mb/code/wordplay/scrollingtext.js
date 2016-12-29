/* A simple text scroller */


// constant for the number of characters to display at a given time
var TEXT_BOX_SIZE = 4;

// variables to describe the text and beginning and end points to display
var text = "Welcome to Mission Bit @ Gateway HS! ";
var start = 0;
var end = TEXT_BOX_SIZE % text.length;

// this function will be called t o update the screen each frame
function update() {

  // conditional to help format wraparound
  if (end < start) {
    document.getElementById("scrollingtextbox").innerHTML = 
      text.substring(start, text.length) + text.substring(end - TEXT_BOX_SIZE, end);
  }
  else {
    document.getElementById("scrollingtextbox").innerHTML = text.substring(start, end);
  }
  
  // update the start and end points.  
  // % is the modulus (remainder) operator which allows the text to wrap.
  start = ++start % text.length;
  end = ++end % text.length;
}

// start the interval, calling the update function every 250 ms
var interval = setInterval(update, 250);