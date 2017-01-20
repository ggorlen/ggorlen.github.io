var game = new Phaser.Game(800, 1080, Phaser.AUTO);
game.state.add('Game0', demo.Game0);
game.state.start('Game0');