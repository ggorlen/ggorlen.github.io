function hollowSquare(size) {
  var s = "*&nbsp;".repeat(size) + "<br>";

  if (size > 1) {
    for (var row = 2; row < size; row++) {
      for (var col = 0; col < size; col++) {
        if (col === 0 || col === size - 1) {
          s += "*&nbsp;";
        }
        else {
          s += "&nbsp;&nbsp;";
        }
      }
      s += "<br>";
    }
    
    s += "*&nbsp;".repeat(size) + "<br>";
  }
  
  return s;
}
