/* Example of implementing levels in a game using ASCII arrays
 * 
 * ***not the best code here, just sketching an idea.***
 */

"use strict";

// object to represent the game
let Game = function(levels) {
  this.levels = levels;
  this.level = levels[0];
  this.currentLevel = 0;
  this.playerX = this.level.x;
  this.playerY = this.level.y;
    
  // move player
  this.move = function(dir) {
    if (dir === "up") {
      if (this.level.grid[this.playerY-1][this.playerX] !== "#") {
        this.playerY--;
      }
    }
    else if (dir === "down") {
      if (this.level.grid[this.playerY+1][this.playerX] !== "#") {
        this.playerY++;
      }
    }
    else if (dir === "left") {
      if (this.level.grid[this.playerY][this.playerX-1] !== "#") {
        this.playerX--;
      }
    }
    else if (dir === "right") {
      if (this.level.grid[this.playerY][this.playerX+1] !== "#") {
        this.playerX++;
      }
    }
    
    // check if the level has been exited
    if (this.level.grid[this.playerY][this.playerX] === ".") {
      // go to next level
      this.currentLevel = ++this.currentLevel % this.levels.length;
      this.level = this.levels[this.currentLevel];
      this.playerX = this.level.x;
      this.playerY = this.level.y;
    }
  }; // end move
  
  // renders the current state to HTML
  this.toHTML = function() {
    let output = "<table>";
    for (let i = 0; i < this.level.grid.length; i++) {
      output += "<tr>";
      for (let j = 0; j < this.level.grid[i].length; j++) {
          
        // handle styling here -- the below isn't very elegant
        // you'd probably want to draw canvas here and use images,
        // add animation between grid positions, etc, but
        // the point is that the ASCII is just behind the scenes
        if (i === this.playerY && j === this.playerX) {
          output += "<td style='background-color:#ff0000;'>&nbsp;</td>";
        }
        else if (this.level.grid[i][j] === "#") {
          output += "<td style='background-color:#000;'>&nbsp;</td>";
        }
        else if (this.level.grid[i][j] === ".") {
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


// represents a level in a game... this class is 
// clunky here, but you get the idea.  
let Level = function(grid, x, y) {
  this.grid = grid;
  this.x = x;
  this.y = y;
};

// create a list of levels
// note that the level doesn't have to be ascii,
// it could be represented with a grid of points
// or a set of values to generate terrain or 
// objects randomly or non-randomly.
let levels = [
               new Level(
                 ["#########",
                  "###   #.#",
                  "#   #   #",
                  "#########"], 
                  1, 2 // player origin x, y
               ),
               new Level(
                 ["#########",
                  "#    ## #",
                  "# # ##  #",
                  "# # #  ##",
                  "# # ##  #",
                  "# #  ## #",
                  "#.##    #",
                  "#########"], 
                  7, 1
               ),
               new Level(
                 ["#########",
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
                  1, 10
               )
             ];

// main function
window.onload = function() {
  // create the game             
  let game = new Game(levels);
  document.getElementById("output").innerHTML = game.toHTML();
  
  // add a key listener
  document.onkeydown = function(e) {
    let dir;
    switch (e.keyCode) {
        case 37: dir = "left"; break;
        case 38: dir = "up"; break;
        case 39: dir = "right"; break;
        case 40: dir = "down"; break;
    }
    if (dir) {
        game.move(dir);
        document.getElementById("output").innerHTML = game.toHTML();
    }
  };
};