function start() {
  var duration = document.forms["input"].elements["duration"].value * 60;
  
  var interval = setInterval(function() {
    
    if (duration-- <= 1) {
      clearInterval(interval);
    }
    
    document.getElementById('output').innerHTML  = (duration);
    
    }, 1000);
}