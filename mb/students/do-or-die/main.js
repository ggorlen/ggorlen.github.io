
var game = new Phaser.Game(1337, 677, Phaser.AUTO, 'HA');

game.state.add('menu', DoOrDie.menu);
game.state.add('game', DoOrDie.game);
game.state.start('menu'); 