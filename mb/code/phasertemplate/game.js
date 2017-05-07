// Create the main game state object
myGame.game = function () { };

// Add the create/preload/update functions to the game object
myGame.game.prototype = {
    create: create,
    preload: preload,
    update: update
};


// Global variables
let text;


// Phaser method to load assets (images, sounds, etc)
function preload() {

  /*** Load assets here ***/

} // end preload


// Phaser method to initialize variables and instantiate objects
function create() {

  // Add some text
  text = game.add.text(300, 280, '', { fontSize: '32px', fill: '#fff' });

} // end create


// Phaser callback function to update the screen every few milliseconds
function update() {
    
    // Show mouse coordinates for debugging and placing objects
    text.setText("X: " + game.input.mousePointer.x + "  Y: " + game.input.mousePointer.y);

} // end update
