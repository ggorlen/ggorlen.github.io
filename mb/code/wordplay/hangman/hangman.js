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
let word;
let hidden;

// Counts the number of guesses the user has made so 
// far and an array to store missed guesses
let numGuesses;
let missed;

// Limit the maximum number of guesses before the player loses
const MAX_GUESSES = 6;


// Sets up a new game of hangman
function initialize() {
  
  // Initialize global variables
  hidden = [];
  missed = [];
  numGuesses = 0;
  
  // Find a random word from the possible words, 
  // make it lowercase and trim off whitespace
  word = "";
  while (!word.length) {
    word = sample(possibleWords).toLowerCase().trim();
  }

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
    
    // Create a variable to determine if the player's guess was correct
    let correct = false;

    // Check every letter in the word against the guess
    for (let i = 0; i < word.length; i++) {
    
      // If we find a match for this character in the word,
      // put it in the hidden word at that index
      if (word.charAt(i) === letter) {
        correct = true;
        hidden[i] = letter;
      }
    }

    // If the player's guess was incorrect, add it to the missed letters array
    if (!correct) {
        missed.push(letter);
    }
    
    // Increment the total number of guesses
    numGuesses++;
    
    // Write the hidden word to the output, joining the array into a string
    toDOM("hangmanoutput", hidden.join(""));

    // Do the same for the missed guesses array
    toDOM("missedoutput", missed.join(" "));
    
    // Check if the word was successfully guessed
    if (hidden.join("") === word) {
      toDOM("victorymessage", "You guessed " + 
        word + " in " + numGuesses + " guesses!");
        
      // Start a new round
      initialize();
    }
    else if (missed.length >= MAX_GUESSES) {
      toDOM("victorymessage", "You're out of guesses!  " + 
        "The word was " + word + ".");
        
      // Start a new round
      initialize();
    }
  }
} // end guess
