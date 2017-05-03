// Create the main game state object
myGame.game = function () { };

// Add the create/preload/update functions to the game object
myGame.game.prototype = {
    create: create,
    preload: preload,
    update: update
};


// Phaser method to load assets (images, sounds, etc)
function preload() {

  /*** Load assets here ***/

} // end preload


// Phaser method to initialize variables and instantiate objects
function create() {

  // Add some text
  let text = game.add.text(300, 280, 'Hello World!', { fontSize: '32px', fill: '#fff' });

} // end create


// Phaser callback function to update the screen every few milliseconds
function update() {
    
    // Show mouse coordinates for debugging and placing objects
    console.log("Y: " + game.input.mousePointer.y);
    console.log("X: " + game.input.mousePointer.x);
} // end update
