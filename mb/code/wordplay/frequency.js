/* Word frequency analyzer    
 */
 
 
// analyzes the frequency of a set of words
function freqAnalyze(words) {
  
  // create an array from the string 
  // parameter, delimited by empty spaces
  words = words.split(" ");
  
  // create a key-value histogram to store 
  // the frequency count of each word
  var hist = {};
  
  // for each word in the input...
  for (var i = 0; i < words.length; i++) {
  
    // check to see if this word is in the histogram already
    if (words[i] in hist) {
    
      // it was, so increment the count for that word by one
      hist[words[i]]++; 
    }
    else {
      // this is the first time we've seen 
      // this word; set its frequency to 1
      hist[words[i]] = 1;
    }
  }
  return hist;   // return our histogram from the function
}

// processes a form for inputting data to the frequency analyzer
function process() {

  // grab the string to be checked from the input form
  var input = document.forms["input"].elements["frequencyin"].value;

  // we can change this string literal to 
  // input variable to get input from a user
  var result = freqAnalyze(input);

  // enhanced for loop to build an HTML array
  // of the result from the dictionary object
  var arr = [];
  for (var key in result) {
    arr.push(result[key] + " " + key + "<br>");
  }
  
  // sort the array in reverse
  arr.sort(function(a, b) {
    return parseInt(b) - parseInt(a);
  });
  
  // clear any old output
  document.getElementById("output").innerHTML = "";

  // output the result to user
  for (var i = 0; i < arr.length; i++) { 
    document.getElementById("output").innerHTML += arr[i];
  }
}