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
  return arr[Math.random() * arr.length | 0];
} // end sample


// Reads a text file from disk
function readFile(file, handler) {
  $.ajax({
    url: file,
    type: 'get',
    dataType: 'text',
    success: function (data) { handler(data); }
  });
} // end readFile
