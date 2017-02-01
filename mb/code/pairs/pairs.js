/* This script generates pairs given an array of items */

var arr = [ 
            "Dovran",
            "Eric R.",
            "Aaron",
            "Perry",
            "Bin",
            "Emi",
            "Faisal",
            "Mary",
            "Marshawn",
            "Nathan",
            "Ada",
            "Liana",
            "Johan",
            "Christian",
            "Eric D.", 
            "Victor", 
            "Vlad" 
           ];

// make some pairs!
var res = makePairs(arr);

// print the result
var output = "";
for (var i = 0; i < res.length; i++) {
  if (res[i][0] !== undefined && res[i][2] === undefined) {
    output += (res[i][0] + " & " + res[i][1] + "<br>");
  }
  else if (res[i][0] !== undefined) {
    output += (res[i][0] + " & " + res[i][1] + " & " + res[i][2] + "<br>");
  }
}
document.getElementById("output").innerHTML = output;

// generates pairs given an array
// outputs a trio for odd-numbered input arrays
function makePairs(arr) {
  var pairs = [];

  for (var i = 0; i < arr.length / 2; i++) {
    pairs[i] = new Array(3);
  }
  
  // iterate over input array, splicing random elements
  // to populate the output array
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