/** 
 * A simple number guessing game to demonstrate user input,
 * conditionals, random number generation, and loops.
 *
 * Suggested improvements:
 * - add an outer loop to prompt the user to play again after winning.
 * - let the user specify the range of the random number generator.
 * - convert alert()/prompt() pop ups to elements on the page using.
 * - store user's previous guesses in an array and let them know
 *     if they've already guessed a number.
 */

 
// declare a constant holding the maximum value that may be guessed.
const MAX = 10;

// get a random number by calling Math.random(), which returns a
// random decimal between 0 and 1.  multiply it by the max,
// round down to the nearest integer, and add 1.
var randNum = Math.floor(Math.random() * MAX) + 1;

// create a boolean (true or false) variable that allows 
// us to exit the next loop when it becomes true.
var gameOver = false;

// move into a loop--the code inside the { } braces will keep 
// executing as long as gameOver is false.
// the "!" operator makes the following line say: 
// "while not gameOver, do the stuff in the { } block"
while (!gameOver) {

  // create a prompt pop-up to ask the user for input.
  // save their input in the variable called input.
  var input = prompt("guess a number between 1 and " + MAX);
  
  // check to see if the user's input was the same as the number.
  // if these two numbers are equal, then the user has successfully
  // guessed the random number.
  // note that we're using "==" to convert the string input variable
  // to a number for the comparison--it would be better to make
  // an explicit conversion for future programs.
  if (input == randNum) {
  
    // show a pop up alerting the user that they guessed correctly.
    alert("You guessed " + randNum + "!");
    
    // set gameOver to true so that we can exit the loop.
    gameOver = true;
  }
  else {
  
    // checking for null allows user to exit the game early
    if (!input) {

      // set gameOver to true so that we can exit the loop.          
      gameOver = true;
    }
    else {

      // User's guess was incorrect--let them know!
      alert(input + " was not the number.  Try again!");
    }
  }
} // end while loop
