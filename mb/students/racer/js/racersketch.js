var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

//cursors will tell the controls of the cars or objects
var cursors;

// the objects contrloed by cursors
var car1;
var car2;

// objects that block the way
var barriers = [];

// object that changes the lap number
var finishLine;

// object thats part of the finishline
var checkPoint;

// number that represents the time
var timer;


function preload() {
    game.load.image('car1', '../assets/car1.png');
    game.load.image('car2','../assets/car2.png');
    game.load.image('barrier', '../assets/barrier.png');
    game.load.image('map','../assets/racermap.png');
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKey(Phaser.Keyboard.A);

    wasd = {
      w: game.input.keyboard.addKey(Phaser.Keyboard.W),
      s: game.input.keyboard.addKey(Phaser.Keyboard.S),
      a: game.input.keyboard.addKey(Phaser.Keyboard.A),
      d: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
}

function create() { 
    
    // 
    map = game.add.sprite(0,0, 'map');
    
    //  This creates the scoreboard
    timerText = game.add.text(16, 16, 'Score: 0' + timer, { fontSize: '32px', fill: '#fff' });//
    

    //  Our player ship
    car1 = game.add.sprite(350, 75, 'car1');
    car2 = game.add.sprite(350, 125, 'car2');
    car1.anchor.set(0.5);
    car2.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(car1, Phaser.Physics.ARCADE);
    game.physics.enable(car2, Phaser.Physics.ARCADE);
 
    car1.body.drag.set(150);
    car2.body.drag.set(150);
    car1.body.bounce.set(0.4);
    car2.body.bounce.set(0.4); 
    car1.body.maxVelocity.set(200);
    car2.body.maxVelocity.set(200);
    
    //  This is the collision rule
    game.world.setBounds(0, 0, 800, 600);
    car1.body.collideWorldBounds = true;
    car2.body.collideWorldBounds = true;
    car1.scale.setTo(2, 2);
    car2.scale.setTo(2, 2);
    car1.body.setCircle(15);
    car2.body.setCircle(15);

    makeBarriers();
    
    
    //reset score
    //score = 0;
}

function update() {
    move();
    checkBarriersCollision();
    checkCarCollision();
    
    
    // console.log ( "Y:" + game.input.mousePointer.y);
    //console.log ( "X:" + game.input.mousePointer.x);

} // end update()

function move() {
    
    if (cursors.up.isDown)  // isDown means key was pressed
    {
         car1.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car1.angle, 200));
    }
    else if (cursors.down.isDown)
    {   
         car1.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car1.angle, -30));
    }
    else 
    {
        car1.body.acceleration.set(0);
        car1.body.velocity;
    }
    
    if (cursors.left.isDown)
    {
        car1.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        car1.body.angularVelocity = 200;
    }
    else
    {
        car1.body.angularVelocity = 0;
    }
    //----------------------------------------------------------------------------------------------------------------------------------------
     if (wasd.w.isDown)  // isDown means key was pressed
    {
        car2.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car2.angle, 200));
    }
    else if (wasd.s.isDown)
    {   
        car2.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(car2.angle, -30));
    }
    else 
    {
        car2.body.acceleration.set(0);
    }
    
    if (wasd.a.isDown)
    {
        car2.body.angularVelocity = -300;
    }
    else if (wasd.d.isDown)
    {
        car2.body.angularVelocity = 300;
    }
    else
    {
        car2.body.angularVelocity = 0;
    }
}

//function to check barriers and cars
function checkBarriersCollision() {
    barriers.forEach(function(a){
        //checkWorldPosition(a);
        var collided = game.physics.arcade.collide(car1, a);
        if (collided) {
            console.log("collision!");
        }
        collided = game.physics.arcade.collide(car2, a);
        if (collided) {
            console.log("collision!");
        }
    });
}

function checkCarCollision() {
    var collided = game.physics.arcade.collide(car1, car2);
    if (collided) {
        console.log("collision between cars!");
    }
}


function createFinishLine() {
    finishLine = game.add.sprite(40, 54, 'barrier'); 

    finishLine.width = 15;
    finishLine.height = 15;

    //  and its physics settings
    game.physics.enable(barrier, Phaser.Physics.ARCADE);        
    barrier.body.moves = false;
}


function makeBarriers() {
    
    const BARRIER_LOCATIONS = [
        [22,0],
        [22,30],
        [22,60],
        [22,90],
        [22,120],
        [22,150],
        [22,180],
        [22,210],
        [22,240],
        [22,270],
        [22,300],
        [22,330],
        [22,360],
        [22,390],
        [22,420],
        [22,450],
        [22,480],
        [22,510],
        [22,540],
        [22,570],
        [22,600],
        [22,630],
        [22,660],
        [22,690],
        [22,720],
        [22,750],
        [22,780],
        [30,6],
        [60,6],
        [90,6],
        [120,6],
        [150,6],
        [180,6],
        [210,6],
        [240,6],
        [270,6],
        [300,6],
        [330,6],
        [360,6],
        [390,6],
        [420,6],
        [450,6],
        [480,6],
        [510,6],
        [540,6],
        [570,6],
        [600,6],
        [590,6],
        [590,30],
        [590,60],
        [590,90],
        [590,120],
        [590,150],
        [590,180],
        [590,210],
        [590,240],
        [590,270],
        [590,300],
        [590,330],
        [590,360],
        [590,390],
        [590,420],
        [590,450],
        [590,480],
        [590,510],
        [590,540],
        [590,570],
        [590,600],
        [590,630],
        [590,660],
        [590,690],
        [590,720],
        [590,750],
        [590,780],
        [590,370],
        [560,370],
        [530,370],
        [500,370],
        [470,370],
        [440,370],
        [410,370],
        [405,370],
        [405,404],
        [409,404],
        [440,404],
        [470,404],
        [500,404],
        [530,404],
        [560,404],
        [590,404],
        [194,190],
        [194,217],
        [194,247],
        [194,277],
        [194,307],
        [194,337],
        [194,367],
        [194,397],
        [194,427],
        [194,457],
        [194,487],
        [194,517],
        [194,547],
        [194,577],
        [194,587],
        [224,190],
        [254,190],
        [284,190],
        [314,190],
        [344,190],
        [374,190],
        [404,190],
        [224,587],
        [254,587],
        [284,587],
        [314,587],
        [344,587],
        [374,587],
        [404,587],
        [214,217],
        [214,247],
        [214,277],
        [214,307],
        [214,337],
        [214,367],
        [214,397],
        [214,427],
        [214,457],
        [214,487],
        [214,517],
        [214,547],
        [224,213],
        [254,213],
        [284,213],
        [314,213],
        [344,213],
        [374,213],
        [404,213],
        [224,566],
        [254,566],
        [284,566],
        [314,566],
        [344,566],
        [374,566],
        [404,566],
        [600,600],
        [30,770],
        [60,770],
        [90,770],
        [120,770],
        [150,770],
        [180,770],
        [210,770],
        [240,770],
        [270,770],
        [300,770],
        [330,770],
        [360,770],
        [390,770],
        [420,770],
        [450,770],
        [480,770],
        [510,770],
        [540,770],
        [570,770],
        [600,770]
        
                              ];
    
    for (var i = 0; i < BARRIER_LOCATIONS.length; i++) {
        
        var barrier = game.add.sprite(BARRIER_LOCATIONS[i][1], BARRIER_LOCATIONS[i][0], 'barrier'); 
    
        barrier.width = 10;
        barrier.height = 10;
        
        //  and its physics settings
        game.physics.enable(barrier, Phaser.Physics.ARCADE);        
        barrier.body.moves = false;
        barrier.body.setCircle(10);
        
        // add barriers array
        barriers.push(barrier);
    }
}

// function that gives us random ...
function startTimer() { 
timer = 0;
    interval = setInterval(function() {
        timer++;
        
        timerText.text = 'Timer: ' + timer;
    },1000);
};
startTimer();
