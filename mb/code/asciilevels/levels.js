/**
 * Example of implementing levels in a game using ASCII arrays
 */

"use strict";


/**
 * An object to represent the game, which takes 
 * a list of level objects in its constructor
 */
let Game = function(levels) {
  this.levels = levels;
  this.currentLevel = 0;
  this.level = levels[this.currentLevel].grid;
  this.playerX = levels[this.currentLevel].playerX;
  this.playerY = levels[this.currentLevel].playerY;

  
  /** 
   * This function handles moving the player position based on keyboard input
   */
  this.move = function(dir) {
    if (dir === "up") {
      if (this.level[this.playerY-1][this.playerX] !== "#") {
        this.playerY--;
      }
    }
    else if (dir === "down") {
      if (this.level[this.playerY+1][this.playerX] !== "#") {
        this.playerY++;
      }
    }
    else if (dir === "left") {
      if (this.level[this.playerY][this.playerX-1] !== "#") {
        this.playerX--;
      }
    }
    else if (dir === "right") {
      if (this.level[this.playerY][this.playerX+1] !== "#") {
        this.playerX++;
      }
    }
    
    // Check if the level has been exited
    if (this.level[this.playerY][this.playerX] === ".") {
        
      // Level was just exited; go to next level
      this.currentLevel = ++this.currentLevel % this.levels.length;
      this.level = levels[this.currentLevel].grid;
      this.playerX = levels[this.currentLevel].playerX;
      this.playerY = levels[this.currentLevel].playerY;
    }
  }; // end move
  
  /** 
   * Renders the current game state to HTML
   */
  this.toHTML = function() {
    let output = "<table>";
    for (let i = 0; i < this.level.length; i++) {
      output += "<tr>";
      for (let j = 0; j < this.level[i].length; j++) {
          
        /* Handle game style here -- the below is just simple HTML/CSS
         * you'd probably want to draw canvas here and use images,
         * or avoid using a grid and ASCII, etc, but the 
         * point is that the ASCII used to represent levels 
         * is behind the scenes and doesn't have to be shown to the user.
         */
        if (i === this.playerY && j === this.playerX) {
          output += "<td style='background-color:#ff0000;'>&nbsp;</td>";
        }
        else if (this.level[i][j] === "#") {
          output += "<td style='background-color:#000;'>&nbsp;</td>";
        }
        else if (this.level[i][j] === ".") {
          output += "<td style='background-color:#0f0;'>&nbsp;</td>";
        }
        else {
          output += "<td style='background-color:#fff;'>&nbsp;</td>";
        }
      }
      output += "</tr>";
    }
    return output + "</table>";
  }; // end toHTML
};


/* Create a list of levels--each level is an object
 * which stores the properties for that level.
 * note that the level doesn't have to be ascii,
 * it could be represented with a grid of points
 * or a set of values to generate terrain or objects.
 */
let levels = [

  // Level 0
  {
    grid: ["#########",
           "###   #.#",
           "#   #   #",
           "#########"], 
    playerX: 1, 
    playerY: 2
  },
  
  // Level 1
  {
    grid: ["#########",
           "#    ## #",
           "# # ##  #",
           "# # #  ##",
           "# # ##  #",
           "# #  ## #",
           "#.##    #",
           "#########"], 
    playerX: 7, 
    playerY: 1
  },
  
  // Level 2
  {
    grid: ["#########",
           "#   ###.#",
           "# #  #  #",
           "#  # # ##",
           "## # #  #",
           "#  # ## #",
           "# ## #  #",
           "#  # # ##",
           "## # #  #",
           "#  #  # #",
           "# ###   #",
           "#########"],
    playerX: 1, 
    playerY: 10
  }
]; // end levels


// Main function which will execute when the DOM loads
window.onload = function () {
    
  // Create the game             
  let game = new Game(levels);
  document.getElementById("output").innerHTML = game.toHTML();
  
  // Add a key listener
  document.onkeydown = function (e) {
    let dir;
    switch (e.keyCode) {
      case 37: dir = "left";  break;
      case 38: dir = "up";    break;
      case 39: dir = "right"; break;
      case 40: dir = "down";  break;
    }
    if (dir) {
      game.move(dir);
      document.getElementById("output").innerHTML = game.toHTML();
    }
  }; // end document.onkeydown
}; // end window.onload
