/* Things renamed:
 * - myGameCanvas = game
 * - myGamePiece = player
 */

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "";

// Creates Game Canvas with properties
var game = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    
    // Clears canvas
    clear : function () {
		this.context.globalAlpha = 1;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.drawImage(bgImage, 0, 0, this.canvas.width, this.canvas.height);
    }
}; // End Game object

// Keyboard handler
var kbd = function () {
  this.up = false;
  this.p = true;
};

// add keyevent listener to track arrow key actions
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    kbd.right = true;
  }
  else if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
    kbd.up = true;
  }
  else if (e.keyCode === 37 || e.keyCode === 65) {
    kbd.left = true;
  }
  else if (e.keyCode === 80) {
    kbd.p = true;
  }
}, false);

document.addEventListener("keyup", function (e) {
  if (e) {
    kbd.up = kbd.left = kbd.right = kbd.p = false;
  }
}, false);

game.start(); // canvas not created until this function is called    

// Constants
var ROCK_BOTTOM = game.canvas.height;
var GRID_SIZE = 10;

//Base Platform Height and Width
var PLATFORM_HEIGHT = 10;
var PLATFORM_WIDTH = 100;

var MAX_PLAT_HEIGHT = 0;
var MIN_PLAT_HEIGHT = game.canvas.height - PLATFORM_HEIGHT;

var MAX_PLAT_WIDTH = 75;
var MIN_PLAT_WIDTH = 125;

var PLATFORM_SPEED = 3;

// Initialization X and Y coordinates
var INIT_X = game.canvas.width;
var INIT_Y = game.canvas.height - PLATFORM_HEIGHT;
var MIN_PLAT_Y = 160;
var MAX_PLAT_Y = 220;

var NUM_PLATFORMS = 1;

// Global variables
var player;
var platforms = [];
var count;

// load images
var playerImg = new Image();
playerImg.src = "imgs/Joker.png";

var platformImg = new Image();
platformImg.src = "imgs/platform1.png";

var platform2Img = new Image();
platformImg.src = "imgs/platform2.png";

var numScore = 0;
var highScore = 0;

// Platform class
var Platform = function (x, y, height, width, color) {   
    this.x = x;
    this.y = y;
    this.color = color;
    this.height = height;
    this.width = width;
    
    // Different X speeds could be implemented for different platforms
    this.dx = -PLATFORM_SPEED;
    
    this.move = function () {
    
        // Check if platform crossed left side of screen
        if (this.x + this.width < 0) {
            // Find the index of this platform
            var index = platforms.indexOf(this);
            
            // Check for index out of bounds
            if (index > -1) {
                
                // Remove this object from platforms array
                platforms.splice(index, 1);
            }
        }
		
		// Check if platform crossed middle of screen
		else if (this.x + this.width <= game.canvas.width / 1.25 &&
				this.x + this.width >= game.canvas.width / 1.25 - 2 &&
				platforms.length <= 2) {
			// Push (add) a new platform to the bldgs array
                 this.x += this.dx;
				 platforms.push(makeNewPlatform());
		}
        
        else this.x += this.dx;

    };
    
    // redraws the Platform to the screen
    this.update = function() {
        ctx = game.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(platformImg, this.x, this.y, this.width, this.height);
    }

};

// initializes a new game
function startGame() {

    // update high score if necessary
    if (numScore > highScore) {
        highScore = numScore;
    }
	
    // reset score
    numScore = 0;

    // pause the game
    kbd.p = true;
    
	// TO-DO: Create constants for number values
	platforms = [new Platform(100, 220, PLATFORM_HEIGHT + 5, PLATFORM_WIDTH * 3, "brown")];
	
    // width, height, color, x, y
	// TO-DO: Create constants for number values
    player = new Player(30, 30, "red", 50, 120);
	
	drawScore();
}

// generates a new Platform
function makeNewPlatform (height) {
    // x, y, height, width, color
	var PLAT_Y = rand(MIN_PLAT_Y, MAX_PLAT_Y);
    return new Platform(INIT_X, PLAT_Y, PLATFORM_HEIGHT, PLATFORM_WIDTH, "green");
};

// Player class
function Player(width, height, color, x, y) {
    this.landed = false;
    this.jumping = false;
    this.jumpCounter = 0;
    this.width = width;
    this.height = height;
    this.speedY = 0;
    this.gravity = 5;
    this.x = x;
    this.y = y;
    
    // Draw the player to screen
    this.update = function() {
        ctx = game.context;
		ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(playerImg, this.x, this.y, this.width, this.height);
    }
    
    // Repositions the player for this frame
    this.move = function() {
        
        // Speed without pressing keys
        this.speedX = 0;
        this.speedY = 0;
		
        // Check if jump button is pressed
        if (kbd.up && this.landed) {
            this.jumping = true;
            this.landed = false;
        }
        
        // Smooth jumping
        if (this.jumping) {
            this.y += -30;
            this.jumpCounter++;
        }
        
        // reset jump if we're at top of jump
        if (this.jumpCounter === 7) {
            this.jumping = false;
            this.jumpCounter = 0;
        }

        this.speedY += this.gravity;
        //this.x += this.speedX;
        
        this.y += this.speedY;
        this.collisionDetect();
    }
    
    // Checks collisions between player and ground/platforms
    this.collisionDetect = function() {
		
        
		for (var i = 0; i < platforms.length; i++) {
			var platform = platforms[i];
            
			// check for platform contact
			if (this.x >= platform.x - this.width
				&& this.x <= platform.x + platform.width
				&& this.y >= platform.y - this.height
				&& this.y <= platform.y) {
				
				if (this.y + this.height <= platform.y + platform.height) {
					this.y = platform.y - this.height;
                    
                    // if landed is false, the player is making first 
                    // contact with this platform
                    if (!this.landed) {
                        numScore++;
                    }
                    
					this.landed = true;
				}
				
				// Platform pushes player
				else if (this.x + this.width <= platform.x + PLATFORM_SPEED) {
					// Reset game
					if (this.x <= 0) {
                        
						startGame();
					}
					
					this.jumping = false;
					this.x = platform.x - this.width;
				}
				
				else {
					this.jumping = false;
					this.y = platform.y + platform.height;
				}
				
			}			
		}
        
        // check for colliding with bottom of screen
        if (this.y >= game.canvas.height - this.height - 10) {
            this.y = game.canvas.height - this.height - 10;
            startGame();
        }
    }
}

// Called multiple times
function updateGameArea() {    

    // Clears screen of previous frames
    game.clear();
	
	// Refactor using functions
	if (kbd.p) {
		console.log("Paused");
		kbd.p = false;
		
		clearInterval(game.interval);
		
		// Creates Visible Pause Screen
		game.context.font = "50px Arial";
		game.context.fillStyle = "black";
		game.context.textAlign = "center";
		game.context.fillText("Game Paused", game.canvas.width / 2, game.canvas.height / 2);
		game.context.font = "20px Comic Sans MS";
		game.context.fillText("Press P to continue", game.canvas.width / 2, game.canvas.height / 2 + 30);
		game.context.font = "15px Comic Sans MS";
		game.context.fillText("(In development)", game.canvas.width / 2, game.canvas.height / 2 + 60);
		game.context.globalAlpha = 0.5;
		game.context.fillStyle = "#004487";
		game.context.fillRect(0,0,480,270);
		
		// wait for pause button to be pressed again
		var w = setInterval (function() {
			if (kbd.up || kbd.p) {
				kbd.up = kbd.p = false;
				clearInterval(w);
				game.interval = setInterval (updateGameArea, 20);
				console.log("Unpaused");
			}
		}, 20);
	}
	
	// Move stuff
	player.move();

	for (var i = 0; i < platforms.length; i++) {
		platforms[i].move();
	}

	// Draw images
	player.update();

	for (var i = 0; i < platforms.length; i++) {
		platforms[i].update();
	}
	
	drawScore();
}

// Generates a random integer between two bounds
function rand(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
}

function drawScore () {
	game.context.fillStyle = "black";
	game.context.globalAlpha = 1;
	game.context.fillText("Score : " + numScore, game.canvas.width - 110, game.canvas.height - 250);
	
	game.context.fillStyle = "black";
	game.context.globalAlpha = 1;
	game.context.fillText("High Score : " + highScore, game.canvas.width - 96, game.canvas.height - 230);
}
