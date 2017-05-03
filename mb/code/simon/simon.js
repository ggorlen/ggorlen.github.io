// todo: add thumb piano sound/colors, fix interval bug: fixed?

"use strict";


const ANIMATION_SPEED = 1000;
let size;
let sequence;
let idx;
let interval;
let allowInput;
let bestScore;
let backgroundColors;

function init() {
  size = document.forms["sizeinput"].elements["size"].value;
  if (!size || isNaN(size) || size < 2) size = 2;
  bestScore = parseInt(localStorage["simonBestScore" + size]) || "n/a";
  idx = 0;
  sequence = [];
  backgroundColors = {};
  makeGrid();
  setBackgroundColors();
  extendSequence();
  showScore();
  showSequence();
}

function setBackgroundColors() {
  for (let i = 0; i < size * size; i++) {
    backgroundColors[i] = "hsl(" + randInt(0, 255) + ", 90%, 80%)";
  }
}

function showScore() {
  setId("simonscore", 
    "streak : " + sequence.length + 
    "<br>best : " + bestScore
  );
}

function makeGrid() {
  let output = "<table>";
  let count = 0;
  
  for (let i = 0; i < size; i++) {
    output += "<tr>";
    for (let j = 0; j < size; j++) {
      output += "<td onclick=\"testSequence(" + count + 
                ");\" id=\"square" + count++ + "\"></td>";
    }
    output += "</tr>";
  }
  setId("simon", output + "</table>");
}

function showSequence() {
  let i = 0;
  allowInput = false;
  
  interval = setInterval(function() {
    setId("square" + sequence[i], 
        "<div style=\"background-color: " + 
        backgroundColors[sequence[i]] +
        "; width: 100%; height: 100%;\"></div>"
    );
    
    setTimeout(function(i) { 
      setId("square" + sequence[i]);
    }, ANIMATION_SPEED / 2, i);
    
    if (++i === sequence.length || 
        sequence[i] === undefined) {
      allowInput = true;
      clearInterval(interval);
    }  
  }, ANIMATION_SPEED);  
}

function testSequence(choice) {
  if (!allowInput) return;
  
  if (sequence[idx] === choice) {
    setId("square" + choice,
      "<div style=\"background-color: " + 
      backgroundColors[choice] + "; " +
      "width: 100%; height: 100%;\"></div>"
    );

    setTimeout(function(choice) { 
      setId("square" + choice);
    }, ANIMATION_SPEED / 4, choice);  
    
    if (++idx === sequence.length) {
      allowInput = true;
      idx = 0;
      extendSequence();
      showScore();
      showSequence();
    }
  }
  else {
    allowInput = false;
    setId("square" + choice,
      "<div style=\"background-color: #cc0000; " + 
      "width: 100%; height: 100%;\"></div>"
    );
      
    setTimeout(function(choice) { 
      setId("square" + choice);
   
      if (sequence.length > bestScore || isNaN(bestScore)) {
        bestScore = sequence.length;
        localStorage["simonBestScore" + size] = bestScore;
      }
      
      allowInput = true;
      init();
    }, ANIMATION_SPEED, choice);
  }
}

function extendSequence() {
  sequence.push(Math.random() * size * size | 0);
}

function setId(id, content) {
  if (!content) content = "";
  if (document.getElementById(id)) {
    document.getElementById(id).innerHTML = content;
  }
}

function randInt(lo, hi) {
  return Math.random() * (hi - lo) + lo | 0;
}
