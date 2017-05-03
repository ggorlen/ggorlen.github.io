var DoOrDie = {};

DoOrDie.menu = function(){};

if (!('highScore' in localStorage)) {
    localStorage.highScore = 0;
}

DoOrDie.menu.prototype = {
    preload : function() {
        game.load.image('terrain', 'assets/newterrain3.png');
        game.load.image('dude1', 'assets/dude1.png')
    },
    create: function(){
        game.add.sprite(0,0, 'terrain');
        //high score
        highScoreText = game.add.text(1075, 16, 'High Score: ' + localStorage.highScore, { fontSize: '32px', fill: '#fff' });
        timerText = game.add.text(270, 200, 'Click Helicopter to Begin', { font: '80px Impact', fill: '#003300' });
        //game.time.events.add(1000, function(){game.state.start("game");});
        var button = game.add.button(680,350, 'dude1', function(){
           game.state.start('game') 
        });
        button.anchor.setTo(0.5);
        
        
        
        if (timer > localStorage.highScore){
            localStorage.highScore = timer;
            highScoreText.text  = 'High Score: ' + timer
        }
    }
};
