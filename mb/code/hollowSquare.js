var size = 10;
var s = "* ".repeat(size) + "\n";

for (var row = 2; row < size; row++) {
  for (var col = 0; col < size; col++) {
    if (col === 0 || col === size - 1) {
      s += "* ";
    }
    else {
      s += "  ";
    }
  }
  s += "\n";
}

s += "* ".repeat(size) + "\n";

console.log(s);