/* 15-puzzle
 *
 * todos:
 * -cut up a picture
 * -add mouse support
 * -optimize display by only displaying changed squares
 * -animate movements
 */

// declare variables and constants
var EMPTY_SQUARE = " "
var sideLength;
var board;
var numMoves;
var gameOver;
var bestScore;

// initializes a new puzzle
function init(size) {
  size = parseInt(size);
  
  if (!isNaN(size) && size >= 2 && size <= 15) {
    sideLength = size;
    
    // grab the best score from localStorage object
    bestScore = parseInt(localStorage["npuzzleBestScore" + sideLength]) || "n/a";

    numMoves = 0;
    gameOver = false;
    board = makeBoard(sideLength);
    display();
  }
}

// finds indexes of odd rows in a board
function findOddRows(board) {
  var oddRows = [];
  var counter = 0;
  for (var i = board.length - 1; i >= 0; i--) {
    if (counter < sideLength) {
      oddRows.push(i);
    }
    counter++;
    if (counter === sideLength * 2) {
      counter = 0;
    }
  }
  return oddRows;
}

// generates a valid board
function makeBoard(side) {
  var board = [];
  
  // populate board with numbers size^2 - 1 plus an empty square
  for (var i = 1; i < side * side; i++) {
    board.push((i).toString());
  }
  board.push(EMPTY_SQUARE);

  // find the odd rows for this board size
  var oddRows = findOddRows(board);
    
  // validate board  
  while (true) {
    var inversionCount = 0;
    shuffleArray(board);
    
    // count inversions
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== EMPTY_SQUARE) {
        for (var j = i + 1; j < board.length; j++) {
          if (board[i] > board[j] && board[j] !== EMPTY_SQUARE) {
            inversionCount++;
          }
        }
      }
    } 
    
    // if side length is odd, number of inversions should be even
    if (side % 2 !== 0 && inversionCount % 2 === 0) {
      return board;
    }
    
    /* else, check that the number of inversions are even 
       and EMPTY_SQUARE is in an odd row from the bottom */
    else if (side % 2 === 0 && inversionCount % 2 === 0 &&
             oddRows.includes(board.indexOf(EMPTY_SQUARE))) {
      console.log("#2 inv: " + inversionCount);
      return board;
    }
    
    /* or check that the number of inversions are odd and 
       EMPTY_SQUARE is on an even row from the bottom */
    else if (side % 2 === 0 && inversionCount % 2 !== 0 &&
             !oddRows.includes(board.indexOf(EMPTY_SQUARE))) {
      console.log("#3 inv: " + inversionCount);
      return board;
    }
  }
}

// shuffles an array using fisher-yates
function shuffleArray(arr) {
  var i = arr.length;
  while (i > 0) {
    var r = Math.floor(Math.random() * i--);
    var temp = arr[r];
    arr[r] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// displays board in an html document
function display() {
  var output = "<table>";
  for (var i = 0; i < board.length; i++) {
    if (i % sideLength === 0) {
      output += "</tr><tr>"
    }
    output += "<td id='npuzzle" + board[i] + "'>" + board[i] + "</td>";
  }
  document.getElementById("puzzlecontainer").innerHTML = output;
  document.getElementById("output").innerHTML = "moves: " + numMoves + 
      "<br>best: " + bestScore +
      "<br><br>size: <input size=2 type='text' id='sizeInput' " + 
      "value=" + sideLength + " /> " +
      "<button onclick='init(document.getElementById(\"sizeInput\").value);'>" +
      "New game</button</p>";
}

// returns whether a square is next to the empty square
function isAdjacentToEmpty(idx) {
  return board[idx + 1] === EMPTY_SQUARE && idx % sideLength !== sideLength - 1 ||
         board[idx - 1] === EMPTY_SQUARE && idx % sideLength !== 0 ||
         board[idx - sideLength] === EMPTY_SQUARE ||
         board[idx + sideLength] === EMPTY_SQUARE;
}

// returns true if a puzzle is solved, false otherwise
function isFinished() {
  for (var i = 0; i < board.length - 1; i++) {
    if (board[i] === EMPTY_SQUARE || 
        parseInt(board[i + 1]) < parseInt(board[i])) {
      return false;
    }
  }
  return true;
}

// moves a square adjacent to the empty square if valid
function move(direction) {
  var emptySquareIdx = board.indexOf(EMPTY_SQUARE);
  var candidateIdx = emptySquareIdx;
  
  // determine the candidate square based on direction
  switch (direction) {
    case "down"  : candidateIdx += sideLength; break;
    case "up"    : candidateIdx -= sideLength; break;
    case "left"  : candidateIdx -= 1;          break;
    case "right" : candidateIdx += 1;          break;
    default      : console.log("invalid direction in move function");
  }

  // check to ensure this is a valid move
  if (candidateIdx >= 0 && candidateIdx < board.length && 
      isAdjacentToEmpty(candidateIdx)) {
          
    // valid move--swap the two squares and increment numMoves
    board[emptySquareIdx] = board[candidateIdx];
    board[candidateIdx] = EMPTY_SQUARE;
    numMoves++;
  }
  
  display();
  
  // check if the move solved the puzzle
  if (isFinished()) {
    gameOver = true;
    
    // store the new best score in localStorage if necessary
    if (numMoves < bestScore || isNaN(bestScore)) {
      bestScore = numMoves;
      localStorage["npuzzleBestScore" + sideLength] = bestScore;
    }
    
    // display a victory message
    document.getElementById("output").innerHTML = 
      "solved in " + numMoves + " moves!<br>" + 
      "best: " + bestScore +
      "<br><br>size: <input size=2 type='text' id='sizeInput' " + 
      "value=" + sideLength + " /> " +
      "<button onclick='init(document.getElementById(\"sizeInput\").value);'>" +
      "New game</button>";
  }
}

// keyevent listeners to track arrow key actions
document.addEventListener("keydown", function (e) {
  if (!gameOver) {
    if (e.keyCode === 39 || e.keyCode === 68) {
      move("left");
    }
    else if (e.keyCode === 38 || e.keyCode === 87) {
      move("down");
    }
    else if (e.keyCode === 37 || e.keyCode === 65) {
      move("right");
    }
    else if (e.keyCode === 40 || e.keyCode === 83) {
      move("up");
    }
  }
  if (e.keyCode === 13) {
    init(document.getElementById("sizeInput").value);
  }
}, false);

onload = function() {
  init(3);
};
