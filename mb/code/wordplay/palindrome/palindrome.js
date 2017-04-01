/* Palindrome checker
 * https://en.wikipedia.org/wiki/Palindrome
 */

 
// processes the form on the page
function process() {
  
  // grab the string to be checked from the input form
  var candidate = 
    document.forms["input"].elements["palindrome"].value;
  
  // create a string to hold the user notification
  var output = candidate;
  
  // check if candidate is a palindrome 
  // and notify the user accordingly
  if (isPalindrome(candidate)) {
    output += " is a palindrome.";
  }
  else {
    output += " is not a palindrome.";
  }
  
  // write the output to the document
  document.getElementById("output").innerHTML = output;
}

// checks to see if a string is a palindrome
function isPalindrome(str) {

  // ignore case
  str = str.toLowerCase();
  
  // iterate through the string from the back
  // and front, working towards the middle
  for (var i = 0; i < str.length - i - 1; i++) {
    
    // compare characters at two indexes
    if (str[i] !== str[str.length - i - 1]) {
        
      // we found two characters that are 
      // unequal; this is not a palindrome
      return false;  
    }
  }
    
  // we checked the entire string--it's a palindrome!
  return true;
}