/** 
 * sokoban
 *
 * todo:
 * - add levelset menu selection
 * - add timer
 * - add redo
 * - add "go to next unfinished puzzle" key
 * - detect edges of puzzles for flexible rendering aesthetics
 *
 * resources:
 * http://sokobano.de
 * http://www.sokoban-online.de/
 * https://www.sokobanonline.com/
 * http://www.sourcecode.se/sokoban/
 * http://www.cs.cornell.edu/andru/xsokoban.html
 * http://sokoban-gild.com/
 * https://www.letslogic.com/
 * http://sneezingtiger.com/sokoban/levels.html
 * http://www.newthinktank.com/2015/09/object-oriented-javascript/
 *
 * improving localStorage support: 
 * http://crocodillon.com/blog/always-catch-localstorage-security-and-quota-exceeded-errors
 */

"use strict";


// class to represent a sokoban game with multiple levels
let Sokoban = function(levels, start) {
  this.levels = levels || [["######", "#@$ .#","######"]];
  this.levelNum = start && start < levels.length && start >= 0 ? start : 0;
  this.level;
  this.history;
  this.pushes;
  this.px;
  this.py;
  this.sequence;
  this.bestScore;
  this.storeData;
  
  // call init in the constructor
  if (!this.init(this.levels[this.levelNum])) {
    console.log("level parsing error"); // todo: throw error instead
  }
}; // end Sokoban
  
// initializes a level
Sokoban.prototype.init = function(level, storeData) {
  this.history = [];  
  this.level = [];
  this.pushes = 0;
  this.sequence = "";
  this.storeData = storeData === undefined ? true : storeData;
  
  // only successful if player symbol found in level
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
  
  // retrieve previous best score if any
  if (localStorage && this.storeData) {
    let bestScore = localStorage[JSON.stringify(this.levels[this.levelNum])];
    this.bestScore = parseInt(bestScore) || undefined;
  }
  
  // write the first position to history
  this.writeHistory();
  
  return successful;
}; // end init
 
// appends current game state to history 
Sokoban.prototype.writeHistory = function() {

  // save it as an object
  this.history.push({ 
    level: JSON.stringify(this.level),
    pushes: this.pushes,
    px: this.px,
    py: this.py,
    sequence: this.sequence
  });
}; // end writeHistory

// permanently revert to the last state in history
Sokoban.prototype.undo = function() {
  
  // abort if not enough history exists
  if (this.history.length <= 1) return false;
  
  // discard current state
  this.history.pop();
  
  // grab the new top of the history stack
  let state = this.history[this.history.length-1];
  this.level = JSON.parse(state.level);
  this.pushes = state.pushes;
  this.px = state.px;
  this.py = state.py;
  this.sequence = state.sequence;
  return true;
}; // end undo

// permanently revert to the initial state in history
Sokoban.prototype.reset = function() {
  this.init(this.levels[this.levelNum]);
}; // end reset
    
// stores current position in localStorage 
// or a var if storage unavailable
Sokoban.prototype.savePosition = function() {
  let saveObj = {
    "levelNum": this.levelNum,
    "level": this.level,
    "history": this.history,
    "pushes": this.pushes,
    "px": this.px,
    "py": this.py,
    "sequence": this.sequence,
    "storeData": JSON.stringify(this.storeData)
  };
  if (localStorage) {
    localStorage["sokobansave"] = JSON.stringify(saveObj);
  }
  else { // no localStorage, use an instance var
    this.savedPosition = JSON.stringify(saveObj);
  }
}; // end savePosition
  
// retrieves saved position, overwriting current position
Sokoban.prototype.loadSavedPosition = function() {
  let saveObj;
  if (localStorage) {
    saveObj = JSON.parse(localStorage["sokobansave"]);
  }
  else if (this.savedPosition) {
    saveObj = JSON.parse(this.savedPosition);
  }
  if (saveObj) {
    this.levelNum = saveObj.levelNum;
    this.level = saveObj.level;
    this.history = saveObj.history;
    this.pushes = saveObj.pushes;
    this.px = saveObj.px;
    this.py = saveObj.py;
    this.sequence = saveObj.sequence;
    this.storeData = JSON.parse(saveObj.storeData);
    return true;
  }
  return false;
}; // end loadSavedPosition
  
// allows move input by string.  format example: "udrrudlr"
Sokoban.prototype.inputMoveSequence = function(sequence) {
  for (let i = 0; i < sequence.length; i++) {
    if (!this.move(sequence[i])) return false;
  }
  return true;
}; // end inputSequence
  
// allows level input by string
Sokoban.prototype.inputRawLevel = function(level) {

  // parse level and check validity
  let counter = {
    "@": 0,
    "$": 0,
    ".": 0,
    " ": 0,
    "#": 0,
    "*": 0
  };
  
  level = level.split("\n");
  let parsedLevel = [];
  for (let i = 0; i < level.length; i++) {
    parsedLevel.push(level[i]);
    for (let j = 0; j < parsedLevel[i].length; j++) {
      if (parsedLevel[i][j] === "+") {
        counter["@"]++;
        counter["."]++;
      }
      else if (counter.hasOwnProperty([parsedLevel[i][j]])) {
        counter[parsedLevel[i][j]]++;
      }
      else { // abort if character is unrecognized
        return false; 
      }
    }
  }
  
  if (counter["@"] === 1 && counter["$"] &&
      counter["$"] === counter["."]) {
    return this.init(level, false);
  }    
  return false;
}; // end inputRawLevel
  
// switch levels if valid
Sokoban.prototype.switchLevel = function(level) {
  if (level >= 0 && level < this.levels.length) {
    this.levelNum = level;
    this.init(this.levels[level]);
    return true;
  }
  return false;
}; // end switchLevel
  
// move player
Sokoban.prototype.move = function(dir, loadNext) {
  dir = dir.toLowerCase();
  
  // validate input 
  if (["u", "d", "l", "r"].indexOf(dir) < 0) {
    return false; // abort move
  }
      
  // move player in specified direction if possible or abort
  switch (dir) {
    case "u": if (!this.moveHandler(0, -1)) return false; break;
    case "d": if (!this.moveHandler(0, 1))  return false; break;
    case "l": if (!this.moveHandler(-1, 0)) return false; break;
    case "r": if (!this.moveHandler(1, 0))  return false; break;
  }

  // write move to sequence string and append this board position to the history
  this.sequence += dir;
  this.writeHistory();
  
  // load next level if finished
  if (this.isFinished() && loadNext !== false) {
      
    // update localStorage if this is a new best score
    if (localStorage && this.storeData && (isNaN(this.bestScore) || 
        this.history.length < this.bestScore)) {
      localStorage[JSON.stringify(this.levels[this.levelNum])] = this.history.length-1;
    }

    // proceed to the next level
    this.levelNum = ++this.levelNum % this.levels.length;
    this.init(this.levels[this.levelNum]);
  }
  
  // this was a successful move
  return true;
}; // end move
  
// helper function for handling movement
Sokoban.prototype.moveHandler = function(dx, dy) {

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
        
        // increment number of pushes
        this.pushes++;
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
  else { // invalid move
    return false;
  }
  
  // this was a successful move
  return true;
}; // end moveHandler
  
// moves player to a square at (x, y) if possible using BFS
Sokoban.prototype.goTo = function(x, y) {

  // visited is a hash of the visited node and its parent
  let visited = {};
  
  // queue of nodes pending visit
  let queue = [];
  
  // add the origin node to the queue and set its parent to null
  queue.push([this.px, this.py]);
  visited[this.px + " " + this.py] = null;
  
  // while there are still nodes left to visit...
  while (queue.length) {
      
    // grab the first in line
    let current = queue.shift();
    
    // check to see if this node is the destination
    if (current[0] === x && current[1] === y) {

      // construct a path stack from the destination point's ancestors
      let path = [];
      while (current[0] !== this.px || current[1] !== this.py) {
        path.push(current);
        current = visited[current[0] + " " + current[1]];
      }
      
      // execute the moves in the path stack
      while (path.length) {
        let nextMove = path.pop();
        if (nextMove[0] < this.px) {
          if (!this.move("l")) return false;
        }
        else if (nextMove[0] > this.px) {
          if (!this.move("r")) return false;
        }
        else if (nextMove[1] < this.py) {
          if (!this.move("u")) return false;
        }
        else if (nextMove[1] > this.py) {
          if (!this.move("d")) return false;
        }
        else {
          return false;
        }
      }
      
      // this move was successful
      return true;
    }
    
    // not at destination yet, grab a list of available adjacent squares
    let adjacent = this.getNeighbors(current[0], current[1], [" ", "."], x, y);
    
    // for each unvisited adjacent square, set its parent as the current node and enqueue
    for (let i = 0; i < adjacent.length; i++) {
      if (!visited[adjacent[i][0] + " " + adjacent[i][1]]) {
        visited[adjacent[i][0] + " " + adjacent[i][1]] = current;
        queue.push(adjacent[i]);
      }
    }
  }
  
  // no path is available to the destination
  return false;
}; // end goTo
  
// return a list of empty neighbors for a coordinate matching an
// array of types, plus an optional point to include disregarding type
Sokoban.prototype.getNeighbors = function(x, y, includeTypes, includeX, includeY) {
  let dirs = [[-1, 0], [0, -1], [0, 1], [1, 0]];
  let neighbors = [];
  for (let i = 0; i < dirs.length; i++) {
    if (this.level[y+dirs[i][0]] && 
        this.level[y+dirs[i][0]][x+dirs[i][1]] && 
        (includeTypes.indexOf(this.level[y+dirs[i][0]][x+dirs[i][1]]) >= 0 ||
        includeX === x+dirs[i][1] && includeY === y+dirs[i][0])) {
      neighbors.push([x+dirs[i][1], y+dirs[i][0]]);
    }
  }
  return neighbors;
}; // end getNeighbors
  
// check if the current level has been completed
Sokoban.prototype.isFinished = function() {
  return this.isLevelFinished(this.level);
}; // end isFinished
  
// check if parameter level has been completed
Sokoban.prototype.isLevelFinished = function(level) {
  for (let i = 0; i < level.length; i++) {
    for (let j = 0; j < level[i].length; j++) {
      if (["$", "."].indexOf(level[i][j]) >= 0) {
        return false;
      }
    }
  }
  return true;
}; // end isLevelFinished
  
// renders the current position to HTML
Sokoban.prototype.toHTML = function() {
  let output = "<table>";
  for (let i = 0; i < this.level.length; i++) {
    output += "<tr>";
    for (let j = 0; j < this.level[i].length; j++) {
      output += "<td onclick='clickHandler(this);' " +
        "id='soko-" + i + "-" + j + "' class='";
      switch (this.level[i][j]) {
        case " ": output += "sokospace";   break;
        case "#": output += "sokowall";    break;
        case ".": output += "sokogoal";    break;
        case "$": output += "sokobox";     break;
        case "*": output += "sokoboxg";    break;
        case "@": output += "sokoplayer";  break;
        case "+": output += "sokoplayerg"; break;
        default : console.log("toHTML char error");
      }
      output += "'></td>";
    }
    output += "</tr>";
  }
  return output + "</table>";
}; // end toHTML