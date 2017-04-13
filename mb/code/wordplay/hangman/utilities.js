/** 
 * Utility functions -- requires jQuery
 */
 
"use strict";

  
// Puts a string of HTML content into a DOM element
function toDOM(element, content) {
  document.getElementById(element).innerHTML = content;
} // end toDOM


// Returns a random element from the parameter array
function sample(arr) {
  let randIndex = Math.floor(Math.random() * possibleWords.length);
  return arr[randIndex];
} // end sample


// Reads a text file from disk
function readFile(file, handler) {
  $.ajax({
    url: file,
    type: 'get',
    dataType: 'text',
    success: (data) => handler(data)
  });
} // end readFile
