/* sokoban
 * 
 * todo:
 * - add number of box pushes
 * - add localstorage of position and best stats
 * - add timer
 *
 * http://sokobano.de
 * http://www.sokoban-online.de/help/sokoban/level-format.html
 * http://www.sourcecode.se/sokoban/
 * http://www.cs.cornell.edu/andru/xsokoban.html
 */

"use strict";


// class to represent a sokoban game with multiple levels
let Sokoban = function(levels, start) {
  this.levels = levels;
  this.levelNum = start < levels.length && start >= 0 ? start : 0;
  this.level;
  this.history;
  this.px;
  this.py;

  // initializes a level
  this.init = function(level) {
    this.history = [];  
    this.level = [];
    let successful = false;
    for (let i = 0; i < level.length; i++) {
      this.level.push([]);
      for (let j = 0; j < level[i].length; j++) {
        this.level[i].push(level[i][j]);
        if (level[i][j] === "@" || 
            level[i][j] === "+") {
          this.px = j;
          this.py = i;
          successful = true;
        }
      }
    }
    this.writeHistory();
    return successful;
  }; // end init
 
  // appends current game state to history 
  this.writeHistory = function() {
    
    // make a deep copy the level
    let levelCopy = this.level.map(function(a) {
      return a.slice();
    });
    
    // save it as an object
    this.history.push({ 
      level: levelCopy,
      px: this.px,
      py: this.py 
    });
  };
  
//  // write current game state to local storage
//  this.toLocalStorage() {
//    localStorage[this + " " + 
//                this.width + " " + this.numMines];
//  };
//  
//  // retrieve content from local storage
//  this.getLocalStorage() {
//    var bestScore = localStorage[this.height + " " + 
//                this.width + " " + this.numMines];
//  };
  
  // call init in the constructor
  if (!this.init(this.levels[this.levelNum])) {
    console.log("level parsing error");
  }
  
  // switch levels if valid
  this.switchLevel = function(level) {
    if (level >= 0 && level < this.levels.length) {
      this.levelNum = level;
      this.init(this.levels[level]);
      return true;
    }
    return false;
  };
  
  // permanently revert to the last state in history
  this.undo = function() {
    
    // abort if not enough history exists
    if (this.history.length <= 1) return false;
    
    // discard current state
    this.history.pop();
    
    // grab the new top of the history stack
    let state = this.history[this.history.length-1];
    this.level = JSON.parse(JSON.stringify(state.level)); // deep copy
    this.px = state.px;
    this.py = state.py;
    return true;
  }; // end undo
  
  // permanently revert to the initial state in history
  this.reset = function() {
    this.init(this.levels[this.levelNum]);
  }; // end reset
  
  // move player
  this.move = function(dir) {

    // validate input 
    dir = dir.toLowerCase();
    if (dir !== "u" && dir !== "d" && 
        dir !== "l" && dir !== "r") {
      return false; // abort move
    }
        
    // move player in specified direction if possible
    switch (dir) {
      case "u": if (!this.moveHandler(0, -1)) return false; break;
      case "d": if (!this.moveHandler(0, 1))  return false; break;
      case "l": if (!this.moveHandler(-1, 0)) return false; break;
      case "r": if (!this.moveHandler(1, 0))  return false; break;
    }

    // append this board position to the history
    this.writeHistory();
    
    // load next level if finished
    if (this.isFinished()) {
      this.levelNum = ++this.levelNum % this.levels.length;
      this.init(this.levels[this.levelNum]);
    }
    
    // this was a successful move
    return true;
  }; // end move
  
  // helper function for handling movement
  this.moveHandler = function(dx, dy) {

    // check if player is trying to push a box
    if (this.level[this.py+dy][this.px+dx] === "$" ||
        this.level[this.py+dy][this.px+dx] === "*") {
      
      // determine if the box is vacating a goal space or not
      let oldBoxSpace = this.level[this.py+dy][this.px+dx] === "*" ? "." : " ";
      
      // validate new box space and determine if it's a goal space or not
      let newBoxSpace = this.level[this.py+dy+dy][this.px+dx+dx];
      if (newBoxSpace === "." || newBoxSpace === " ") {
        newBoxSpace = newBoxSpace === "." ? "*" : "$";
      
        // move box onto empty space
        if (newBoxSpace === "*" || newBoxSpace === "$") {
          this.level[this.py+dy+dy][this.px+dx+dx] = newBoxSpace;
          this.level[this.py+dy][this.px+dx] = oldBoxSpace;
        }
      }
      else { // box is immovable
        return false;
      }
    }    

    // determine if player is vacating a goal space or not
    let oldSpace = this.level[this.py][this.px] === "+" ? "." : " ";
    let newSpace = this.level[this.py+dy][this.px+dx] === "." ? "+" : "@";

    // move player to an empty space
    if (this.level[this.py+dy][this.px+dx] === " " ||
        this.level[this.py+dy][this.px+dx] === ".") {
      this.level[this.py][this.px] = oldSpace;
      this.px += dx;
      this.py += dy;
      this.level[this.py][this.px] = newSpace;
    }
    else { // abort otherwise
      return false;
    }
    
    // this was a successful move
    return true;
  }; // end moveHandler
  
  // check if the current level has been completed
  this.isFinished = function() {
    for (let i = 0; i < this.level.length; i++) {
      for (let j = 0; j < this.level[i].length; j++) {
        if (this.level[i][j] === "$") {
          return false;
        }
      }
    }
    return true;
  }; // end isFinished
  
  // renders the current position to HTML
  this.toHTML = function() {
    let output = "<table>";
    for (let i = 0; i < this.level.length; i++) {
      output += "<tr>";
      for (let j = 0; j < this.level[i].length; j++) {
        output += "<td class='";
        switch (this.level[i][j]) {
          case " ": output += "sokospace";  break;
          case "#": output += "sokowall";   break;
          case ".": output += "sokogoal";   break;
          case "$": output += "sokobox";    break;
          case "*": output += "sokogoalb";  break;
          case "@": output += "sokoplayer"; break;
          case "+": output += "sokogoalp";  break;
          default : console.log("toHTML char error");
        }
        output += "'></td>";
      }
      output += "</tr>";
    }
    return output + "</table>";
  }; // end toHTML
}; // end Sokoban