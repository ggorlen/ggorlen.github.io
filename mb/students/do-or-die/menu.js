var DoOrDie = {};

DoOrDie.menu = function(){};

DoOrDie.menu.prototype = {
    preload : function() {
        game.load.image('terrain', 'assets/newterrain3.png');
        game.load.image('button', 'assets/button.png')
    },
    create: function(){
        game.add.sprite(0,0, 'terrain');
        timerText = game.add.text(430, 150, 'Press H sign to Play', { fontSize: '60px', fill: '#003300' });
        //game.time.events.add(1000, function(){game.state.start("game");});
        var button = game.add.button(680,350, 'button', function(){
           game.state.start('game') 
        });
        button.anchor.setTo(0.5);
    }
};
 