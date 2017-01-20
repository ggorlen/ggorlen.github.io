var demo = {};
var speed = 6;
//<<<<<<< HEAD
var adam;
//var old;
//var carrot;
var text;
var cursors;
var attack;
//var enemies;



//<<<<<<< HEAD
demo.state0 = function () {};
//=======
//=======

var old;
//>>>>>>> Sam's-Branch
demo.state0 = function(){};
//>>>>>>> origin/master


demo.state0.prototype = {
	preload: function () {
		game.load.image('dojo', 'assets/image00.png');
//<<<<<<< HEAD
		game.load.spritesheet('ajay', 'assets/poop.png', 118, 266);
//        game.load.spritesheet('old', 'assets/sampepper.png', 850, 1107);
        game.load.spritesheet('enemy', 'assets/enemycopy.png', 89, 141);
//        game.load.spritesheet('test', 'assets/test2.png', 83, 138);
        game.load.spritesheet('attack', 'assets/attack.png', 163, 177);
        game.load.spritesheet('carrot', 'assets/carrot.png', 179, 414);
//=======
		game.load.spritesheet('ajay', 'assets/ajay.png', 133, 211);
        game.load.spritesheet('old', 'assets/sampepper.png', 850, 1107);
//>>>>>>> Sam's-Branch

	},

	create: function(){
        game.world.setBounds(0,0, 1500, 550);
        game.physics.startSystem(Phaser.Physics.ARCADE);
//<<<<<<< HEAD
        
//        enemies = game.add.group();
//        enemies.enableBody = true;
        
//        var enemy = game.add.sprite(100, 100, 'enemy');
//        var enemy1 = enemies.create(100, 450, 'enemy');
        
        var tree = game.add.sprite(0, 0, 'dojo');
//<<<<<<< HEAD
//        adam = game.add.sprite(0, 450, 'ajay');
        adam = game.add.sprite(170,350,'ajay');
        adam.scale.setTo( .7, .7);
        
        
//=======
//        adam = game.add.sprite(0, 250, 'ajay');
//>>>>>>> master
//        old = game.add.sprite(300, 350, 'old');
//        adam.frame = ;
        adam.animations.add('walk', [0,1,2,3,4,5]);
//        adam.animations.currentAnim.speed = 10;
        
        var carrot = game.add.sprite(1100, 300, 'carrot');
        
//       var enemy = game.add.sprite(50, 150, 'enemy');
//        enemy.scale.setTo(1.6,1.6);
        
//        enemy.animations.add('move')
//=======
        var tree = game.add.sprite(0, 0, 'dojo');
        adam = game.add.sprite(0, 450, 'ajay');
        old = game.add.sprite(300, 350, 'old');
//        adam.frame = ;
        adam.animations.add('walk', [0, 1 , 2 , 3 , 4]);
       
//>>>>>>> Sam's-Branch
        
        
        tree.height=game.height;
        tree.width=game.width;
//        adam.anchor.setTo(0.5, 0.5);
//<<<<<<< HEAD
//        old.scale.setTo(0.18, 0.18);
        carrot.scale.setTo(0.6, 0.6)
//        
        game.physics.arcade.enable(adam);
        adam.body.bounce.y = 0.2;
//<<<<<<< HEAD
        adam.body.gravity.y = 500;
//=======
//<<<<<<< HEAD
        adam.body.gravity.y = 5000;
//=======
        adam.body.gravity.y = 500;
//>>>>>>> origin/master
//>>>>>>> origin/master
        adam.body.collideWorldBounds = true;
        game.camera.follow(adam);
//        this.adam.body.gravity.y = 1000;
        cursors = game.input.keyboard.createCursorKeys();
        
        
        
    
//=======
        old.scale.setTo(0.18, 0.18);
//        
        game.physics.enable(adam);
        adam.body.collideWorldBounds = true;
//        
        game.camera.follow(adam);
//>>>>>>> Sam's-Branch
//        
//        game.scale.scaleMODE = Phaser.ScaleManager.SHOW_ALL;
		
		function ballHitBrick (_adam, _old) {

            _old.kill();
        }
	},

	update: function(){
//<<<<<<< HEAD
//        game.physics.arcade.collide(adam, platforms);
         adam.body.velocity.x = 0;
//<<<<<<< HEAD
//=======
//<<<<<<< HEAD

    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
//=======
//>>>>>>> origin/master
//        carrot.body.velocity.x = 0;
    if (cursors.left.isDown)
//>>>>>>> origin/master
    {
        //  Move to the left
        adam.body.velocity.x = -500;
        adam.scale.setTo( .7, .7);
        adam.animations.play('walk', 10, true);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
    {
        //  Move to the right
       adam.body.velocity.x = 500;
        adam.scale.setTo(-.7, .7);
        adam.animations.play('walk', 10, true);
    }
//<<<<<<< HEAD
         else{
        adam.animations.stop('walk');
        }
//             
        
        if(cursors.down.isDown){
        adam.body.velocity.y = 150;
    }
    //  Allow the player to jump
    if (cursors.up.isDown){
            
            adam.body.velocity.y = -150;
//=======
//<<<<<<< HEAD
    }
    else
    {
        //  Stand still
        adam.animations.stop();
//=======
        if (game.input.keyboard.isDown(Phaser.Keyboard.D)){
                              adam.x =  adam.x + speed; 
                            adam.animations.play('walk', 20, true);
                               adam.scale.setTo(-0.7, 0.7)
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)){
            adam.x = adam.x - speed;
              adam.animations.play('walk', 20, true);
            adam.scale.setTo(0.7, 0.7)
        }
         else{
        adam.animations.stop('walk');
        }
       if (game.input.keyboard.isDown(Phaser.Keyboard.S)){
            adam.y = adam.y + speed;
        }
       
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            adam.y = adam.y - speed;
                    if(adam.y < 400){
                        adam.y = 400;
                    }
//            if (game.input.keyboard.isDown(Phaser.Keyboard.))
        }
	}
//>>>>>>> Sam's-Branch

        adam.frame = 0;
    

    if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
        adam.body.velocity.y = 200;
    }
    //  Allow the player to jump
    if (game.input.keyboard.isDown(Phaser.Keyboard.W))
    {
        adam.body.velocity.y = -200;
    }
//=======
    else{
        adam.animations.stop('walk');
    }
//             
        
        if(cursors.down.isDown){
        adam.body.velocity.y = 150;
    }
    //  Allow the player to jump
    if (cursors.up.isDown){
            
            adam.body.velocity.y = -150;
//>>>>>>> origin/master
//>>>>>>> origin/master
    }
        //  Stand still
//        carrot.animations.stop();

//        carrot.frame = 0;

	},
    
   
    
//    updateLine: function() {
//
//        if (line.length < content[index].length)
//        {
//            line = content[index].substr(0, line.length + 1);
//            // text.text = line;
//            text.setText(line);
//        }
//        else
//        {
//            //  Wait 2 seconds then start a new line
//            game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
//        }
//
//    },
//
//    nextLine: function() {
//
//        index++;
//
//        if (index < content.length)
//        {
//            line = '';
//            game.time.events.repeat(80, content[index].length + 1, updateLine, this);
//        }
//
//    }
};