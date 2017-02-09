// todo: add thumb piano sound/colors

const ANIMATION_SPEED = 1000;
let size;
let sequence;
let idx;
let interval;
let allowInput;
let bestScore;

function init() {
  size = document.forms["sizeinput"].elements["size"].value;
  if (!size || isNaN(size) || size < 2) size = 2;
  bestScore = parseInt(
    localStorage["simonBestScore" + size]
  ) || "n/a";
  idx = 0;
  sequence = [];
  makeGrid();
  extendSequence();
  showScore();
  showSequence();
}

function showScore() {
  setId("simonscore", 
    "current : " + sequence.length + 
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
        "<div style=\"background-color: rgba(0, 0, 0, 0.2); " +
        "width: 100%; height: 100%;\"></div>"
    );
    
    setTimeout(function(i) { 
      setId("square" + sequence[i]);
    }, ANIMATION_SPEED / 2, i);
    
    if (++i === sequence.length || 
        sequence[i] === undefined) {
      clearInterval(interval);
      allowInput = true;
    }  
  }, ANIMATION_SPEED);  
}

function testSequence(choice) {
  if (!allowInput) return;
  if (sequence[idx] === choice) {
    setId("square" + choice,
      "<div style=\"background-color: rgba(0, 0, 0, 0.2); " + 
      "width: 100%; height: 100%;\"></div>"
    );

    setTimeout(function(choice) { 
      setId("square" + choice);
    }, ANIMATION_SPEED / 4, choice);  
    
    if (++idx === sequence.length) {
      idx = 0;
      extendSequence();
      showScore();
      showSequence();
    }
  }
  else {
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
      
      init();
    }, ANIMATION_SPEED, choice);  
  }
}

function extendSequence() {
  sequence.push(Math.floor(
    Math.random() * size * size
  ));
}

function setId(id, content) {
  if (!content) content = "";
  document.getElementById(id).innerHTML = content;
}