var arr = [ "Amara", "Anthony", "Caitlin", /*"Elisa", "Fadil",*/ "Faisal", "Hannah", "Jayden", 
            "Joseph", "Kyle", "Liam", "Lila", "Lynelle", "Manuel",/* "Maria", "Emilio", "Shawn",*/
            "Nushan", /*"Sam",*/ "Willie", "Christian", "Jason" ];

var res = makePairs(arr);
var output = "";

for (var i = 0; i < res.length; i++) {
  if (res[i][0] !== undefined && res[i][2] === undefined) {
    output += (res[i][0] + " & " + res[i][1] + "<br>");
  }
  else if (res[i][0] !== undefined) {
    output += (res[i][0] + " & " + res[i][1] + " & " + res[i][2] + "<br>");
  }
}

console.log(output);
document.getElementById("output").innerHTML = output;

function makePairs(arr) {
  var pairs = [];

  for (var i = 0; i < arr.length / 2; i++) {
    pairs[i] = new Array(3);
  }
  
  for (var i = 0;; i++) {
    if (arr.length >= 1) {
      pairs[i][0] = arr.splice(Math.floor(Math.random() * arr.length), 1);
      pairs[i][1] = arr.splice(Math.floor(Math.random() * arr.length), 1);
    }
    if (arr.length === 1) {
      pairs[i][2] = arr.splice(0, 1);
    }
    if (arr.length === 0) {
      break;
    }
  }

  return pairs;
}