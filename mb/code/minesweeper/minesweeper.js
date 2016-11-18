/* TODO:
 * optimize for larger board sizes
 * is image preload actually working?
 */

// declare variables
var gameOver;
var board;
var clockInterval;
var duration;
var bestScore;

// represents a tile
var Tile = function (x, y) {
  this.flagged = false;
  this.mined = false;
  this.revealed = false;
  this.question = false;
  this.x = x;
  this.y = y;
  this.neighbors = [];
  this.numMines;

  this.getImg = function (isOver) {
    if (this.revealed) {
      if (this.numMines === 0) return "<img src='revealed.png'></img>";
      else return "<img src='" + this.numMines + ".png'></img>";
    }
    if (this.flagged) return "<img src='flag.png'></img>";
    if (this.question) return "<img src='question.png'></img>";
    if (isOver && this.mined) return "<img src='mine.png'></img>";
    else return "<img src='hidden.png'></img>";
  };
}; // end Tile class

// minesweeper board
var Board = function (height, width, numMines) {
  this.tiles = [];
  this.height = height;
  this.width = width;
  this.numMines = numMines;

  // sends board to HTML div
  this.print = function (isOver) {
    var s = "<table id='mscontainer'>";
    for (var i = 0; i < this.width; i++) {
      s += "<tr>";
      for (var j = 0; j < this.height; j++) {
        s += "<td class='mstile' id='" + i + '-' + j + "'>" + 
          this.tiles[i][j].getImg(isOver) + "</td>";
      }
      s += "</tr>";
    }
    s += "</table>";
    document.getElementById("mscontainer").innerHTML = s;
    
    // disable right click
    $("td").on("contextmenu", function () {
      return false;
    });
    
    // handle mouse clicks on grid
    $('.mstile').mousedown(function (e) {
      if (gameOver) newGame();
      else if (e.button == 0) mark($(this).attr('id'), "reveal");
      else if (e.button == 2) mark($(this).attr('id'), "flag");
    });
  };
  
  // counts number of mines adjacent to a tile
  this.countMines = function(tile) {
    var neighbors = tile.neighbors;
    
    var mineCount = 0;
    for (var i = 0; i < neighbors.length; i++) {
      if (neighbors[i].mined) mineCount++;
    }
  
    return mineCount;
  };
  
  // returns x/y coordinate arrays for each 
  // neighbor of a coordinate parameter
  this.setNeighbors = function (tile) {
    var dirs = [[-1, -1], [-1, 1], [1, -1], [-1, 0], 
                [ 0, -1], [ 0, 1], [1,  0], [ 1, 1]];
  
    for (var i = 0; i < dirs.length; i++) {
      if (tile.x + dirs[i][0] >= 0 && 
          tile.y + dirs[i][1] >= 0 &&
          tile.x + dirs[i][0] < this.width && 
          tile.y + dirs[i][1] < this.height) {
        tile.neighbors.push(this.tiles[tile.x + dirs[i][0]]
                                      [tile.y + dirs[i][1]]);
      }
    }
  };

  this.addScore = function() {
    // grab bestScore for this boards' parameters from local storage
    bestScore = localStorage[this.height + " " + 
                this.width + " " + this.numMines];
    if (bestScore === undefined) bestScore = 0;
    document.getElementById("score").innerHTML = "Quickest -> " +
    Math.floor(bestScore / 3600) + "h : " + 
    Math.floor(bestScore / 60) + "m : " + 
    Math.floor(bestScore % 60) + "s";;
  };
  
  // initializes a new board
  this.init = function () {
    this.addScore();
    
    document.getElementById("mscontainer").innerHTML = "";
    
    for (var i = 0; i < this.width; i++) {
      this.tiles.push(new Array());
      for (var j = 0; j < this.height; j++) {
        this.tiles[i].push(new Tile(i, j));
      }
    }
    
    // validate proposed mine quantity
    if (this.numMines >= this.height * this.width ||
        this.numMines < 1) {
      throw "Invalid number of mines specified";
    } 

    // add mines randomly
    for (var i = 0; i < this.numMines;) {
      var rh = rand(0, this.height);
      var rw = rand(0, this.width);
      if (!this.tiles[rw][rh].mined) {
        this.tiles[rw][rh].mined = true;
        i++;
      }
    }
    
    // set neighbor array for each tile
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        this.setNeighbors(this.tiles[i][j]);
      }
    }
    
    // count mines for each tile
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        this.tiles[i][j].numMines = 
          this.countMines(this.tiles[i][j]);
      }
    }
  };
  
  // call init function
  this.init();

}; // end Board class

// marks a tile according to left/right click event
function mark(loc, action) {  
  var x = loc.split("-")[0];
  var y = loc.split("-")[1];
  
  if (action === "reveal") {
    if (board.tiles[x][y].mined) {
      gameOver = true;
    }
    else {
      reveal(board.tiles[x][y]);
    }
  }
  else if (action === "flag") {
    if (!board.tiles[x][y].flagged && 
        !board.tiles[x][y].question) {
      board.tiles[x][y].flagged = true;
    }
    else if (board.tiles[x][y].flagged) {
      board.tiles[x][y].flagged = false;
      board.tiles[x][y].question = true;
    }
    else if (board.tiles[x][y].question) {
      board.tiles[x][y].question = false;
    }
    
    document.getElementById(x + '-' + y).innerHTML = 
      board.tiles[x][y].getImg();
  }

  if (isWon()) {
    var storage = parseInt(localStorage[board.height +
                " " + board.width + " " + board.numMines]);
    console.log(duration);
    console.log(storage);
    if (isNaN(storage) || duration < storage) {
        
        localStorage[board.height + " " + board.width + 
                " " + board.numMines] = duration;
        console.log(localStorage[board.height + 
                " " + board.width + " " + board.numMines]);
    }
    gameOver = true;
  }
  
  if (gameOver) {
    stopClock();
    board.print(gameOver);
  }
}

// checks for win conditions
function isWon() {
  for (var i = 0; i < board.width; i++) {
    for (var j = 0; j < board.height; j++) {
      if (!board.tiles[i][j].mined && 
          !board.tiles[i][j].revealed) {
        return false;
      }
    }
  }
  return true;
}

// recursively reveals unmined tiles
function reveal(tile) {
  if (!tile.mined && !tile.flagged && 
      !tile.revealed) {
    tile.revealed = true;
    document.getElementById(tile.x + '-' + tile.y)
      .innerHTML = tile.getImg();
    
    if (!tile.numMines) {
      var neighbors = tile.neighbors;
      for (var i = 0; i < neighbors.length; i++) {
        reveal(neighbors[i]);
      }
    }
  }
}

// generate a random int between two bounds
function rand(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

// start a new game
function newGame() {
  boardHeight = parseInt(document.forms['sizeinput'].elements['h'].value); 
  boardWidth = parseInt(document.forms['sizeinput'].elements['w'].value); 
  numMines = parseInt(document.forms['sizeinput'].elements['n'].value);
  
  if (isNaN(boardHeight) || boardHeight < 4 || boardHeight > 80) {
    boardHeight = 8;
    document.forms['sizeinput'].elements['h'].value = boardHeight; 
  }
  if (isNaN(boardWidth) || boardWidth < 4 || boardWidth > 80) {
    boardWidth = 8;
    document.forms['sizeinput'].elements['w'].value = boardWidth;
  }
  if (isNaN(numMines) || numMines >= boardHeight * boardWidth) {
    numMines = 10;
    document.forms['sizeinput'].elements['n'].value = numMines; 
  }
  
  gameOver = false;
  board = new Board(boardHeight, boardWidth, numMines);
  board.print();
  startClock();
}

// start game clock
function startClock() {
  duration = 0;
  stopClock();
  clockInterval = setInterval(function () {
    document.getElementById('clock').innerHTML = 
    Math.floor(duration / 3600) + "h : " + 
    Math.floor(duration / 60) + "m : " + 
    Math.floor(duration % 60) + "s";
    duration++;
  }, 1000);
}

// stop game clock
function stopClock() {
  clearInterval(clockInterval);;
}
