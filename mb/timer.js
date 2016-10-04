var interval;

function start() {
  stop();
  var duration = document.forms["input"].elements["duration"].value * 60;
  
  if (duration > 0) {
    interval = setInterval(function() {
    
      if (duration-- <= 1) {
        clearInterval(interval);
      }
    
      document.getElementById('output').innerHTML = 
      Math.floor(duration / 60) + "m : " + Math.floor(duration % 60) + "s";
    
    }, 1000);
  }
}

function stop() {
  clearInterval(interval);
  document.getElementById('output').innerHTML = "<br>";
}