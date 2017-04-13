/** Simple snake... with poop */

// declare constants
const HEIGHT = 20;
const WIDTH = 20;
const INIT_GAME_SPEED = 90;
const INIT_TAIL_SIZE = 3;

// declare variables
let board;
let snake;
let apple;
let kbd;
let interval;
let stepSpeed;
let poop;

// initializes a new game
function init() {
  clearInterval(interval);
  kbd = new Keyboard();
  poop = [];
  board = new Board(WIDTH, HEIGHT);
  board.draw("");
  snake = new Snake(Math.floor(WIDTH / 2), 
                    Math.floor(HEIGHT / 2));
  board.makeApple();
  setId("scorebox", "munched: " + (snake.tail.length - 3));
  setId("sb" + apple.x + "_" + apple.y, "@");
  stepSpeed = INIT_GAME_SPEED;
  pause();
}

// pauses the game
function pause() {
  kbd.down = kbd.up = kbd.left = kbd.right = false;
  let pause = setInterval(function() {
    if (kbd.down || kbd.up || kbd.left || kbd.right) {
      clearInterval(pause);
      interval = setInterval(update, stepSpeed);
    }
  }, 10);
}

// keyboard handler
let Keyboard = function() {
  this.up = this.right = false;
  this.left = this.down = false;
};

// represents a snake board
let Board = function(width, height) {
  this.height = height;
  this.width = width;
  
  // generates a new apple
  this.makeApple = function() {
    let done = false;
    while (!done) {
      done = true;
      apple = new Apple(rInt(0, this.width),
                        rInt(0, this.height));
      for (let i = 0; i < snake.tail.length; i++) {
        if (snake.tail[i].x === apple.x && 
            snake.tail[i].y === apple.y) {
          done = false;
          break;
        }
      }
    }
  };
  
  // draws the board to the screen
  this.draw = function(content) {
    let output = "<table>";
    for (let i = 0; i < board.height; i++) {
      output += "<tr>";
      for (let j = 0; j < board.width; j++) {
        output += "<td id=\"sb" + j + "_" + 
                  i + "\">" + content + "</td>";
      }
      output += "</tr>";
    }
    setId("snakebox", output + "</table>");
  };  
};

// represents an apple point
let Apple = function(x, y) {
  this.x = x;
  this.y = y;
};

// represents a poop point
let Poop = function(x, y, duration) {
  this.x = x;
  this.y = y;
  this.duration = duration;
};

// represents a tail point
let Tail = function(x, y) {
  this.x = x;
  this.y = y;
};

// represents a snake beginning at an x and y coordinate
let Snake = function(x, y) {
  this.tail = [];
  for (let i = 0; i < INIT_TAIL_SIZE; i++) {
    this.tail.push(new Tail(x, y));
  }
  
  // move the snake forward based on kbd
  this.move = function() { 
    for (let i = this.tail.length - 1; i > 0; i--) {
      this.tail[i].x = this.tail[i - 1].x;
      this.tail[i].y = this.tail[i - 1].y;
    }
    if (kbd.up) this.tail[0].y--;
    else if (kbd.down) this.tail[0].y++;
    else if (kbd.left) this.tail[0].x--;
    else if (kbd.right) this.tail[0].x++;
  };
  
  // increase the snake's tail by one
  this.grow = function() {
    this.tail.push(new Tail(0, 0));
  };
  
  // returns true if the snake is dead
  this.isDead = function() {
    for (let i = 1; i < this.tail.length; i++) {
      if (this.tail[0].x === this.tail[i].x && 
          this.tail[0].y === this.tail[i].y) {
        return true;
      }
    }
    
    for (let i = 0; i < poop.length; i++) {
      if (this.tail[0].x === poop[i].x &&
          this.tail[0].y === poop[i].y) {
        return true;
      }
    }
    
    return this.tail[0].x >= board.width || 
           this.tail[0].y >= board.height || 
           this.tail[0].x < 0 || 
           this.tail[0].y < 0;
  };
  
  // returns true if the snake is eating an apple
  this.isEating = function(apple) {
    return this.tail[0].x === apple.x && 
           this.tail[0].y === apple.y;
  };
};

// makes a new poop with a random duration between bounds
function makePoop() { 
  poop.push(new Poop(snake.tail[snake.tail.length - 1].x,
    snake.tail[snake.tail.length - 1].y, rInt(50, 400)));
}

let update = function() {
  // clear the old snake position
  setId("sb" + snake.tail[snake.tail.length - 1].x + 
        "_" + snake.tail[snake.tail.length - 1].y, "");
    
  // is the snake ready to poop?
  if (Math.random() > .99) {
    makePoop();
    setId("sb" + poop[poop.length - 1].x + 
      "_" + poop[poop.length - 1].y, "x");
  }
  
  // have any poops expired?
  for (let i = 0; i < poop.length; i++) {
    if (--poop[i].duration === 0) {
      setId("sb" + poop[i].x + "_" + poop[i].y, "");
      poop.splice(i, 1);
    }
  }

  // did the snake eat an apple?
  if (snake.isEating(apple)) {
    snake.grow();
    board.makeApple();
    setId("sb" + apple.x + "_" + apple.y, "@");
    setId("scorebox", "munched: " + (snake.tail.length - 3));
  }
  
  // move the snake
  snake.move();
  
  // restart the game if the snake died
  if (snake.isDead()) init();
  
  // draw the new snake position
  setId("sb" + snake.tail[0].x + "_" + snake.tail[0].y, "O");
};

// add keyevent listener to track arrow key actions
document.addEventListener("keydown", function(e) {
  if ((e.keyCode === 39 || e.keyCode === 68) && !kbd.left) {
    kbd.up = kbd.down = false;
    kbd.right = true;
  }
  else if ((e.keyCode === 38 || e.keyCode === 87) && !kbd.down) {
    kbd.left = kbd.right = false;
    kbd.up = true;
  }
  else if ((e.keyCode === 37 || e.keyCode === 65) && !kbd.right) {
    kbd.up = kbd.down = false;
    kbd.left = true;
  }
  else if ((e.keyCode === 40 || e.keyCode === 83) && !kbd.up) {
    kbd.left = kbd.right = false;
    kbd.down = true;
  }
}, false);

// generates a random number between two bounds
function rInt(lo, hi) {
  return Math.floor(Math.random() * (hi - lo) + lo);
}

// wrapper to set innerHTML for a document element
function setId(id, content) {
  document.getElementById(id).innerHTML = content;
}
