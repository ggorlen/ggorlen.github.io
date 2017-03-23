"use strict";

// make main functions available in the global scope
let showSoko;
let sequenceInput;
let levelInput;
let clickHandler;

// sokoban object
let soko;
  
// main function
window.onload = function() {
  
  // enable tooltips
  $(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
  });
  
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

  // input handler for user to enter a sequence of moves
  sequenceInput = function(sequence) {
    soko.inputMoveSequence(sequence.replace(/\s/g, ""));
    showSoko();
  }; // end sequenceInput
  
  // input handler for user to move player to a specific square
  clickHandler = function(element) {
    let destination = element.id.slice(5);
    destination = destination.split("-");
    soko.goTo(parseInt(destination[1]), parseInt(destination[0]));
    showSoko();
  }; // end clickHandler
  
  // displays sokoban html output
  showSoko = function() {
      
    // show main sokoban game
    document.getElementById("soko").innerHTML = soko.toHTML();
    
    // show sokoban score 
    document.getElementById("sokoscore").innerHTML = 
      "<table><tr><td class='ralign'>level:</td>" + 
      "<td>" + (soko.levelNum+1) + "</td>" +
      "<td class='ralign'>moves:</td><td>" + 
      (soko.history.length-1) + "</td></tr>" +
      "<tr><td class='ralign'>pushes:</td><td> " + 
      soko.pushes + "</td>" + "<td class='ralign'>" + 
      (localStorage ? "best:</td><td> " + 
      (soko.bestScore ? soko.bestScore : "&#8734;") : "") + 
      "</td></tr></table>";

    // show the sequence of moves made
    document.getElementById("sokosequence").innerHTML = 
      (soko.sequence ? soko.sequence : "<em>empty</em>");
  }; // end showSoko
  
  // allows user to load a custom level
  levelInput = function(level) {
    let rawLevel = level || document.getElementById('levelinput').value;
    if (rawLevel) {
      if (soko.inputRawLevel(rawLevel)) {
        document.getElementById("sokolevelerror").innerHTML = "";
        showSoko();
        return true;
      }
      else {
        document.getElementById("sokolevelerror").innerHTML = 
          "<em>- level parsing error -</em>";
      }
    }
    return false;
  }; // end levelInput
    
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
    
    // abort if key unrecognized or keys are disallowed
    if (!key || !keyAllowed) {
      return;
    }
    // handle arrow key input
    else if (ARROW_KEYS[key]) {            
      soko.move(ARROW_KEYS[key]);
      
      // prevent multiple actions on one press for arrow keys
      keyAllowed = false;
      
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
  
  // listen for enter key on sequence input textarea
  document.getElementById("seqinput").
    addEventListener("keydown", function(e) {
    if (KEYS[e.keyCode]) {
      keyAllowed = false;
    }
    if (e.keyCode === 13) {
      e.preventDefault();
      sequenceInput(this.value);
    }
  }); // end seqinput addEventListener
  
  // prevent game moves on level input
  document.getElementById("levelinput").
    addEventListener("keydown", function(e) {
    if (KEYS[e.keyCode]) {
      keyAllowed = false;
    }
  }); // end levelInput addEventListener
}; // end window.onload