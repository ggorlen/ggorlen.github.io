var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var kbd;
var spaceship;
var asteroids = [];
var bullets;

var fireRate = 270;
var nextFire = 0;
var score = 0;
var highscore = 0;

function preload() {
    game.load.image('spaceship', 'spaceship.gif');
    game.load.image('asteroid', 'asteroid.gif');
    game.load.image('bullet', 'laser2.png');
  
    
    kbd = game.input.keyboard.createCursorKeys();
    spaceKey = game.input.keyboard.spaceKey;
}

function create() { 
    //  This creates the scoreboard
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    scoreText.
    highScoreText = game.add.text(200, 16, 'High Score: ' + highscore, { fontSize: '32px', fill: '#fff' });


    //  Our player ship
    spaceship = game.add.sprite(400, 400, 'spaceship');
    spaceship.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(spaceship, Phaser.Physics.ARCADE);
 
    spaceship.body.drag.set(100);
    spaceship.body.maxVelocity.set(200);
    //  This is the collision rule
    game.world.setBounds(0, 0, 800, 600);
    spaceship.body.collideWorldBounds = false;
    spaceship.body.setCircle(15);
    spaceship.scale.setTo(2, 2)
    
    makeAsteroids(25);
    
    // bullets
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    
    //reset score
    score = 0;
}

function update() {
    checkWorldPosition(spaceship);
    move();
    checkAsteroidCollision();
    checkBulletCollision();
    
    //spaceship.rotation = game.physics.arcade.angleToPointer(spaceship);
    
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    if (this.spaceKey.isDown)
    {
        fire();
    }
}
// This function makes the ship/asteroids teleport across the screen
function checkWorldPosition(object) {
// check position
    if (object.position.x > game.world.bounds.width) {
        object.position.x = 0;
    }
    
    else if (object.position.x < 0) {
        object.position.x = game.world.bounds.width;
    }
    
    if (object.position.y > game.world.bounds.height) {
        object.position.y = 0;
    }
    
    else if (object.position.y < 0) {
        object.position.y = game.world.bounds.height;
    }   
}

function move() {
    if (kbd.up.isDown)  // isDown means key was pressed
    {
        game.physics.arcade.accelerationFromRotation(spaceship.rotation, 80, spaceship.body.acceleration);
    }
    else if (kbd.down.isDown)
    {   
        game.physics.arcade.accelerationFromRotation(spaceship.rotation, -80, spaceship.body.acceleration); 
    }
    else 
    {
        spaceship.body.acceleration.set(0);
    }
    
    if (kbd.left.isDown)
    {
        spaceship.body.angularVelocity = -300;
    }
    else if (kbd.right.isDown)
    {
        spaceship.body.angularVelocity = 300;
    }
    else
    {
        spaceship.body.angularVelocity = 0;
    }
}

function checkAsteroidCollision() {
    asteroids.forEach(function(a){
        checkWorldPosition(a);
        var collided = game.physics.arcade.collide(spaceship, a);
        if (collided) {
            spaceship.kill();
            
            asteroids.forEach(function(a) { 
                a.kill();
                scoreText.text = '';
                highScoreText.text = '';
            });
            create();            
        }
    });
}

function checkBulletCollision() {
    bullets.forEach(function(b){
        asteroids.forEach(function(a){
            checkWorldPosition(a);
            
            var collided = game.physics.arcade.collide(a, b);
            
            if (collided) {
                // play explosion at: a.position.x, a.position.y
                a.kill();
                b.kill();
                makeAsteroids(1);
                score++;
                scoreText.text = 'Score: ' + score;
                if (score > highscore){
                    highscore = score;
                    highScoreText.text  = 'High Score: ' + score;    
                }
            }
        });
    });
}

function makeAsteroids(numberOfAsteroids) {
    for (var i = 0; i < numberOfAsteroids; i++) {
        
        var asteroid = game.add.sprite(getRandomBetween(0, 200), getRandomBetween(0, 100), 'asteroid'); 
    
        //  and its physics settings
        game.physics.enable(asteroid, Phaser.Physics.ARCADE);
        
        asteroid.body.velocity.x = getRandomBetween(-90,90);
        asteroid.body.velocity.y = getRandomBetween(-90,90);
        asteroid.body.angularVelocity = 30;
        asteroid.anchor.set(0.5);
        asteroid.speed = 400;
        
        //  This is the collision rule
       asteroid.body.collideWorldBounds = false;
       asteroid.body.setCircle(10);
    
       
       asteroids.push(asteroid)
    }
}

function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();
        
        bullet.reset(spaceship.x - 8, spaceship.y - 8);

        //game.physics.arcade.moveToPointer(bullet, 300);
        bullet.rotation = spaceship.rotation;
            game.physics.arcade.velocityFromRotation(spaceship.rotation, 400, bullet.body.velocity);
    }

}

// From Mozilla
function getRandomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
