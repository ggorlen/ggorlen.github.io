/* This script generates pairs given an array of items */

let students = [ 
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
  "Vlad"
];
           
printRandomPairs(students, "output");


// prints random pairs of an array to a DOM element.  
function printRandomPairs(arr, element) {
  
  // copy the old array so randomization won't affect it.
  let tempArr = arr.slice(0);
  
  // shuffle the array
  shuffleArray(tempArr);
  
  // create a string to hold the output as HTML
  let output = "";
  
  // if the array length is odd, make a trio
  if (tempArr.length % 2 !== 0) {
    output += tempArr[tempArr.length - 1] + " & ";
  }
  
  // loop through the array, pairing every two items
  for (let i = 0; i < tempArr.length - 1; i += 2) {
    output += tempArr[i] + " & " + tempArr[i + 1] + "<br>";
  }
  
  // send the output HTML string to the document
  document.getElementById(element).innerHTML = output;
}

// shuffles an array using the fisher-yates algorithm
function shuffleArray(arr) {
  let i = arr.length;
  while (i > 0) {
    let r = Math.floor(Math.random() * i--);
    let temp = arr[r];
    arr[r] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
