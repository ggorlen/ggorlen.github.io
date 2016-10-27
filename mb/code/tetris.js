// In progress!

/* http://tetris.wikia.com/wiki/Tetris_Guideline
*/
/* todo todo http://stackoverflow.com/questions/1280263/changing-the-interval-of-setinterval-while-its-running
*/


// get canvas and context from DOM
var canvas = document.getElementById("tetriscanvas");
var ctx = canvas.getContext("2d");

// constants
var GRID_SIZE = canvas.width / 10;
var INIT_X = canvas.width / 2;
var INIT_Y = -GRID_SIZE;

// game variables
var activeBlock;
var nextBlock;
var deadSquares = [];
var rowCounter = [];
var score = 0;

// interval variables
var frameInterval;
var stepInterval;

// keyboard
var kbd = function () {
  this.left = false;
  this.up = false;
  this.down = false;
  this.right = false;
};

var Square = function(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
};

var Block = function (squares) {
  this.squares = squares;
  this.size = squares.length;

  // steps the block one GRID_SIZE closer to the bottom of the screen
  this.step = function () {     
    for (var i = 0; i < this.size; i++) {
      this.squares[i].y += GRID_SIZE;
    }
  };
  
  // moves Block to the left or right if legal
  this.move = function () {
    if (kbd.left) {
      for (var i = 0; i < this.size; i++) {         
        
        // prevent block from moving over the left side of the screen
        if (this.squares[i].x <= 0) {
          return;
        }
      
        // prevent block from clipping into a dead square from the right
        for (var j = 0; j < deadSquares.length; j++) {
          if (deadSquares[j].x + GRID_SIZE === this.squares[i].x && 
              deadSquares[j].y === this.squares[i].y) {
            return;
          }
        }
      }
      
      // tests passed--execute a move to the left
      for (var i = 0; i < this.size; i++) {
        this.squares[i].x -= GRID_SIZE;
      }
    } // end if (kbd.left)
    
    if (kbd.right) {
      for (var i = 0; i < this.size; i++) {         
        
        // prevent block from moving over the right side of the screen
        if (this.squares[i].x >= canvas.width - GRID_SIZE) {
          return;
        }
      
        // prevent block from clipping into a dead square from the left
        for (var j = 0; j < deadSquares.length; j++) {
          if (deadSquares[j].x - GRID_SIZE === this.squares[i].x && 
              deadSquares[j].y === this.squares[i].y) {
            return;
          }
        }
      }
      
      // tests passed--execute a move to the right
      for (var i = 0; i < this.size; i++) {
        this.squares[i].x += GRID_SIZE;
      }
    } // end if (kbd.right)
  }; // end move function
  
  // rotates a block counter-clockwise
  this.rotateCCW = function () {
    
  }
  
}; // end Block class

// initialize a game
function init() {
  deadSquares = [];
  rowCounter = [];
  for (var i = 0; i < canvas.height / GRID_SIZE; i++) {
    rowCounter[i] = 0;
  }
  
  nextBlock = new Block(getPattern());
  newActiveBlock();
  score = 0;
}

// returns a pattern for making a tetris block
function getPattern() {
  var choice = Math.floor(Math.random() * 2);
  
  // square pattern
  if (choice === 0) {
    var color = "rgb(255, 0, 0)";
    return [ new Square(INIT_X, INIT_Y, color), 
             new Square(INIT_X, INIT_Y + GRID_SIZE, color), 
             new Square(INIT_X, INIT_Y + GRID_SIZE * 2, color), 
             new Square(INIT_X, INIT_Y + GRID_SIZE * 3, color) ];
  }

  // rod pattern
  else if (choice === 1) {
    var color = "rgb(127, 0, 127)";
    return [ new Square(INIT_X, INIT_Y, color), 
             new Square(INIT_X, INIT_Y + GRID_SIZE, color), 
             new Square(INIT_X - GRID_SIZE, INIT_Y, color), 
             new Square(INIT_X - GRID_SIZE, INIT_Y + GRID_SIZE, color) ];
  }
/*
  // L pattern
  else if (choice === 2) {
    var color = "rgb(127, 127, 0)";
    return [ new Square(INIT_X, INIT_Y, color), 
             new Square(INIT_X + GRID_SIZE, INIT_Y, color), 
             new Square(INIT_X, INIT_Y + GRID_SIZE, color), 
             new Square(INIT_X, INIT_Y + GRID_SIZE * 2, color) ];
  }*/
}

// generates a new nextBlock and makes old nextBlock the activeBlock
function newActiveBlock() {
  activeBlock = nextBlock;
  nextBlock = new Block(getPattern());
  
  if (isGameOver()) init();
}

// check if any dead squares are at the top of the screen
function isGameOver() {
  for (var i = 0; i < deadSquares.length; i++) {
    if (deadSquares[i].y <= 0) {
      return true;
    }  
  }
  return false;
}

// checks for filled rows
function checkCollapse() {
  for (var i = 0; i < rowCounter.length; i++) {
    if (rowCounter[i] === GRID_SIZE) {
      collapseRow(i);
    }
  }
}

// removes a filled row and shifts rows above downward
function collapseRow(row) {
  
  //debug:
  //console.log("called collapserow()");

  row = ++row * GRID_SIZE;

   // remove the dead squares for this row
  for (var i = 0; i < deadSquares.length; i++) {
    if (deadSquares[i].y === row) {
      deadSquares.splice(i, 1);
    }
  }
  
  // shift all blocks above the row downward
  for (var i = 0; i < deadSquares.length; i++) {
    if (deadSquares[i].y < row) {
      deadSquares[i].y += GRID_SIZE;
    }
  }
  
  // shift row counters downward
  row = row / GRID_SIZE - 1;
  for (var i = row; i > 0; i--) {
    rowCounter[i] = rowCounter[i - 1];
  }
  
  // increment score
  score++;
}  

// detects collisions
function collision() {
    
  // check if active block touched a dead square
  for (var i = 0; i < activeBlock.size; i++) {
    for (var j = 0; j < deadSquares.length; j++) {
      if (activeBlock.squares[i].y === 
            deadSquares[j].y - GRID_SIZE &&
          activeBlock.squares[i].x === deadSquares[j].x) {
        killBlock(activeBlock);
        return true;
      }
    }
      
    // check if active block reached the bottom of the screen
    if (activeBlock.squares[i].y >= canvas.height - GRID_SIZE) {
      killBlock(activeBlock);
      return true;
    }
  }
  
  return false; // no collisions
}

function killBlock(block) {
  
  // add squares from dying block to deadSquares array
  for (var i = 0; i < block.size; i++) {
    deadSquares.push(block.squares[i]);
    
    // increment rowCounter
    rowCounter[block.squares[i].y / GRID_SIZE] 
                            += GRID_SIZE / 10;
//    console.log(rowCounter[i]);
  }

  //debug:
  //console.table(deadSquares);
  //console.log(rowCounter);
  
  newActiveBlock();
}






// render active block on screen
function drawActiveBlock() {
  for (var i = 0; i < activeBlock.size; i++) {
      
    // fill
    ctx.beginPath();
    ctx.fillRect(activeBlock.squares[i].x, 
                 activeBlock.squares[i].y, 
                 GRID_SIZE, GRID_SIZE);
    ctx.fillStyle = activeBlock.squares[i].color;
    ctx.fill();
    ctx.closePath();
    
    //outline
    ctx.rect(activeBlock.squares[i].x, 
             activeBlock.squares[i].y, 
             GRID_SIZE, GRID_SIZE);
    ctx.stroke();
  }     
}

// render dead squares on screen
function drawDeadSquares() {
  for (var i = 0; i < deadSquares.length; i++) {
    
    // fill
    ctx.beginPath();
    ctx.fillRect(deadSquares[i].x, deadSquares[i].y,
                 GRID_SIZE, GRID_SIZE);
    ctx.fillStyle = deadSquares[i].color;
    ctx.fill();
    ctx.closePath();    
  
    //outline
    ctx.rect(deadSquares[i].x, deadSquares[i].y, 
             GRID_SIZE, GRID_SIZE);
    ctx.stroke();     
  }
}

// keyevent listeners to track arrow key actions
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    kbd.right = true;
  }
  else if (e.keyCode === 38 || e.keyCode === 87) {
    kbd.up = true;
  }
  else if (e.keyCode === 37 || e.keyCode === 65) {
    kbd.left = true;
  }
  else if (e.keyCode === 40 || e.keyCode === 83) {
    kbd.down = true;
  }
}, false);

document.addEventListener("keyup", function (e) {
  if (e) {
    kbd.right = kbd.up = kbd.down = kbd.left = false;
  }
}, false);


// call every frame to refresh screen
var update = function () {
    
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  checkCollapse();
  
  // redraw stuff
  drawActiveBlock();
  drawDeadSquares();

  // check rotations
  
  
  // check for drops
  if (kbd.down) dropActiveBlock();
  else activeBlock.move();
};

// call every "tick" to check collisions and step activeBlock down
var moveDown = function () {
    
  // check collisions
  collision();
  
  // step activeBlock down
  activeBlock.step();  
};

// instantly moves the block to the bottom
function dropActiveBlock() {
  kbd.down = false;
  while (!collision()) {
    for (var i = 0; i < activeBlock.size; i++) {
      activeBlock.squares[i].y += GRID_SIZE;
    }
  }
}

// start game
function start() {
  init();
  
  /* Main timers with update function and 
     interval duration as parameters */
  stepInterval = setInterval(moveDown, 400);
  frameInterval = setInterval(update, 80);
}

start(); // go!
