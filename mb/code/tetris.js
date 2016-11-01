/* In progress!
  Todos:
   - add CCW rotation methods
   - add soft drop
   - add images to subfolder
   - save names/best scores to database
   - check for optimizing begin/endPath() calls
   - clean up or refactor rotation functions
   - http://tetris.wikia.com/wiki/Tetris_Guideline
*/

// get canvas and context from DOM
var canvas = document.getElementById("tetriscanvas");
var ctx = canvas.getContext("2d");
var sidebar = document.getElementById("tetriscanvassidebar");
var sidebarCtx = sidebar.getContext("2d");

// images
var squareImg = new Image();
squareImg.src = "square.png";
var rodImg = new Image();
rodImg.src = "rod.png";
var notchImg = new Image();
notchImg.src = "notch.png";
var sImg = new Image();
sImg.src = "s.png";
var zImg = new Image();
zImg.src = "z.png";
var lImg = new Image();
lImg.src = "l.png";
var jImg = new Image();
jImg.src = "j.png";

// constants
var GRID_SIZE = canvas.width / 10;
var INIT_X = canvas.width / 2;
var INIT_Y = -GRID_SIZE;
var FRAMERATE = 80;
var STEP_AMOUNT = 20;
var INIT_STEP_SPEED = 500;

// game variables
var activeBlock;
var nextBlock;
var deadSquares = [];
var score = 0;
var bestScore = 0;
var level = 1;
var levelCounter = 0;

// interval variables
var frameInterval;
var stepInterval;
var stepSpeed = INIT_STEP_SPEED;

// keyboard
var kbd = function () {
  this.left = false;
  this.up = false;
  this.down = false;
  this.right = false;
};

// square class
var Square = function(x, y, img) {
  this.x = x;
  this.y = y;
  this.img = img;
};

// block class
var Block = function (type) {
  this.type = type;
  this.squares = [ {}, {}, {}, {} ];
  this.size = this.squares.length;
  this.stage = 0;

  // steps the block one GRID_SIZE closer to the bottom of the screen
  this.step = function () {
    for (var i = 0; i < this.size; i++) {
      this.squares[i].y += GRID_SIZE;
    }
  };
  
  // moves Block to the left or right if legal
  this.move = function () {
    if (kbd.left) {
      kbd.left = false;
      for (var i = 0; i < this.size; i++) {         
        
        // prevent block from moving over the left side of the screen
        if (this.squares[i].x <= 0) {
          return;
        }
      
        // prevent block from clipping into a dead square from the right
        for (var j = 0; j < deadSquares.length; j++) {
          for (var k = 0; k < deadSquares[j].length; k++) {
            if (deadSquares[j][k].x + GRID_SIZE === this.squares[i].x && 
                deadSquares[j][k].y === this.squares[i].y) {
              return;              
            }
          }
        }
      }
      
      // tests passed--execute a move to the left
      for (var i = 0; i < this.size; i++) {
        this.squares[i].x -= GRID_SIZE;
      }
    } // end if (kbd.left)
    
    if (kbd.right) {
      kbd.right = false;
      for (var i = 0; i < this.size; i++) {         
        
        // prevent block from moving over the right side of the screen
        if (this.squares[i].x >= canvas.width - GRID_SIZE) {
          return;
        }
      
        // prevent block from clipping into a dead square from the left
        for (var j = 0; j < deadSquares.length; j++) {
          for (var k = 0; k < deadSquares[j].length; k++) {
            if (deadSquares[j][k].x - GRID_SIZE === this.squares[i].x && 
                deadSquares[j][k].y === this.squares[i].y) {
              return;              
            }
          }
        }
      }
      
      // tests passed--execute a move to the right
      for (var i = 0; i < this.size; i++) {
        this.squares[i].x += GRID_SIZE;
      }
    } // end if (kbd.right)
  }; // end move function

  // set method behavior based on block type
  switch (type) {
    case "square":
      var img = squareImg;
      this.squares = [ new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y + GRID_SIZE, img) ];
      this.rotateCW = function () { kbd.up = false; };
      this.rotateCCW = function () { kbd.up = false; };
    break;  // end square type
    
    case "notch":
      var img = notchImg;
      this.squares = [ new Square(INIT_X - GRID_SIZE, INIT_Y, img), 
        new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y, img) ];
       
      this.rotateCW = function () {
        kbd.up = false;
        if (this.stage === 0) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[3].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y - GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[3].x -= GRID_SIZE;
          this.squares[3].y -= GRID_SIZE;
          this.stage = 1;
        }
        else if (this.stage === 1) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[2].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[2].y - GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          } 
          
          // prevent going off the edges
          if (this.squares[2].x + GRID_SIZE >= canvas.width) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[2].x += GRID_SIZE;
          this.squares[2].y -= GRID_SIZE;
          this.stage = 2;
        }
        else if (this.stage === 2) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y + GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          } 
          
          // prevent going off the edges
          if (this.squares[0].x + GRID_SIZE >= canvas.width ||
              this.squares[0].y + GRID_SIZE >= canvas.height) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0].x += GRID_SIZE;
          this.squares[0].y += GRID_SIZE;
          this.stage = 3;
        }
        else if (this.stage === 3) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[3].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y + GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          } 
          
          // prevent going off the edges
          if (this.squares[3].x - GRID_SIZE < 0 ||
              this.squares[3].y + GRID_SIZE >= canvas.height) { 
            return; 
          } 
          
          // tests passed, do the rotation
          this.squares = [ new Square(this.squares[3].x - GRID_SIZE, 
                              this.squares[3].y + GRID_SIZE, img), 
            new Square(this.squares[1].x, this.squares[1].y, img), 
            new Square(this.squares[0].x, this.squares[0].y, img), 
            new Square(this.squares[2].x, this.squares[2].y, img) ];
          this.stage = 0;
        }
      }; // end notch rotateCW func

      this.rotateCCW = function () {
        kbd.up = false;
        this.rotateCW();
      }
    break;  // end notch type
    
    case "s":
      var img = sImg;
      this.squares = [ new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y, img) ];
        
      this.rotateCW = function () {
        kbd.up = false;
        if (this.stage === 0) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[1].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[1].x += GRID_SIZE;   
          this.squares[2].x += GRID_SIZE;
          this.squares[2].y -= GRID_SIZE * 2;
          this.stage = 1; 
        }
        else if (this.stage === 1) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[1].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y === deadSquares[i][j].y ||
                  this.squares[2].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[2].y + GRID_SIZE * 2 === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[2].x - GRID_SIZE < 0) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[1].x -= GRID_SIZE;   
          this.squares[2].x -= GRID_SIZE;
          this.squares[2].y += GRID_SIZE * 2;
          this.stage = 0;
        }
      }; // end s rotateCW func

      this.rotateCCW = function () {
        kbd.up = false;
        this.rotateCW();
      } 
    break;  // end s type
    
    case "l":
      var img = lImg;
      this.squares = [ new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y, img) ];
        
      this.rotateCW = function () {
        kbd.up = false;
        if (this.stage === 0) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x === deadSquares[i][j].x &&
                  this.squares[0].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[1].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y === deadSquares[i][j].y ||
                  this.squares[2].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[2].y - GRID_SIZE * 2 === deadSquares[i][j].y ||
                  this.squares[3].x === deadSquares[i][j].x &&
                  this.squares[3].y - GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[0].y += GRID_SIZE;
          this.squares[1].x -= GRID_SIZE;
          this.squares[2].x += GRID_SIZE;
          this.squares[2].y -= GRID_SIZE * 2;
          this.squares[3].y -= GRID_SIZE;
          this.stage = 1;
        }
        else if (this.stage === 1) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y - GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[2].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[2].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[3].x + GRID_SIZE * 2 === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[2].x + GRID_SIZE >= canvas.width) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0].x -= GRID_SIZE;
          this.squares[0].y -= GRID_SIZE;
          this.squares[2].x += GRID_SIZE;
          this.squares[2].y += GRID_SIZE;
          this.squares[3].x += GRID_SIZE * 2;
          this.stage = 2;
        }
        else if (this.stage === 2) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y === deadSquares[i][j].y ||
                  this.squares[1].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[2].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[2].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[3].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[0].x += GRID_SIZE;
          this.squares[1].x += GRID_SIZE;
          this.squares[1].y += GRID_SIZE;
          this.squares[2].x -= GRID_SIZE;
          this.squares[2].y += GRID_SIZE;
          this.squares[3].x -= GRID_SIZE;
          this.stage = 3;
        }
        else if (this.stage === 3) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y === deadSquares[i][j].y ||
                  this.squares[0].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[0].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[0].x - GRID_SIZE < 0) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0] = new Square(this.squares[0].x, 
                            this.squares[0].y, img);
          this.squares[1] = new Square(this.squares[0].x + GRID_SIZE, 
                            this.squares[0].y, img);
          this.squares[2] = new Square(this.squares[0].x - GRID_SIZE, 
                            this.squares[0].y + GRID_SIZE, img);
          this.squares[3] = new Square(this.squares[0].x - GRID_SIZE, 
                            this.squares[0].y, img);
          this.stage = 0;
        }
      }; // end l rotateCW func

      this.rotateCCW = function () {
        kbd.up = false;
        this.rotateCW();
      } 
    break;  // end l type
    
    case "j":
      var img = jImg;
      this.squares = [ new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y, img) ];
        
      this.rotateCW = function () {
        kbd.up = false;
        if (this.stage === 0) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x === deadSquares[i][j].x &&
                  this.squares[0].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[1].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y === deadSquares[i][j].y ||
                  this.squares[2].x - GRID_SIZE * 2 === deadSquares[i][j].x &&
                  this.squares[2].y === deadSquares[i][j].y ||
                  this.squares[3].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y - GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[0].y += GRID_SIZE;
          this.squares[1].x -= GRID_SIZE;
          this.squares[2].x -= GRID_SIZE * 2;
          this.squares[3].x += GRID_SIZE;
          this.squares[3].y -= GRID_SIZE;
          this.stage = 1;
        }
        else if (this.stage === 1) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y - GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[1].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y === deadSquares[i][j].y ||
                  this.squares[2].x === deadSquares[i][j].x &&
                  this.squares[2].y - GRID_SIZE * 2 === deadSquares[i][j].y ||
                  this.squares[3].x === deadSquares[i][j].x &&
                  this.squares[3].y + GRID_SIZE === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[1].x + GRID_SIZE >= canvas.width) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0].x -= GRID_SIZE;
          this.squares[0].y -= GRID_SIZE;
          this.squares[1].x += GRID_SIZE;
          this.squares[2].y -= GRID_SIZE * 2;
          this.squares[3].y += GRID_SIZE;
          this.stage = 2;
        }
        else if (this.stage === 2) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[0].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[1].x === deadSquares[i][j].x &&
                  this.squares[1].y - GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[2].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[2].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[0].x += GRID_SIZE;
          this.squares[0].y += GRID_SIZE;
          this.squares[1].y -= GRID_SIZE;
          this.squares[2].x += GRID_SIZE;
          this.stage = 3;
        }
        else if (this.stage === 3) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[3].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y ||
                  this.squares[3].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[3].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[3].x - GRID_SIZE < 0) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0] = new Square(this.squares[3].x, 
                            this.squares[3].y, img);
          this.squares[1] = new Square(this.squares[3].x + GRID_SIZE, 
                            this.squares[3].y, img);
          this.squares[2] = new Square(this.squares[3].x + GRID_SIZE, 
                            this.squares[3].y + GRID_SIZE, img);
          this.squares[3] = new Square(this.squares[3].x - GRID_SIZE, 
                            this.squares[3].y, img);
          this.stage = 0;
        }
      }; // end j rotate CW func

      this.rotateCCW = function () {
        kbd.up = false;
        this.rotateCW();
      } 
    break;  // end j type
    
    case "z":
      var img = zImg;
      this.squares = [ new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y + GRID_SIZE, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y, img) ];
        
      this.rotateCW = function () {
        kbd.up = false;
        if (this.stage === 0) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[3].x + GRID_SIZE * 2 === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y ||
                  this.squares[2].x === deadSquares[i][j].x &&
                  this.squares[2].y - GRID_SIZE * 2 === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // tests passed, do the rotation
          this.squares[3].x += GRID_SIZE * 2;   
          this.squares[2].y -= GRID_SIZE * 2;
          this.stage = 1; 
        }
        else if (this.stage === 1) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[3].x - GRID_SIZE * 2 === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y ||
                  this.squares[2].x === deadSquares[i][j].x &&
                  this.squares[2].y + GRID_SIZE * 2 === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[3].x - GRID_SIZE * 2 < 0) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[3].x -= GRID_SIZE * 2;   
          this.squares[2].y += GRID_SIZE * 2;
          this.stage = 0;
        }
      }; // end z rotateCW func

      this.rotateCCW = function () {
        kbd.up = false;
        this.rotateCW();
      } 
    break;  // end z type
    
    case "rod":
      var img = rodImg;
      this.squares = [ new Square(INIT_X, INIT_Y, img), 
        new Square(INIT_X - GRID_SIZE, INIT_Y, img), 
        new Square(INIT_X - GRID_SIZE * 2, INIT_Y, img), 
        new Square(INIT_X + GRID_SIZE, INIT_Y, img) ];
        
      this.rotateCW = function () {
        kbd.up = false;
        if (this.stage === 0) {
          
          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[1].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y + GRID_SIZE * 2 === deadSquares[i][j].y ||
                  this.squares[2].x + GRID_SIZE * 2 === deadSquares[i][j].x &&
                  this.squares[2].y + GRID_SIZE === deadSquares[i][j].y ) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[1].y + GRID_SIZE * 2 >= canvas.height) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0].y -= GRID_SIZE;
          this.squares[1].x += GRID_SIZE;
          this.squares[1].y += GRID_SIZE * 2;
          this.squares[2].x += GRID_SIZE * 2;
          this.squares[2].y += GRID_SIZE;
          this.squares[3].x -= GRID_SIZE;
          this.stage = 1; 
        }
        else if (this.stage === 1) {

          // collision check
          for (var i = 0; i < deadSquares.length; i++) {
            for (var j = 0; j < deadSquares[i].length; j++) {
              if (this.squares[0].x === deadSquares[i][j].x &&
                  this.squares[0].y + GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[1].x - GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[1].y - GRID_SIZE * 2 === deadSquares[i][j].y ||
                  this.squares[2].x - GRID_SIZE * 2 === deadSquares[i][j].x &&
                  this.squares[2].y - GRID_SIZE === deadSquares[i][j].y ||
                  this.squares[3].x + GRID_SIZE === deadSquares[i][j].x &&
                  this.squares[3].y === deadSquares[i][j].y) {
                return;
              }
            }
          }
          
          // prevent going off the edges
          if (this.squares[2].x - GRID_SIZE * 2 < 0 ||
              this.squares[3].x + GRID_SIZE >= canvas.width) {
            return;
          }
          
          // tests passed, do the rotation
          this.squares[0].y += GRID_SIZE;
          this.squares[1].x -= GRID_SIZE;
          this.squares[1].y -= GRID_SIZE * 2;
          this.squares[2].x -= GRID_SIZE * 2;
          this.squares[2].y -= GRID_SIZE;
          this.squares[3].x += GRID_SIZE;
          this.stage = 0;
        }
      }; // end rod rotateCW func

      this.rotateCCW = function () {
        kbd.up = false;
        this.rotateCW();
      }
    break;  // end rod type
  } // end type switch
}; // end Block class

// initialize a game
function init() {
  deadSquares = [];
  for (var i = 0; i < canvas.height / GRID_SIZE; i++) {
    deadSquares[i] = [];
  }
  nextBlock = new Block(getPattern());
  newActiveBlock();
  stepSpeed = INIT_STEP_SPEED;
  score = 0;
  level = 1;
  levelCounter = 0;
}

// returns a pattern for making a tetris block
function getPattern() {
  var choice = Math.floor(Math.random() * 7);
  switch (choice) {
    case 0: return "rod";
    case 1: return "square";
    case 2: return "l";
    case 3: return "z";
    case 4: return "s";
    case 5: return "notch";
    case 6: return "j";
  }
}

// generates a new activeBlock and nextBlock and checks for end of game
function newActiveBlock() {
  activeBlock = new Block(nextBlock.type);
  nextBlock = new Block(getPattern());
  if (isGameOver()) {
      
    // update bestScore
    if (score > bestScore) bestScore = score;
    
    start();
  }
}

// check if any dead squares are at the top of the screen
function isGameOver() {
  return deadSquares[0].length > 0;
}

// checks for filled rows, collapses them and returns a count
function checkCollapse() {
  var lines = 0;
  
  for (var i = 0; i < deadSquares.length; i++) {
    if (deadSquares[i].length >= GRID_SIZE / 2) {
      collapseRow(i);
      lines++;
      levelHandler();
    }
  }
  return lines
}

// increments level and handles speed increases, call on each line clear
function levelHandler() {
  levelCounter++;
  
  if (levelCounter === 10) {
    increaseSpeed();
    levelCounter = 0;
    level++;
  }
}

// removes a filled row and shifts rows above it downward
function collapseRow(row) {
  
  //debug:
  //console.log("called collapserow()");

  rowAsGrid = (row + 1) * GRID_SIZE;

  // shift all block y coordinates above the row
  for (var i = row; i > 0; i--) {
    for (var j = 0; j < deadSquares[i].length; j++) {
      deadSquares[i][j].y += GRID_SIZE;
    }
  }
  
  // shift rows downward
  for (var i = row; i > 0; i--) {
    deadSquares[i] = deadSquares[i - 1];
  }
  
  // this seems to prevent a bug where the column was overflowing
  // during a call to dropActiveBlock() (and possibly during
  // normal calls to collapseRow)
  deadSquares[0] = [];
}  

// detects collisions where an activeBlock should be killed
function collision() {
    
  // check if active block touched a dead square
  for (var i = 0; i < activeBlock.size; i++) {
    for (var j = 0; j < deadSquares.length; j++) {
      for (var k = 0; k < deadSquares[j].length; k++) {
        if (activeBlock.squares[i].y === 
            deadSquares[j][k].y - GRID_SIZE &&
            activeBlock.squares[i].x === deadSquares[j][k].x) {
          killBlock(activeBlock);
          return true;
        }
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

// updates score based on number of lines cleared
function scoreUpdate(lines) {
  switch (lines) {
    case 1: score += 40 * level;   break;
    case 2: score += 100 * level;  break;
    case 3: score += 300 * level;  break;
    case 4: score += 1200 * level; break;
  }
}

// turns activeBlock's squares into deadSquares
function killBlock(block) {
  
  // add squares from dying block to deadSquares array
  for (var i = 0; i < block.size; i++) {
    deadSquares[Math.abs(block.squares[i].y / GRID_SIZE)]
               .push(block.squares[i]);
  }

  newActiveBlock();
}

// render active block on screen
function drawActiveBlock() {
  for (var i = 0; i < activeBlock.size; i++) {
    ctx.beginPath();
    ctx.drawImage(activeBlock.squares[i].img, 
    activeBlock.squares[i].x, activeBlock.squares[i].y);
    ctx.closePath();
  }     
}

// render dead squares on screen
function drawDeadSquares() {
  for (var i = 0; i < deadSquares.length; i++) {
    for (var j = 0; j < deadSquares[i].length; j++) { 
      ctx.beginPath();
      ctx.drawImage(deadSquares[i][j].img, 
      deadSquares[i][j].x, deadSquares[i][j].y);
      ctx.closePath(); 
    }
  }
}

// draws the next block in the sidebar
function drawNextBlock() {
  sidebarCtx.beginPath();
  for (var i = 0; i < nextBlock.size; i++) {
    sidebarCtx.drawImage(nextBlock.squares[i].img, 
    nextBlock.squares[i].x - GRID_SIZE * 2, 
    nextBlock.squares[i].y + GRID_SIZE * 2);
  }     
  sidebarCtx.closePath();
}

// draws scores to the screen
function drawScores() {
  document.getElementById("out").innerHTML = "Score: " + score +
    "<br>Level: " + level + "<br>Best : " + bestScore;
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
  
  // lets browser set fps
  requestAnimationFrame(update);
  
  // clear canvases
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sidebarCtx.clearRect(0, 0, sidebar.width, sidebar.height);
  
  // check rotations
  if (kbd.up) activeBlock.rotateCW();
  
  // check for drops
  if (kbd.down) dropActiveBlock();
  else activeBlock.move();
  
  // count lines collapsed and update the score with that number
  scoreUpdate(checkCollapse());
  
  // redraw stuff
  drawActiveBlock();
  drawDeadSquares();
  drawNextBlock();
  drawScores();
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
  while (!collision()) {
    for (var i = 0; i < activeBlock.size; i++) {
      activeBlock.squares[i].y += GRID_SIZE;
    }
  }
  kbd.down = false;
}

// speeds the game up
function increaseSpeed() {
  stepSpeed -= STEP_AMOUNT;
  clearInterval(stepInterval);
  stepInterval = setInterval(moveDown, stepSpeed);
}

// start game
function start() {
  init();
  clearInterval(stepInterval);
  clearInterval(frameInterval);
  
  /* Main timers with update function and 
     interval duration as parameters */
  stepInterval = setInterval(moveDown, stepSpeed);
  //frameInterval = setInterval(update, FRAMERATE);
  update();
}

start(); // go!
