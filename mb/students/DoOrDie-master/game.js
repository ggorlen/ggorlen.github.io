/**
 * Do Or Die!
 *
 * By: Nathan, Perry, Bin, Marty
 */

// Create variables
var game = new Phaser.Game(1438, 777, Phaser.AUTO, '', { 
  preload: preload, create: create, update: update 
});
var player;
var cursors;
    
// this will create an array of barriers to check for collisions.
var barriers = [];
const BARRIER_LOCATIONS = [
    [90, 10],
    [70, 10],
    [50, 10],
    [30, 30],
    [10, 50],
    [10, 70],
    [10, 90],
    [10, 110],
    [10, 130],
    [10, 150],
    [10, 170],
    [10, 190],
    [10, 210],
    [10, 230],
    [10, 250],
    [10, 270],
    [10, 290],
    [10, 310],
    [560, 24],
    [10, 10]
];

function preload() {
    game.load.image('sky', 'assets/sky.png');
    game.load.image('sky2', 'assets/sky.png');   
    game.load.image('helicopter', 'assets/dude1.png', 100, 100);
    game.load.image('barrier', 'assets/barriers.png');
} // end preload

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');
    game.add.sprite(800, 0, 'sky2');

    // The player and its settings
    player = game.add.sprite(50, game.world.height - 550, 'helicopter');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. 
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    //player.animations.add('left', [0, 1, 2, 3], 10, true);
    //player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();
    
    // add barrires
    barriers.enableBody = true;    
    makeBarriers(BARRIER_LOCATIONS);
} // end create
    
// Checks collisions between barriers and player
function checkCollisions() {
    barriers.forEach((a) => {
        if (game.physics.arcade.collide(player, a)) {
            console.log("collision!");
        }
    });
} // checkCollisions

// This is the callback function to update the screen every few milliseconds.
function update() {
    
    // show mouse coordinates
//    console.log ( "Y:" + game.input.mousePointer.y);
//    console.log ( "X:" + game.input.mousePointer.x);

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
        player.body.gravity.y= 100;
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
       
        // add it to the array of barriers
        barriers.push(barrier);
    }
} // end makeBarriers
