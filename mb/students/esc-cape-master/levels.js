// Levels is an array of objects, each of which contains a player 
// object, a doors array, and a platforms array.
// Access the first level with LEVELS[0], and so on
const LEVELS = [

    // Level #1
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 10, 300), 
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 525, 185, "purple"),
            new Door (50, 65, 525, 185, "red")
        ],
        platforms : [
            // width, height, x, y, color
            //new Platform (400, 300, 200, 200, "brown"),
            new Platform (290, game.canvas.height, 50, 450, "black"),
            new Platform (100, 30, 130, 370, "black"),
            new Platform (150, 30, 160, 280, "black"),
            new Platform (300, 30, 280, 250, "black")
        ]
    },
    
    // Level #2
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 100, 10),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 550, game.canvas.height - 115, "purple")
        ],
        platforms : [
            // width, height, x, y, color
            //new Platform (400, 300, 200, 200, "brown"),
            new Platform (game.canvas.width, 50, 0, game.canvas.height - 50, "black"),
            new Platform (game.canvas.width / 4, 50, game.canvas.width / 4, game.canvas.height - 100, "black"),
            new Platform (game.canvas.width / 4, 100, game.canvas.width / 2, game.canvas.height - 150, "black")
        ]
    }
];