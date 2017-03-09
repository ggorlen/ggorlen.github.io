/* Walking: sprite animation demo in canvas.
 * There are plenty of ways to improve this;
 * just a basic concept! 
 */

// create canvas object and context
var canvas = document.getElementById("walkingcanvas");
var ctx = canvas.getContext("2d");

// declare constants
var FRAMERATE = 80;
var PERSON_WIDTH = 7;
var PERSON_HEIGHT = 20;
var STEP_SIZE = 5;
var INIT_FRAME = 0;
var INIT_X = canvas.width / 2;
var INIT_Y = canvas.height - PERSON_HEIGHT;
var PLAYER_IMAGE_FILES = [ "standing.png", "left1.png", 
                           "left2.png", "left3.png", 
                           "left4.png", "right1.png", 
                           "right2.png", "right3.png", 
                           "right4.png" ];

// declare variables
var player;

// person class
var Person = function (x, y, frame, imgs) {
  this.x = x;
  this.y = y;
  this.frame = frame;
  this.imgs = imgs;
  
  // update the person's position and frame
  this.move = function () {
      
    // check for screen wrap
    if (this.x > canvas.width) {
      this.x = 0;
    }
    else if (this.x < 0) {
      this.x = canvas.width;
    }
      
    // increment person's frame
    this.frame++;
    
    if (kbd.left) {
      
      // decrement person's x position
      this.x -= STEP_SIZE;
      
      // check to see if we need to reset person's frame
      if (this.frame >= 4 || this.frame < 1) {
        this.frame = 1;
      }
    }
    else if (kbd.right) {
      
      // increment person's x position
      this.x += STEP_SIZE;
      
      // check to see if we need to reset person's frame
      if (this.frame >= 7 || this.frame < 5) {
        this.frame = 5;
      }
    }
    else { // no keyboard input; person is standing
      this.frame = 0;
    }
  };
  
  // redraw person to the canvas
  this.draw = function () {
    ctx.drawImage(this.imgs[this.frame], this.x, this.y);
  };
};

// keyboard handler
var kbd = {
  left  : false,
  right : false
};

// keyevent listeners to track arrow key actions
document.addEventListener("keydown", function (e) {
  if (e.keyCode === 39 || e.keyCode === 68) {
    kbd.right = true;
  }
  else if (e.keyCode === 37 || e.keyCode === 65) {
    kbd.left = true;
  }
}, false);

document.addEventListener("keyup", function (e) {
  if (e) {
    kbd.left = kbd.right = false;
  }
}, false);

// initialization function
function init() {

  // load images from file and put them into an array
  var personImgs = [];

  for (var i = 0; i < PLAYER_IMAGE_FILES.length; i++) {
      var pImg = new Image();
      pImg.src = PLAYER_IMAGE_FILES[i];
      personImgs.push(pImg);
  }
  
  // create a new player
  player = new Person(INIT_X, INIT_Y, INIT_FRAME, personImgs);
  
  // start the animation
  setInterval(update, FRAMERATE);
}

// callback function for animating each frame
var update = function () {
    
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // move and redraw player
  player.move();
  player.draw();
};
