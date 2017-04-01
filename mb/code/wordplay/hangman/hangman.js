/** 
 * A simple hangman game
 * 
 * 
 * This game illustrates functions, arrays, 
 * strings, loops, and conditionals.
 *
 * This version could be simplified in many ways:
 *   - use an internal array to represent possible words
 *   - remove numGuesses
 *   - remove random word selection
 *
 * Ways to improve the game:
 *   - add images for the hangman and improve interface
 *   - create a loss scenario if the user 
 *     doesn't guess the word fast enough
 *   - ??
 *
 */
 
"use strict";
 
 
// An array of possible words for hangman, to be loaded from a text file
let possibleWords;

// Variables to hold the target word and the hidden word
let word,
    hidden;

// Counts the number of guesses the user has made so far
let numGuesses;


// Sets up a new game of hangman
function initialize() {
  
  // Initialize global variables
  hidden = [];
  numGuesses = 0;
  
  // Find a random word from the possible words, 
  // make it lowercase and trim off whitespace
  word = sample(possibleWords).toLowerCase().trim();

  // Load the hidden array with dots up to the length of the word
  for (let i = 0; i < word.length; i++) {
    hidden.push(".");
  }
  
  // Show the hidden word
  toDOM("hangmanoutput", hidden.join(""));
} // end initialize


// Handles user's guess
function guess(letter) {

  // Clear the victory message
  toDOM("victorymessage", "");
  
  // Validate guess
  if (letter && isNaN(guess)) {
    
    // Check every letter in the word against the guess
    for (let i = 0; i < word.length; i++) {
    
      // If we find a match for this character in the word,
      // put it in the hidden word at that index
      if (word.charAt(i) === letter) {
        hidden[i] = letter;
      }
    }
    
    // Increment the total number of guesses
    numGuesses++;
    
    // Write the hidden word to the output, joining the array into a string
    toDOM("hangmanoutput", hidden.join(""));
    
    // Check if the word was successfully guessed
    if (hidden.join("") === word) {
      toDOM("victorymessage", "You guessed " + 
        word + " in " + numGuesses + " guesses!");
        
      // Start a new round
      initialize();
    }
  }
} // end guess