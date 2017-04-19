/**
 * Do Or Die!
 *
 * By: Nathan, Perry, Bin, Marty
 */


/* Create variables */

// Create the Phaser game object
var game = new Phaser.Game(1337, 677, Phaser.AUTO, '', { 
  preload: preload, create: create, update: update 
});

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
    
    [529.25, 290], //507.9
    [529.65, 344], //529.65
    [529.65, 419], 
    [508.695, 465], //508.659
    [508.695, 552],
    [550, 610],
    [530, 670],
    //right half of the terrain barriers
    [488.45, 713], //488.45
    [472.65, 757], //472.65
    [472.65, 840],
    [472.65, 886], //472.65
    [510, 950],
    [488.25, 1004], //488.25
    [466.65, 1050], //466.65
    [410.65, 1091], //410.65
    [410.65, 1130],
    [410.65, 1193], //410.65
    [422.65, 1240], //422.65

//----------------------------------------------------------------//

/* Note from greg: I wasn't sure which set of barriers to keep.
 * Feel free to delete this section if it's the old set.
 */

/*
    //This is the left side of the terrain
    //the X and Y coordinates are filpped in the barrier locations!!
    [522.35, 10],
    [522.35, 60],
    [522.35, 110],
    [522.35, 160],
    [522.35, 210],
    [522.35, 240],
    [537.35, 260],
    [537.35, 266],
    [535.25, 260],
    [557, 319],
    [557, 380],
    [557, 319],
    [557, 379],
    [536, 467],
    [536, 560],
    [557, 640],
    //right half of the terrain barriers
    [515.8, 716],
    [500, 758],
    [500, 860],
    [500, 893],
    [515.6, 1000],
    [494, 1051],
    [438, 1092],
    [438, 1130],
    [438, 1150],
    [438, 1180],
    [438, 1202],
    [450, 1210],
    [450, 1240]
*/

//----------------------------------------------------------------//
]; // end barrier locations array


// Phaser method to load assets
function preload() {
    game.load.image('helicopter', 'assets/dude1.png', 100, 100);
    game.load.image('barrier', 'assets/barriers.png');
    game.load.image('terrain', 'assets/newterrain3.png');
    game.load.image('cannon', 'assets/bigCannon.png');
    game.load.image('heart','assets/heart.png');
} // end preload


// Phaser methods to set up variables and create objects
function create() {
    
 function doStuff {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // add the terrain
    game.add.sprite(0,0, 'terrain');

    // This creates the scoreboard
    timerText = game.add.text(1150, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });//

    // The player and its settings
    player = game.add.sprite(50, game.world.height - 550, 'helicopter');

    // We need to enable physics on the player
    game.physics.arcade.enable(player);

    // Player physics properties. 
    player.body.collideWorldBounds = true;

    // Useful spritesheet animation code for when the time comes.
    //player.animations.add('left', [0, 1, 2, 3], 10, true);
    //player.animations.add('right', [5, 6, 7, 8], 10, true);

    // Initialize timer number
    timer = 0;
    
    // set interval with a function to be called every second 
    let interval = setInterval (() => {

        //increment timer integer by 1    
        timer++;
    }, 1000); // 1000 milliseconds is one second
    
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
   
    game.add.text(10 , 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

    var heart = lives.create( 10 + (30 * 1), 60, 'heart');
        heart.anchor.setTo(0.5, 0.5);
   
    var heart2 = lives.create( 10 + (30 * 2), 60, 'heart');
        heart2.anchor.setTo(0.5, 0.5);
}
setTimeout(doStuff, 50);
} // end create
    
// Checks collisions between barriers and player
function checkCollisions() {
    barriers.forEach((barrier) => {
        if (game.physics.arcade.collide(player, barrier)) {
            //console.log("collision!");
        }
    });
} // checkCollisions


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
    else
    {
        //  Stand still
        //player.animations.stop();
        //player.frame = 4;
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
