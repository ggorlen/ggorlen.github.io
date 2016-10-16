/*
 * Plain old rock, paper scissors!
 * 
 * Todo:
 *  - add clickable images
 *  - add lizard/spock
 *  - separate doTurn() into smaller functions
 */

// An array to store the different game options as strings
var items = ["rock", "paper", "scissors"];

// Number variables to hold the number of games won by the human or computer
var computerWins = 0;
var humanWins = 0;

// Create a string variable to hold our output to print for the user to see
var output = "";

// This function processes a turn and writes the result of the turn to the page
function doTurn() {

    // Grab the human choice (a string) from the text box input on the page
    var humanChoice = document.forms["myForm"].elements["input"].value;
    
    // Make the humanChoice string lowercase to account for any capitalization
    // the user may have entered
    humanChoice = humanChoice.toLowerCase();

    // The computer chooses a random item using some calls to JS's Math class
    // Math.random selects a random decimal between 0 and 1
    // Math.floor rounds a decimal down to the nearest integer
    var computerChoice = items[Math.floor(Math.random() * items.length)];

    // Let's test all of the possible outcomes!
    
    // First, we'll validate that the user entered something reasonable
    if (humanChoice !== "paper" && humanChoice !== "rock" 
        && humanChoice !== "scissors") {
        output = "Invalid input!  Try again.<p></p>";
    }
    
    // Both choices are equivalent, so we have a draw!
    else if (humanChoice === computerChoice) {
        output = "Draw!<p></p>";
    }
    
    // Test for human wins
    else if (humanChoice === "rock" && computerChoice === "scissors"
          || humanChoice === "scissors" && computerChoice === "paper"
          || humanChoice === "paper" && computerChoice === "rock") {

        output = humanChoice + " beats " + computerChoice + "!<p></p>";
        
        // Increment the counter for human wins by 1
        humanWins++; 
    }
    
    // If we made it this far in the conditional, we KNOW the computer won
    // by process of elimination and don't need to do any tests
    else { 
        output = computerChoice + " beats " + humanChoice + "!<p></p>";

        // Increment the counter for computer wins by 1
        computerWins++; 
    }
    
    // Whatever the outcome was, let's add the score to our output
    output += "human: " + humanWins + " computer: " + computerWins + "<p></p>";
    
    // Let's check to see if the game ended on this turn
    // If so, reset all the variables so a new game begins next turn
    if (computerWins >= 10) {
        output += "The computer wins!<p></p>";
        computerWins = 0;
        humanWins = 0;
    }
    else if (humanWins >= 10) {
        output += "You win!<p></p>";
        computerWins = 0;
        humanWins = 0;
    }

    // Write the output to the "output" id element in our HTML document
    document.getElementById("output").innerHTML = "<p></p>" + output;
}