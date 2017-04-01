/* ROT13 encryptor
 * https://en.wikipedia.org/wiki/ROT13
 *
 * todo: add support for uppercase 
 */

// performs rot13 on a letter
function rot13(letter) {
    
  // an array to hold the alphabet
  var alpha = ['a','b','c','d','e','f','g','h','i','j','k','l','m',
               'n','o','p','q','r','s','t','u','v','w','x','y','z'];
  
  // find the index in the alphabet of this letter
  var index = alpha.indexOf(letter);

  // if the index was valid, rotate it, else return it without rotation
  if (index >= 0) {
      
    // use the modulus operator to wrap around
    return alpha[(index + 13) % alpha.length];
  }
  else {
    return letter;
  }
}

// performs rot13 on a form input and writes the output to the document
function process() {
  var input = document.forms["myForm"].elements["rot"].value.toLowerCase();
  var output = "";
  
  // perform rot13 for each letter of the input string
  for (var i = 0; i < input.length; i++) {
      
    // append this letter to output
    output += rot13(input[i]);
  }
  
  // write the output to the document
  document.getElementById('output').innerHTML = output;
}