/* sokoban
 * 
 * todo:
 * - add number of pushes
 * - improve gfx
 * - fix history bug
 *
 * http://sokobano.de
 * http://www.sokoban-online.de/help/sokoban/level-format.html
 * http://www.sourcecode.se/sokoban/
 * http://www.cs.cornell.edu/andru/xsokoban.html
 */

"use strict";

let soko;


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
    this.history.push({ 
      level: JSON.parse(JSON.stringify(this.level)),
      px: this.px, 
      py: this.py 
    });
  };
  
  // call init in the constructor
  if (!this.init(this.levels[this.levelNum])) {
    console.log("level parsing error");
  }
  
  // switch levels if valid
  this.switchLevel = function(level) {
    if (level >= 0 && level < this.levels.length) {
      this.init(this.levels[level]);
      return true;
    }
    return false;
  };
  
  // permanently revert to the last state in history
  this.undo = function() {
    if (this.history.length > 1) {
      // get rid of current state
      this.history.pop();
      
      // grab previous current state
      let state = this.history[this.history.length-1];
      this.level = state.level;
      this.px = state.px;
      this.py = state.py;
      return true;
    }
    return false;
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
      case "u": if (!this.moveHandler(0, -1)) return; break;
      case "d": if (!this.moveHandler(0, 1))  return; break;
      case "l": if (!this.moveHandler(-1, 0)) return; break;
      case "r": if (!this.moveHandler(1, 0))  return; break;
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
          case " ": output += "sokospace'>&nbsp;"; break;
          case "#": output += "sokowall'>&nbsp;";       break;
          case ".": output += "sokogoal'>&nbsp;";       break;
          case "$": output += "sokobox'>&nbsp;";        break;
          case "*": output += "sokogoalb'>&nbsp;";      break;
          case "@": output += "sokoplayer'>&nbsp;";     break;
          case "+": output += "sokogoalp'>&nbsp;";      break;
          default : console.log("toHTML char error");
        }
        output += "</td>";
      }
      output += "</tr>";
    }
    return output + "</table>";
  }; // end toHTML
}; // end Sokoban


// main function
window.onload = function() {
    
  // create the game             
  soko = new Sokoban(LEVELS, 0);
  let keyAllowed = true;
  showSoko();
  
  // add key listeners
  document.onkeyup = function(e) {
    keyAllowed = true;
  };
  
  document.onkeydown = function(e) {
    let key;
    switch (e.keyCode) {
      case 37: key = "l"; break;
      case 38: key = "u"; break;
      case 39: key = "r"; break;
      case 40: key = "d"; break;
      case 82: key = "R"; break;
      case 90: key = "z"; break;
    }
    if (key && keyAllowed) {
      switch (key) {
        case "R": soko.reset(); break;
        case "z": soko.undo();  break;
        default : soko.move(key);
      }
      showSoko();
      keyAllowed = false;
    }
  };
  
  // show sokoban html output
  function showSoko() {
    document.getElementById("soko").innerHTML = soko.toHTML();
    document.getElementById("sokoscore").innerHTML = 
      "level: " + (soko.levelNum+1) + "<br>" +
      "moves: " + (soko.history.length-1);
  }
};