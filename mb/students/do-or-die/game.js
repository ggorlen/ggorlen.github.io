/**
 * Do Or Die!
 *
 * By: Nathan, Perry, Bin, Marty
 */

// Create variables
var game = new Phaser.Game(1337, 677, Phaser.AUTO, '', { 
  preload: preload, create: create, update: update 
});
var player;
var cursors;
var body = document.getElementsByTagName("body")[0];
body.addEventListener('click', function(e) { console.log(e.clientX, e.clientY )})    

// this will create an array of barriers to check for collisions.
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


const BARRIER_LOCATIONS = [
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
];


function preload() {
  
    game.load.image('helicopter', 'assets/dude1.png', 100, 100);
    game.load.image('barrier', 'assets/barriers.png');
    game.load.image('terrain', 'assets/newterrain3.png');
    game.load.image('cannon', 'assets/BigCannon.png');

} // end preload

function create() {

    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);


    //add the terrain
    game.add.sprite(0,0, 'terrain');
    //game.add.sprite(100,250, 'BigCannon');  (image will not show up, maybe too small?)
    
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

    // add cannons
    cannons.enableBody = true;    
    makeCannons(CANNON_LOCATIONS);
    
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
