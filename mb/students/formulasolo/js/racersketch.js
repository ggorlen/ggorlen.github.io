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
var controlsLocked;
var countDownCount;
// object thats part of the finishline
var checkPoint;
var music;
// number that represents the time
var timer;
var lap1 = 0;
var lap2 = 0;

// for c
var currLvl = 0;



//gmae.load.image means to upload image
function preload() {
    game.load.image('car1', 'assets/car1.png');
    game.load.image('car2','assets/car2.png');
    game.load.image('barrier', 'assets/barrier.png');
    game.load.image('map', levels[currLvl].mapImage);
    
   game.load.audio('music', 'assets/Pixel Car Racer - Theme Song 【Music】.mp3');
    
    //cursors are up, down, right, left keyboard
    cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKey(Phaser.Keyboard.A);

    //wasd means wasd keyboards and their controls what to do
    wasd = {
      w: game.input.keyboard.addKey(Phaser.Keyboard.W),
      s: game.input.keyboard.addKey(Phaser.Keyboard.S),
      a: game.input.keyboard.addKey(Phaser.Keyboard.A),
      d: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
}

function create() { 
        music = game.add.audio('music');
    music.play();
    
    map = game.add.sprite(0,0, 'map');
    
    //  This creates the scoreboard
    timerText1 = game.add.text(700, 550, 'Timer:0', { fontSize: '16px', fill: '#000' });
    
    // set timer to 0
    game.time.events.loop(Phaser.Timer.SECOND, updateTimer, this);
    
     //this notifies player what lap they're on 
    lapNotifier1 = game.add.text(30, 50,'Red Car Lap: 0' , { fontSize: '16px', fill: '#f00'});
    lapNotifier2 = game.add.text(640, 50,'Blue Car Lap: 0' , { fontSize: '16px', fill: '#00f'});

    //  Our player ship
    car1 = game.add.sprite(levels[currLvl].car1Start.x, levels[currLvl].car1Start.y, 'car1');
    car2 = game.add.sprite(levels[currLvl].car2Start.x, levels[currLvl].car2Start.y, 'car2');
    car1.anchor.set(0.5);
    car2.anchor.set(0.5);

    //  and its physics settings
    game.physics.enable(car1, Phaser.Physics.ARCADE);
    game.physics.enable(car2, Phaser.Physics.ARCADE);
 
    // height width offset_h offset_w
    car1.body.setSize(15, 30, 0, 0);
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
    createFinishLine();
    lap1 = 0;
    lap2 = 0;
    timer = 0;
    countDownText = game.add.text(400, 300,'' , { fontSize: '54px', fill: '#fff'});
    controlsLocked = true;
    countDownCount = 4;
    
    var countDownLoop = setInterval(countDown, 1000);
    
    function countDown() {
        countDownCount = countDownCount - 1;
        countDownText.text = countDownCount;
        if (countDownCount === 0) {
            controlsLocked = false;
            countDownText.text = '';
            clearInterval(countDownLoop);
        }
    }
    
    //reset score
    //score = 0;
}

//update means the image or object reloads every ms
function update() {
    move();
    checkBarriersCollision();
    checkCarCollision();
    checkFinishLine();
    checkCheckpoint();

    
    // console.log ( "Y:" + game.input.mousePointer.y);
    //console.log ( "X:" + game.input.mousePointer.x);

} // end update()

function move() {
    if (controlsLocked)
        return;
    
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
    //--------------------------------------------------------------------------------------------------------------
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
           // console.log("collision!");
        }
        collided = game.physics.arcade.collide(car2, a);
        if (collided) {
          //  console.log("collision!");
        }
    });
}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

function checkFinishLine() {
    if (checkOverlap(car1,finishLine)){
        //console.log("touched finishLine")
        if (car1.alreadyTouchedCheckPoint) {
            lap1 = lap1 + 1;
            if (lap1 === 3) {
                alert(" Red Car Wins");
                currLvl = ++currLvl % levels.length;
                game.state.restart();
                
                // load next map
            }
            car1.alreadyTouchedCheckPoint = false;
           // console.log("number of car1 laps:", lap1);
            //flashCar1LapNotifier();
            lapNotifier1.text = 'Red Car Lap: ' + lap1;
        }
    }
    if (checkOverlap(car2,finishLine)){
       // console.log("touched finishLine")
        if (car2.alreadyTouchedCheckPoint) {
            lap2 = lap2 + 1;
            if (lap2 === 3) {
                alert(" Blue Car Wins");
                currLvl = ++currLvl % levels.length
                game.state.restart();
                // load next map
            }
            car2.alreadyTouchedCheckPoint = false;
            //console.log("number of car2 laps:", lap2);
            lapNotifier2.text = 'blue Car Lap: ' + lap2;
        }
    }
}

function checkCheckpoint() {
    if (checkOverlap(car1, checkpoint)) {
        car1.alreadyTouchedCheckPoint = true;
       // console.log("touched checkPoint");
    }
    if (checkOverlap(car2, checkpoint)) {
        car2.alreadyTouchedCheckPoint = true;
       // console.log("touched checkPoint");
    }
}


function checkCarCollision() {
    var collided = game.physics.arcade.collide(car1, car2);
    if (collided) {
      //  console.log("collision between cars!");
    }
}


function createFinishLine() {
    finishLine = game.add.sprite(levels[currLvl].finishLine.x, levels[currLvl].finishLine.y, 'barrier'); 
    checkpoint = game.add.sprite(levels[currLvl].checkPoint.x, levels[currLvl].checkPoint.y, 'barrier');

    finishLine.width = 38;
    finishLine.height = 157;
    
    checkpoint.width= 38;
    checkpoint.height= 180;
    
    finishLine.alpha = 0;
    checkpoint.alpha = 0;
}

function makeCheckpoint() {
    var checkPoint = game.add.sprite(398, 245, 'barrier');
}

function makeBarriers() {
    
    const BARRIER_LOCATIONS = levels[currLvl].barriers;
    
    for (var i = 0; i < BARRIER_LOCATIONS.length; i++) {
        
        var barrier = game.add.sprite(BARRIER_LOCATIONS[i][1], BARRIER_LOCATIONS[i][0], 'barrier'); 
    
        barrier.width = 10;
        barrier.height = 10;
        
        //  and its physics settings
        game.physics.enable(barrier, Phaser.Physics.ARCADE);        
        barrier.body.moves = false;
        barrier.body.setCircle(10);
        barrier.alpha = 0;
        
        // add barriers array
        barriers.push(barrier);
    }
}

// function that gives us random ...
function updateTimer() {
    timer++;
    timerText1.text = 'Timer:' + timer;
}


function trackLapTime() {
var car1StartTime = Math.floor(Date.now() / 1000)    
    // when lap is completed, get lap 1 end time 
var car1Lap1EndTime = Math.floor(Date.now() / 1000)
var car1Lap1Time = car1Lap1EndTime - car1StartTime
    

var car2StartTime = Math.floor(Date.now() / 1000)
//when lap is completed, get lap 1 end time
var car2EndTime = Math.floor(Date.now() / 1000)
var car2Lap1Time = car2Lap1EndTime - car2StartTime


}


function flashCar1LapNotifier(number) {
    // show this number on the screen

    LapNotifier1.text = "Lap1"
}
function flashCar2LapNotifier(number) {
    // show this number on the screen

    LapNotifier2.text = "Lap2"
}

function render() {
    game.debug.soundInfo(music, 20, 32);
}
