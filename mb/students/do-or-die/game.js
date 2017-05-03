/**
 * Do Or Die!
 *
 * By: Nathan, Perry, Bin, Marty
 */


/* Create variables */

// Create the Phaser game object
DoOrDie.game = function(){};

DoOrDie.game.prototype = {
    create: create,
    preload: preload,
    update: update
};
    
// timer number 
var timer;

// array of lives
var lives;

// player object
var player;

// arrow key handler
var cursors;

// this will create an array of barriers to prevent 
// the player from crossing certain terrain 
var barriers = [];

// this will place cannons in 4 locations
var cannons = [];

// this will place add balls
var balls = [];

//music
var music;

// Array of cannon locations
const CANNON_LOCATIONS = [      
    [425, 100],
    [440, 495],
    [340, 1100],
    [405,800],    
];

// Array of barrier locations
const BARRIER_LOCATIONS = [

    // Note from greg: use integers, not decimals -- you can't have fractions
    // of a pixel, so the game just chops off your decimal!  :-)


    //This is the left side of the terrain
    //the X and Y coordinates are filpped in the barrier locations!!
    [495, 60],
    [495, 110], //495
    [495, 160],                 //subtract 27.35
    [495, 232],
   
    [510, 260], //510
    
    [529, 290], //507.9
    [530, 344], //529.65
    [530, 419], 
    [509, 465], //508.659
    [509, 552],
    [550, 610],
    [530, 670],
    //right half of the terrain barriers
    [488, 713], //488.45
    [473, 757], //472.65
    [473, 840],
    [473, 886], //472.65
    [510, 950],
    [488, 1004], //488.25
    [467, 1050], //466.65
    [411, 1091], //410.65
    [411, 1130],
    [411, 1193], //410.65
    [423, 1240], //422.65

]; // end barrier locations array


// Phaser method to load assets
function preload() {
    game.load.image('helicopter', 'assets/dude1.png', 100, 100);
    game.load.image('barrier', 'assets/barriers.png');
    game.load.image('terrain', 'assets/newterrain3.png');
    game.load.image('cannon', 'assets/BigCannon.png');
    game.load.image('heart','assets/heart.png');
    game.load.image('cannonball', 'assets/cannonball.png', 10, 10);
    game.load.audio('aud', 'assets/NeverGonnaGiveYouUp.mp3');
} // end preload


// Phaser methods to set up variables and create objects
function create() {
    
    music = game.add.audio('aud');
    
    music.play();
    
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // add the terrain
    game.add.sprite(0,0, 'terrain');

    // This creates the scoreboard
    timerText = game.add.text(895, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
  
    //High score 
    highScoreText = game.add.text(1075, 16, 'High Score: ' + localStorage.highScore, { fontSize: '32px', fill: '#fff' });

    // The player and its settings
    player = game.add.sprite(50, game.world.height - 550, 'helicopter');

    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties. 
    player.body.collideWorldBounds = true;

    player.body.setSize(80, 46, 20, 20);
    
   //This sets the timer to every second. 
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    function updateCounter() {
        timer++;
    }
    
    //This calls the cannon every two seconds.
    game.time.events.loop(2 * Phaser.Timer.SECOND, fireCannonBall, this);

    // Initialize timer number
    timer = 0;
    
    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
    // add barrires
    barriers.enableBody = true;    
    makeBarriers(BARRIER_LOCATIONS);

    // add cannons
    cannons.enableBody = true;    
    makeCannons(CANNON_LOCATIONS);
    
    // Add a group of lives, or heart containers
    lives = game.add.group();
   
    game.add.text(10 , 10, 'Lives : ', { font: '34px Helvetica', fill: '#fff' });

    var heart = lives.create( 10 + (30 * 1), 60, 'heart');
        heart.anchor.setTo(0.5, 0.5);
   
    var heart2 = lives.create( 10 + (30 * 2), 60, 'heart');
        heart2.anchor.setTo(0.5, 0.5);
    
    console.log("create")
    
} // end create

function fireCannonBall() {
    // select random tower to fire
    
    var upper_bound = 3
    var lower_bound = 0 
    var cannonnumber = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
        
    var startingBallspot = CANNON_LOCATIONS[cannonnumber];
    var x_coordinate = startingBallspot[0];
    var y_coordinate = startingBallspot[1];
    
    // add cannonball
    var ball = game.add.sprite(y_coordinate + 25,x_coordinate,'cannonball');
    
    //Get the current coordinates of the helicopter
    var x_coordinate_Helicopter = player.position.x;
    var y_coordiante_Helicopter = player.position.y;
    
    //Fire the cannon ball
    game.physics.arcade.enableBody(ball);
    ball.body.move = true;
    
    //It makes the ball move towards the helicopter
    ball.rotation = game.physics.arcade.moveToObject(ball, player, 200);
    balls.push(ball);
    
}
// Checks collisions between barriers and player
function checkCollisions() {
    barriers.forEach((barrier) => {
        if (game.physics.arcade.collide(player, barrier)) {
//            console.log("collision with barrier!");
        }
       
    });
    balls.forEach((ball) => {
        if (game.physics.arcade.collide(player, ball)) {
            takeALife(ball);     
        }
    });
}
            // checkCollisions

function takeALife(ball) {
    var life = lives.getFirstAlive();
    life.kill();
    ball.kill();
    if(lives.countLiving()=== 0 ) {   
        game.state.start("menu");
        music.pause();
    }
}

// This is the callback function to update the screen every few milliseconds.
function update() {
    
    // show mouse coordinates for debugging and placing objects
    //console.log ( "Y:" + game.input.mousePointer.y);
    //console.log ( "X:" + game.input.mousePointer.x);
    
    // show the timer text
    timerText.text = 'Score: ' + timer;

    
    // Check for collisions between player and barriers
    checkCollisions();

    //  Reset the players velocity (movement)
    player.body.acceleration.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.acceleration.x = -150;
        //player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.acceleration.x = 150;
        //player.animations.play('right');
    }
    
    //  Allow the player to move up
    if (cursors.up.isDown)
    {
        player.body.acceleration.y = -70;
    }
    else if (cursors.down.isDown)
    {
        player.body.acceleration.y = 70;
    }
    else
    {
        player.body.acceleration.y = 0;
    }
    {
        player.body.gravity.y = 5.5;
    }
} // end update
    

// creates barriers given a set of locations
function makeBarriers(locations) {   
    
    for (var i = 0; i < locations.length; i++) {
                
        // make a barrier
        var barrier = game.add.sprite(locations[i][1], locations[i][0], 'barrier'); 
    
        //  and its physics settings
        game.physics.enable(barrier, Phaser.Physics.ARCADE);
        barrier.body.moves = false;

        //  This is the collision rule
        barrier.body.setCircle(10);

        //make it invisible
        barrier.alpha = 0;
       
        // add it to the array of barriers
        barriers.push(barrier);
    }
} // end makeBarriers


// creates cannon given a set of locations
function makeCannons(locations) {   
    
    for (var i = 0; i < locations.length; i++) {
                
        // make a cannon singular
        var cannon = game.add.sprite(locations[i][1], locations[i][0], 'cannon'); 
    
        //  and its physics settings
        game.physics.enable(cannon, Phaser.Physics.ARCADE);
        cannon.body.moves = false;

        //  This is the collision rule
        cannon.body.setCircle(10);
       
        // add it to the array of cannons
        cannons.push(cannon);
    }
} // end makeCannons
