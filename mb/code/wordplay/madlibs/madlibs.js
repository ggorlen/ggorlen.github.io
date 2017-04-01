/** 
 * Mad libs!
 */

"use strict";

 
// the source text as a string array.  
// use "__" to denote a blank field for the user to fill in,
// with a description of the field within that string element.
var text = ["When I was ", "__verb ending in -ing__", " to the ", "__place__", ", I ", 
            "__verb ending in -ed__", " into a great, ", "__adjective__", " ", "__object__", ".  ",
            "All around me, I noticed a variety of ", "__color__", " ", "__plural noun__", ".  ",
            "I guess that's just what I get for being so ", "__adjective__", " all of the time.  "];

            
// gets mad lib input from the user.  the parameter is the text of the mad lib.
function getInput(text) {

  // create an HTML form to send to the document
  var inputFormString = "<form id=\"madlibform\"><table id=\"madlibtable\">";
  
  for (var i = 0; i < text.length; i++) {
    if (text[i].includes("__")) {
      inputFormString += "<tr><td>" + 
        text[i].replace(new RegExp("_", "g"), "") + ": </td>"
        + "<td><input type=\"text\"></input><br></td></tr>";
    }
  }
  
  // add a "submit" button
  inputFormString += "</table><br><input onclick=\"processForm();" +
    "return false;\" type=\"Submit\" \>";
  
  // write the mad lib input form to the document
  document.getElementById("input").innerHTML = inputFormString;
}


// create a mad lib from user input
function createMadLib(text, words) {
  
  // create a string of HTML to send to the document
  var output = "";
  
  // check each word in the source text; if it's a blank space,
  // grab the user's provided word from the words array
  for (var i = 0, j = 0; i < text.length; i++) {
    if (text[i].includes("__")) {
      output += words[j++];
    }
    else {
      output += text[i];
    }
  }
  
  // write the mad lib to the document
  document.getElementById("output").innerHTML = output;
}


// processes the user's submitted text
function processForm() {
  
  // grab the form data
  var userInput = document.forms["madlibform"].elements;
  var userInputArray = [];        
  
  // process the form data
  for (var i = 0; i < userInput.length - 1; i++) {
    
    // validate input and abort if any field is empty
    if (userInput[i].value === "") {
      document.getElementById("output").innerHTML = 
        "Error: Some fields aren't filled in!";
      return;
    }
    else { // this field was provided
      userInputArray.push(userInput[i].value);
    }
  }

  // create the mad lib and output the result to the document
  createMadLib(text, userInputArray);
}


// grab user input on load
getInput(text);