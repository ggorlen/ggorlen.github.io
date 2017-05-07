// Create the menu state object
myGame.menu = function () { };

// Add the create/preload/update functions to the menu object
myGame.menu.prototype = {
  preload : function () {
    
    // Load menu assets here

  }, // end preload
  create: function () {

    // Add some text
    game.add.text(235, 250, 'Press any key to begin', { fontSize: '32px', fill: '#fff' });

    // Start the game when a key is pressed
    document.addEventListener("keydown", function (e) {
      document.removeEventListener("keydown", function (e) { });
      game.state.start('game');   
    });
  }, // end create
  update: function () { }
};
