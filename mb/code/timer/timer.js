/* TODO: add pause? http://stackoverflow.com/questions/21277900/javascript-pausing-setinterval */


// Create a variable to hold our interval object
var interval;


// This function starts the timer
function start() {
  
  // Stop any current timer that may be active
  stop();
  
  // Grab the user's form input containing the duration
  var duration = 
    document.forms["input"].elements["duration"].value * 60;
  
  /* Validate input and create a new interval object.
   * The setInterval function takes a function as an
   * argument.  This anonymous callback function will be 
   * called at intervals specified as the second parameter
   * which is the time, in milliseconds, between calls. 
   */
  if (duration > 0) {
    interval = setInterval(function() {
    
      // decrement the duration
      duration--;

      // check to see if the clock has run out
      if (duration <= 0) {
          
        // the clock ran out -- clear the current interval
        clearInterval(interval);
      }
    
      // Calculate and send the remaining
      // time in minutes and seconds to the document
      document.getElementById('output').innerHTML = 
                Math.floor(duration / 60) + "m : " + 
                Math.floor(duration % 60) + "s";
    
    }, 1000); // 1000 milliseconds = one second
  }
}


// This function stops a timer if active and clears the output div
function stop() {
  clearInterval(interval);
  document.getElementById('output').innerHTML = "<br>";
}