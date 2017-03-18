/* TODO:
 * add variants
 * refactor board into 1-d array
 * add numMoves
 * optimize board creation speed for large boards http://stackoverflow.com/questions/714942/how-to-stop-intense-javascript-loop-from-freezing-the-browser
 * awesome resources!! http://www.chiark.greenend.org.uk/~sgtatham/puzzles/
 * https://en.wikipedia.org/wiki/Board_puzzles_with_algebra_of_binary_variables
 * https://en.wikipedia.org/wiki/Minesweeper_(video_game)
 */

// preload images
if (document.images) {
  var images = ["1.png", "2.png", "3.png",
                "4.png", "5.png", "6.png",
                "7.png", "8.png", "mine.png",
                "revealed.png", "hidden.png",
                "flag.png", "question.png"];

  for (var i = 0; i < images.length; i++) {
    var img = new Image();
    img.src = images[i];
  }
}

// declare variables
var gameOver;
var board;
var clockInterval;
var duration;

// represents a minesweeper tile
var Tile = function (x, y) {
  this.flagged = false;
  this.mined = false;
  this.revealed = false;
  this.question = false;
  this.x = x;
  this.y = y;
  this.neighbors = [];
  this.numMines;

  // returns image associated with this tile
  this.getImg = function (getMined) {
    if (this.revealed) {
      if (this.numMines === 0) return "<img src='revealed.png'></img>";
      else return "<img src='" + this.numMines + ".png'></img>";
    }
    if (getMined) return "<img src='mine.png'></img>";
    if (this.flagged) return "<img src='flag.png'></img>";
    if (this.question) return "<img src='question.png'></img>";
    else return "<img src='hidden.png'></img>";
  };
  
  // recursively reveals unmined tiles
  this.reveal = function () {
    if (!this.mined && !this.flagged && 
        !this.revealed) {
      this.revealed = true;
      document.getElementById(this.x + '-' + this.y)
        .innerHTML = this.getImg();
      
      if (!this.numMines) {
        var neighbors = this.neighbors;
        for (var i = 0; i < neighbors.length; i++) {
          neighbors[i].reveal();
        }
      }
    }
  };
}; // end Tile class

// minesweeper board
var Board = function (height, width, numMines) {
  this.tiles = [];
  this.height = height;
  this.width = width;
  this.numMines = numMines;
  
  // displays mine locations
  this.kill = function() {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        if (board.tiles[i][j].mined) {
          document.getElementById(i + '-' + j).innerHTML = 
            this.tiles[i][j].getImg(true);
        }
      }
    }
  };

  // sends board to HTML div
  this.print = function () {
    var s = "<table id='mscontainer'>";
    for (var i = 0; i < this.height; i++) {
      s += "<tr>";
      for (var j = 0; j < this.width; j++) {
        s += "<td class='mstile' id='" + i + '-' + j + "'>" + 
          this.tiles[i][j].getImg() + "</td>";
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
      else if (e.button == 0) board.mark($(this).attr('id'), "reveal");
      else if (e.button == 2) board.mark($(this).attr('id'), "flag");
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
  
  // determines neighbors for each tile in the board
  this.setNeighbors = function (tile) {
    var dirs = [[-1, -1], [-1, 1], [1, -1], [-1, 0], 
                [ 0, -1], [ 0, 1], [1,  0], [ 1, 1]];
  
    for (var i = 0; i < dirs.length; i++) {
      if (tile.x + dirs[i][0] >= 0 && 
          tile.y + dirs[i][1] >= 0 &&
          tile.x + dirs[i][0] < this.height && 
          tile.y + dirs[i][1] < this.width) {
        tile.neighbors.push(
          this.tiles[tile.x + dirs[i][0]][tile.y + dirs[i][1]]);
      }
    }
  };

  // adds scoreboard for this boards' parameters from local storage
  this.addScore = function() {
    if (localStorage) {
      var bestScore = localStorage[this.height + " " + 
                this.width + " " + this.numMines];
    }
    if (bestScore === undefined) bestScore = 0;
    document.getElementById("score").innerHTML = "Quickest -> " +
    Math.floor(bestScore / 3600) + "h : " + 
    Math.floor(bestScore % 3600 / 60) + "m : " + 
    Math.floor(bestScore % 60) + "s";;
  };
  
  
  // marks a tile according to left/right click event
  this.mark = function (loc, action) {  
    var x = loc.split("-")[0];
    var y = loc.split("-")[1];
    
    if (action === "reveal") {
      if (this.tiles[x][y].mined) {
        gameOver = true;
      }
      else {
        this.tiles[x][y].reveal();
      }
    }
    else if (action === "flag") {
      if (!this.tiles[x][y].flagged && 
          !this.tiles[x][y].question) {
        this.tiles[x][y].flagged = true;
      }
      else if (this.tiles[x][y].flagged) {
        this.tiles[x][y].flagged = false;
        this.tiles[x][y].question = true;
      }
      else if (this.tiles[x][y].question) {
        this.tiles[x][y].question = false;
      }
      
      document.getElementById(x + '-' + y).innerHTML = 
        this.tiles[x][y].getImg();
    }
  
    // handle win
    if (this.isWon()) {
      if (localStorage) {
        var storage = parseInt(localStorage[this.height +
                      " " + this.width + " " + this.numMines]);
                  
        if (isNaN(storage) || duration < storage) {            
          localStorage[this.height + " " + this.width + 
                       " " + this.numMines] = duration;
        }
      }
      
      gameOver = true;
    }
    
    // handle game over
    if (gameOver) {
      this.kill();
      stopClock();
    }
  };
  
  // checks for win
  this.isWon = function () {
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        if (!this.tiles[i][j].mined && 
            !this.tiles[i][j].revealed) {
          return false;
        }
      }
    }
    return true;
  };
  
  // initializes a new board
  this.init = function () {
    this.addScore();
    
    // create a 2d array to hold board data
    for (var i = 0; i < this.height; i++) {
      this.tiles.push(new Array());
      for (var j = 0; j < this.width; j++) {
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
      if (!this.tiles[rh][rw].mined) {
        this.tiles[rh][rw].mined = true;
        i++;
      }
    }
    
    // set neighbor array for each tile
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        this.setNeighbors(this.tiles[i][j]);
      }
    }
    
    // count mines for each tile
    for (var i = 0; i < this.height; i++) {
      for (var j = 0; j < this.width; j++) {
        this.tiles[i][j].numMines = 
          this.countMines(this.tiles[i][j]);
      }
    }
  };
  
  // call init function
  this.init();

}; // end Board class


// generates a random int between two bounds
function rand(lo, hi) {
  return Math.floor(Math.random() * (hi - lo)) + lo;
}

// starts a new game
function newGame() {
  document.getElementById("clock").innerHTML = "loading...";
    
  // collect user's board parameters
  boardHeight = parseInt(document.forms['sizeinput'].elements['h'].value); 
  boardWidth = parseInt(document.forms['sizeinput'].elements['w'].value); 
  numMines = parseInt(document.forms['sizeinput'].elements['n'].value);
  
  // revert to default parameters if necessary
  if (isNaN(boardHeight) || boardHeight < 4 || boardHeight > 150) {
    boardHeight = 8;
    document.forms['sizeinput'].elements['h'].value = boardHeight; 
  }
  if (isNaN(boardWidth) || boardWidth < 4 || boardWidth > 150) {
    boardWidth = 8;
    document.forms['sizeinput'].elements['w'].value = boardWidth;
  }
  if (isNaN(numMines) || numMines >= boardHeight * boardWidth) {
    numMines = 10;
    document.forms['sizeinput'].elements['n'].value = numMines; 
  }
  
  // reset variables and create a board
  gameOver = false;
  board = new Board(boardHeight, boardWidth, numMines);
  board.print();
  startClock();
}

// starts game clock
function startClock() {
  duration = 0;
  stopClock();
  clockInterval = setInterval(function () {
    document.getElementById('clock').innerHTML = 
    Math.floor(duration / 3600) + "h : " + 
    Math.floor(duration % 3600 / 60) + "m : " + 
    Math.floor(duration % 60) + "s";
    duration++;
  }, 1000);
}

// stops game clock
function stopClock() {
  clearInterval(clockInterval);;
}
