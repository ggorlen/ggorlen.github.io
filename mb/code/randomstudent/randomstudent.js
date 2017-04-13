/**
 * This script selects a random student in the class 
 */


// An array to hold all student names (strings)
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
  "Christian",
  "Eric D.", 
  "Vlad"
];
   
// Choose a random index between 0 and the array length
let randomIndex = Math.floor(Math.random() * students.length);

// Write the student string located at the random index to the document
document.getElementById("output").innerHTML = students[randomIndex];
