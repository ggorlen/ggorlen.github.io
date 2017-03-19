"use strict";

// make sokoban object available in the global scope
let soko;
let customLevel;

// main function
window.onload = function() {
      
  // map wasd to direction
  const WASD = {
    "w": "u",
    "a": "l",
    "s": "d",
    "d": "r"
  };
  
  // map of arrow keys
  const ARROW_KEYS = {
    "arrowU": "u",
    "arrowD": "d", 
    "arrowL": "l", 
    "arrowR": "r"
  };
  
  // map of valid keyboard codes
  const KEYS = {
    37: "arrowL",
    38: "arrowU",
    39: "arrowR",
    40: "arrowD",
    65: "a",
    66: "b",
    68: "d",  
    81: "q",
    82: "r",
    83: "s",  
    86: "v",
    87: "w",
    90: "z",
    188: ",",
    190: "."
  };

  // displays sokoban html output
  let showSoko = function() {
    document.getElementById("soko").innerHTML = soko.toHTML();
    document.getElementById("sokoscore").innerHTML = 
      "level: " + (soko.levelNum+1) + "<br>" +
      "pushes: " + soko.pushes + "<br>" +
      "moves: " + (soko.history.length-1) + "<br>" +
      (localStorage ? "best: " + (soko.bestScore ? soko.bestScore : "&#8734;") : "");
  };
  
  // allows user to load a custom level
  customLevel = function(level) {
    soko.init(level);
    showSoko();
  };
    
  // create the game
  soko = new Sokoban(ORIGINAL_LEVELS, 0);
  let keyAllowed = true;
  let mvmtToggle = true;
  showSoko();
  
  // add key listeners
  document.onkeyup = function(e) {
    keyAllowed = true;
  };
  
  document.onkeydown = function(e) {
    let key = KEYS[e.keyCode];
    
    // abort if key unrecognized
    if (!key) {
      return;
    }
    // handle arrow key input
    else if (ARROW_KEYS[key]) {            
      if (keyAllowed) {
      
        // prevent multiple actions on one press for arrow keys
        keyAllowed = false;

        soko.move(ARROW_KEYS[key]);
      }
      
      // prevent unwanted scrolling
      e.preventDefault();
    }
    // handle wasd input based on behavior toggle
    else if (WASD[key]) {
      if (mvmtToggle) soko.move(WASD[key]);
      else while (soko.move(WASD[key]));
    }
    // undo move
    else if (key === "z") {
      soko.undo();
    }
    // toggle continuous movement behavior
    else if (key === "q") {
      mvmtToggle = !mvmtToggle;
    }
    // reset level
    else if (key === "r") {
      soko.reset();
    }
    // increment level
    else if (key === ".") {
      soko.switchLevel((soko.levelNum+1) % soko.levels.length); 
    } 
    // decrement level
    else if (key === ",") {
      soko.switchLevel((soko.levelNum-1 + soko.levels.length) %
        soko.levels.length);
    } 
    // save position
    else if (key === "v") {
      soko.savePosition();
    } 
    else if (key === "b") {
      soko.loadSavedPosition();
    } 
    
    // display the new position
    showSoko();
  }; // end document.onkeydown        
}; // end window.onload