var EMPTY_SQUARE = " "
var SIDE_LENGTH = 4;
var oddRows = [];
var board = [];

function init() {
    board = makeBoard(SIDE_LENGTH);
    findOddRows();
}

// finds indexes of odd rows
function findOddRows() {
    var counter = 0;
    
    for (var i = board.length - 1; i > 0; i--) {
        if (counter < SIDE_LENGTH) {
            oddRows.push(i);
        }

        counter++;
        
        if (counter === SIDE_LENGTH * 2) {
            counter = 0;
        }
    }
}

// generates a valid board
function makeBoard(SIDE_LENGTH) {
    var inversionCount = 0;
    board = [];
    
    // populate board
    for (var i = 1; i < SIDE_LENGTH * SIDE_LENGTH; i++) {
        board.push((i).toString());
    }
    board.push(EMPTY_SQUARE);
        
    // validate board  
    while (true) {
        shuffleArray(board);
        
        // count inversions
        for (var i = 0; i < board.length; i++) {
            for (var j = i; j < board.length; j++) {
                if (board[i] > board[j] && 
                    board[i] != EMPTY_SQUARE && 
                    board[j] != EMPTY_SQUARE) {
                    inversionCount++;
                }
            }
        } 
        
        // if SIDE_LENGTH is odd, number of inversions should be even
        if (SIDE_LENGTH % 2 !== 0 && inversionCount % 2 === 0) {
            return board;
        }
        
        /* else, check that the number of inversions are even 
           and EMPTY_SQUARE is in an odd row from the bottom */
        else if (SIDE_LENGTH % 2 === 0 && inversionCount % 2 === 0 &&
            board.indexOf(EMPTY_SQUARE) in oddRows) {
            return board;
        }
        
        /* or check that the number of inversions are odd and 
           EMPTY_SQUARE is on an even row from the bottom */
        else if (SIDE_LENGTH % 2 === 0 && inversionCount % 2 !== 0 &&
            !(board.indexOf(EMPTY_SQUARE) in oddRows)) {
            return board;
        }
    }
}

// shuffles an array
function shuffleArray(arr) {
  var i = arr.length;
  while (--i > 0) {
    var r = Math.floor(Math.random() * i);
    var temp = arr[r];
    arr[r] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

// displays board in html document
function display() {
    for (var i = 0; i < board.length; i++) {
        if (isAdjacentToEmpty(i)) {
            document.getElementById("c" + (i + 1)).innerHTML = 
              "<a href=\"#\">" + board[i] + "</a>";
        }
        else {
            document.getElementById("c" + (i + 1)).innerHTML = 
              board[i];
        }
    }
}

// returns whether a square is next to the empty square
function isAdjacentToEmpty(idx) {
    return (board[idx + 1] === EMPTY_SQUARE ||
           board[idx - 1] === EMPTY_SQUARE ||
           board[idx + SIDE_LENGTH] === EMPTY_SQUARE ||
           board[idx - SIDE_LENGTH] === EMPTY_SQUARE) &&
           !(board.indexOf(EMPTY_SQUARE) % SIDE_LENGTH === 0 &&
           idx % SIDE_LENGTH === SIDE_LENGTH - 1) && 
           !(board.indexOf(EMPTY_SQUARE) % SIDE_LENGTH === SIDE_LENGTH - 1 &&
           idx % SIDE_LENGTH === 0);
}

// moves a square adjacent to the empty square
function move(square) {
    if (isAdjacentToEmpty(square - 1)) {
        board[board.indexOf(EMPTY_SQUARE)] = board[square - 1];
        board[square - 1] = EMPTY_SQUARE;
    }
    
    display();
    
    if (isFinished()) {
        alert("Solved!");
        init();
    }
}

// returns true if a puzzle is solved, false otherwise
function isFinished() {
    var temp = board.indexOf(EMPTY_SQUARE);
    board[temp] = "";
    for (var i = 0; i < board.length; i++) {
        if (parseInt(board[i - 1]) > parseInt(board[i])) {
            board[temp] = EMPTY_SQUARE;
            return false;
        }
    }
    board[temp] = EMPTY_SQUARE;
    return true;
}


// start a game!
init();
display();