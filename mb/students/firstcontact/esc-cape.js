/**
 * Esc-cape
 *
 * A platformer game by Faisal with Aaron and Eric
 *
 */

// Constants
const GRAVITY = 1;
const MAX_SPEED = 15;
const PLAYER_SIZE = 30;

// Global variables
var player;
var platforms;
var doors;
var spikes;
var currentLevel;

// Game object for drawing on the canvas
var game = {
    canvas : document.createElement("canvas"),
    start : function () {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0].childNodes[0]);
        this.interval = setInterval(update, 1000 / 60);
    },
    
    // Clears canvas
    clear : function () {
		this.context.globalAlpha = 1;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.context.drawImage(eval('L' + currentLevel + 'BG'), 0, 0, this.canvas.width, this.canvas.height);

    }
}; // End Game object

var ctx = game.context;

// Keyboard handler
var kbd = {
    up: false,
    down: false,
    left: false,
    right: false,
    p: true,
    isAllowed: true // determine whether kbd input is allowed
};

// Add keyevent listeners to track arrow key actions
document.addEventListener("keydown", function (e) {
    if (e.keyCode === 39 || e.keyCode === 68) {
        kbd.right = true;
    }
    else if (kbd.isAllowed && (e.keyCode === 38 || 
             e.keyCode === 87 || e.keyCode === 32)) {
        kbd.up = true;
    }
    else if (e.keyCode === 37 || e.keyCode === 65) {
        kbd.left = true;
    }
    else if (e.keyCode === 40 || e.keyCode === 83) {
        kbd.down = true;
    }
    else if (e.keyCode === 80) {
        kbd.p = true;
    }
}, false);

document.addEventListener("keyup", function (e) {
    if (e.keyCode === 39 || e.keyCode === 68) {
        kbd.right = false;
    }
    else if (e.keyCode === 38 || e.keyCode === 87 || e.keyCode === 32) {
        kbd.isAllowed = true;
        kbd.up = false;
    }
    else if (e.keyCode === 37 || e.keyCode === 65) {
        kbd.left = false;
    }
    else if (e.keyCode === 40 || e.keyCode === 83) {
        kbd.down = false;
    }
    else if (e.keyCode === 80) {
        kbd.p = false;
    }
}, false);

//clearInterval(game.interval);
//ctx.drawImage(titleBG, 0, 0);
//setTimeout(function() {
//  game.interval = setInterval(update, 1000 / 60);
//  loadLevel(LEVELS[currentLevel]);
//}), 5000);


// Loads a new level
function loadLevel(level) {

//    level = JSON.parse(JSON.stringify(level));
    
    // Set the game's player, platforms and doors to the
    // level's stored values for these pieces of data. 
    playerX = level.playerX;
    playerY = level.playerY;
    player = new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", playerX, playerY);
    platforms = level.platforms;
    doors = level.doors;
	spikes = level.spikes;
} // end loadLevel


/**
 * Represents a platform with a width, height, 
 * x and y coordinate for the top left corner, and color
 */
var Platform = function(width, height, x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.height = height;
    this.width = width;
    
    // Renders the platform to the screen
    this.draw = function() {
        ctx = game.context;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
} // end Platform


/**
 * Represents a door with a width, height, 
 * x and y coordinate for the top left corner, and color
 */
function Door(width, height, x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.height = height;
    this.width = width;
    
    // Renders the door to the screen
    this.draw = function() {
        ctx = game.context;
        ctx.drawImage(doorImg, this.x, this.y, this.width, this.height);
    }
} // end Door

/**
 * Represents a spike with a width, height, 
 * x and y coordinate for the top left corner, and color
 */
function Spike(width, height, x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.height = height;
    this.width = width;
    
    // Renders the spike to the screen
    this.draw = function() {
        ctx = game.context;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
} // end Spike


/**
 * Represents a Player, which has a width, height, color, x and y position
 * and the ability to move, jump, stand on platforms, etc.
 */
function Player(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.color = color;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.landed = false;
    //this.frame = frame;
    //this.imgs = imgs;
    
    // Handles keyboard input and collisions on the player 
    // and updates its position accordingly
    this.move = function() {
        
        // log the keyboard for debugging
        //console.log(kbd.isAllowed);
        
        // Check if jump button is pressed
        if (kbd.up && this.landed && kbd.isAllowed) {
            this.landed = false;
            kbd.isAllowed = false;
            this.speedY = -15;
        }
        
        // Accumulate gravity if airborne and moving less than max speed
        if (!this.landed && Math.abs(this.speedY) <= MAX_SPEED) {
            this.speedY += GRAVITY;
        }
        
        // If the keyboard is pressed left or right, move the player in that direction
        if (kbd.left) {
            this.speedX = -5;
            
        }
        else if (kbd.right) {
            this.speedX = 5;
        }
        // Set speed to 0 if no controllers are pressed and player is landed
        // This allows velocity to be retained while airborne
        else if (this.landed) {
            this.speedX = 0;
        }
        
        // Add the velocity to the player's x/y position
        this.y += this.speedY;
        this.x += this.speedX;

        // Check for collisions
        this.collisionDetect();
    } // end move
    
    // Checks for collisions between player and various obstacles
    this.collisionDetect = function() {
	    
	//door === player
        
        // Rewrite similar to Spikes to have multiple functional doors
        if (collide(doors[0], player) !== 'none') {
            loadLevel(LEVELS[(++currentLevel) % LEVELS.length]);
        }
        
        // Create a variable that allows us to adjust behavior 
        // depending on whether a collision occurs on this frame.
        // Let's assume no collision happens until proven otherwise.
        var collided = false; 

        // Check for collision with right side of screen
        if (this.x + this.width >= game.canvas.width) {
            collided = true; 
            this.x = game.canvas.width - this.width;
        }
        // Check for collision with left side of screen
        if (this.x <= 0) {
            collided = true; 
            this.x = 0;
        }
        // Check for collision with top of screen
        if (this.y <= 0) {
            collided = true; 
            this.y = 0;
        }       
        // Check for colliding with bottom of screen
        if (this.y + this.height >= game.canvas.height ) {
            collided = true; 
           
            // Set landed to true and speedY to 0
            this.landed = true;
            this.speedY = 0;
            
            // Set player's y location to the bottom of the screen
            this.y = game.canvas.height - this.height;
        }
        
        spikes.forEach (function (spike) {
            if (collide(spike, player) !== 'none') {
                clearInterval(game.interval);
                ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
                // Replace with Game Over image instead of testBG
                ctx.drawImage(testBG, 0, 0);

                ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
                setTimeout(function() {
                    game.interval = setInterval(update, 1000 / 60);
                    loadLevel(LEVELS[currentLevel]);
                }, 1000);
            }
        });
        
        // Check for collision with platforms
        for (var i = 0; i < platforms.length; i++) {
            
            // Save current platform in a simpler name
            var plat = platforms[i];
            
            // Find out if there has been a collision with this platform and the player
            var collision = collide(this, plat);
            
            // Do we have a collision?
            if (collision !== 'none') {
                collided = true;
                
                // Handle the collision result
                if (collision === 'top') {
                    this.y = plat.y - this.height;
                    this.speedY = 0;
                    this.landed = true;
                }
                else if (collision === 'right') {
                    this.x = plat.x + plat.width;
                }
                else if (collision === 'left') {
                    this.x = plat.x - this.width;
                }
                else if (collision === 'bottom') {
                    this.y = plat.y + plat.height;                
                    this.speedY = 0;
                }
            }            
        }
        if (!collided && this.landed) {
            this.speedY = GRAVITY * 3;
            this.landed = false;
        }
    }; // end collisionDetect
        
    // Draw the player to screen
    this.draw = function() {
        ctx = game.context;
        
        if (!this.landed) {
            
            if (this.frameNum++ % 2 === 0) {
                ctx.drawImage(playerJump1, this.x, this.y);
            }
            else {
                ctx.drawImage(playerJump2, this.x, this.y);
            }
        }
        
        else if (kbd.left) {
            if (this.frameNum++ % 2 === 0) {
                ctx.drawImage(playerLeft1, this.x, this.y);
            }
            else {
                ctx.drawImage(playerLeft2, this.x, this.y);
            }
        }
        
        else if (kbd.right) {
            ctx.drawImage(playerRight1, this.x, this.y);   
        }
        
        else {
            ctx.drawImage(playerStanding, this.x, this.y);
        }
    }
} // end Player


// Determines which side of a rectangle a collision is occurring on
// http://stackoverflow.com/questions/29861096/detect-which-side-of-a-rectangle-is-colliding-with-another-rectangle
function collide(r1, r2) {
    
    // Find the x and y distance between the centers of the two rectangles
    var dx = (r1.x + r1.width / 2) - (r2.x + r2.width / 2);
    var dy = (r1.y + r1.height / 2) - (r2.y + r2.height / 2);
    
    // Add the widths and heights and divide by two
    var width = (r1.width + r2.width) / 2;
    var height = (r1.height + r2.height) / 2;
    
    // Multiply the distance by the dimensions to find amounts of overlap
    var crossWidth = width * dy;
    var crossHeight = height * dx;
    
    // Assume no collision
    var collision = 'none';
    
    // Determine if a collision occured based on the distances
    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
        
        // A collision has occurred--deteremine which side is making the most contact
        if (crossWidth > crossHeight) {
            collision = (crossWidth > -crossHeight) ? 'bottom' : 'left';
        }
        else {
            collision = (crossWidth > -crossHeight) ? 'right' : 'top';
        }
    }
    return collision;
} // end collide


// Callback function for updating gamestate every frame
function update() {
    
    // Clears screen of previous frames
    game.clear();
    
    // Pausing the Game - Refactor using functions
	if (kbd.p) {
		console.log("Paused");
		kbd.p = false;
		
		clearInterval(game.interval);
		
		// Creates Visible Pause Screen
		game.context.font = "50px Arial";
		game.context.fillStyle = "orange";
		game.context.textAlign = "center";
		game.context.fillText("Press P to begin", game.canvas.width / 2, game.canvas.height / 2);
		game.context.font = "20px Comic Sans MS";
		game.context.fillText("OBJECTIVE: Find the alien!", game.canvas.width / 2, game.canvas.height / 2 + 40);
		game.context.font = "15px Comic Sans MS";
		//game.context.fillText("(In development)", game.canvas.width / 2, game.canvas.height / 2 + 60);
		game.context.globalAlpha = 0.5;
		game.context.fillStyle = "#004487";
		//game.context.fillRect(0,0,480,270);
		
		// wait for pause button to be pressed again
		var w = setInterval (function() {
			if (kbd.p) {
				kbd.p = false;
				clearInterval(w);
				game.interval = setInterval (update, 20);
				console.log("Unpaused");
			}
		}, 20);
	}
    
    // Move stuff
	player.move();
    
    // draw images
    player.draw();
    
    // Draw doors--forEach calls the draw() method of each door in the array
    doors.forEach(function(door) { 
        door.draw(); 
    });
    
    // Draw platforms
    platforms.forEach(function(p) { 
        p.draw(); 
    });
    
	// Draw spikes
    spikes.forEach(function(s) { 
        s.draw(); 
    });
} // end update


// Starts a new game from scratch
function init() {
    currentLevel = 0;
    game.start(); // canvas not created until this function is called
    
    let ctx = game.canvas.getContext("2d");
    
    clearInterval(game.interval);
    ctx.drawImage(testTitle, 0, 0);
    
    setTimeout(function() {
        game.interval = setInterval(update, 1000 / 60);
        loadLevel(LEVELS[currentLevel]);
    }, 1000);
} // end init
