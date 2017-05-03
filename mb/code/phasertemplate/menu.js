// Create the menu state object
myGame.menu = function () { };

// Add the create/preload/update functions to the menu object
myGame.menu.prototype = {
  preload : function () {
    
    // Load menu assets here

  }, // end preload
  create: function () {

    // Add some text
    game.add.text(300, 250, 'Press button to play', { fontSize: '20px', fill: '#fff' });

    // Add a button which, when clicked, will activate the game state
    var button = game.add.button(390, 350, 'button', function () {
       game.state.start('game');
    });

    button.anchor.setTo(0.5);
  }, // end create
  update: function () { }
};
