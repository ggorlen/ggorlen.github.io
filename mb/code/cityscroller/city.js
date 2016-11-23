/* City Scroller 
 *
 * Todos:
 * - make speed adjustable with user input
 * - handle distance more realistically
 * - add building windows/images/more interesting landscapes/cars
 */

// Creates canvas object with properties
var game = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = this.canvas.width / 2;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }, 
    
    // Clears canvas
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}; // end Game object

game.start(); // Canvas not created until this function is called    

// Constants
var NUM_BLDGS = 10;
var MIN_BLDG_SPEED = 2;
var MAX_BLDG_SPEED = 6;
var MIN_BLDG_HEIGHT = 40;
var MAX_BLDG_HEIGHT = game.canvas.height - 20;
var MIN_BLDG_WIDTH = 40;
var MAX_BLDG_WIDTH = MIN_BLDG_WIDTH * 2;

// Global variables
var bldgs = [];

// Building class
var Building = function (x, y, height, width, speed, color) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.speed = speed;
    this.color = color;
    
    // Updates the position of this building
    this.move = function () {
    
        // Check if platform crossed left side of screen
        if (this.x + this.width < 0) {
            
            // Find the index of this building
            var index = bldgs.indexOf(this);
            
            // Check for index out of bounds
            if (index > -1) {
                
                // Remove this object from bldgs array
                bldgs.splice(index, 1);
                
                // Push (add) a new building to the bldgs array
                bldgs.push(makeBuilding());
            }
        }
        else this.x += this.speed;  // Update building position
    };
    
    // Draws the Building to the screen
    this.draw = function() {
        ctx = game.context;
        
        // Draw a filled rectangle
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Draw an outline around the rectangle
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.closePath();
    }
};

// Initializes a new landscape
function start() {
    
    // Populate the bldgs array
    for (var i = 0; i < NUM_BLDGS; i++) {
        bldgs.push(makeBuilding());
    }
    
    // Begin animation
    requestAnimationFrame(update); 
}

// Generates a new Building
function makeBuilding() {
    var height = rand(MIN_BLDG_HEIGHT, MAX_BLDG_HEIGHT); 
    var width = rand(MIN_BLDG_WIDTH, MAX_BLDG_WIDTH); 
    var color = randColor();
    
    /* Generate a float rather than an int for the speed 
     * variable to ensure no overlapping buildings */
    var speed = Math.random() * (MAX_BLDG_SPEED - MIN_BLDG_SPEED) + MIN_BLDG_SPEED;
    
    return new Building(game.canvas.width, 
        game.canvas.height - height, height, width, -speed, color);
}

// Generates a random integer between two bounds
function rand(lo, hi) {
    return Math.floor(Math.random() * (hi - lo)) + lo;
}

// Generates a random color hexadecimal string
function randColor() {
    var color = "#";
    for (var i = 0; i < 6; i++) {
        var candidate = rand(0, 16);
        switch (candidate) {
            case 10: candidate = "a";
            case 11: candidate = "b";
            case 12: candidate = "c";
            case 13: candidate = "d";
            case 14: candidate = "e";
            case 15: candidate = "f";
        }
        color += candidate;
    }
    return color;
}

// Refreshes the screen
function update() {
    
    /* Call animation recursively -- This is more 
     * efficient than setTimeout which is also OK */
    requestAnimationFrame(update); 

    // Clears screen of previous frames
    game.clear();

    // Move and redraw all buildings
    for (var i = 0; i < bldgs.length; i++) {
        bldgs[i].move();
        bldgs[i].draw();
    }
}
