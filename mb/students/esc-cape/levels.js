// Levels is an array of objects, each of which contains a player 
// object, a doors array, and a platforms array.
// Access the first level with LEVELS[0], and so on
const LEVELS = [
    
    // Level #0
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 10, 100), 
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 525, 480 - 250 - 65, "purple")
            //new Door (50, 65, 525, 185, "red")
        ],
        platforms : [
            // width, height, x, y, color
            //new Platform (400, 300, 200, 200, "brown"),
            new Platform (640, 250, 0, 480 - 250, "black")
        ]
    },

    // Level #1
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 10, 300), 
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 525, 185, "purple")
            //new Door (50, 65, 525, 185, "red")
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
            new Door (55, 65, 550, 480 - 120 - 65, "purple")
        ],
        platforms : [
            // width, height, x, y, color
            //new Platform (400, 300, 200, 200, "brown"),
            new Platform (640 / 3, 120, 0, 480 - 120, "black"),
            new Platform (640 / 6, 200, 640 / 3, 480 - 200, "black"),
            new Platform (640 / 6, 280, 640 / 3 + 640 / 6, 480 - 280, "black"),
            new Platform (640 / 3, 120, 640 - 640 / 3, 480 - 120, "black")
        ]
    },
    
    // Level #3
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 50, 310),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 550, 480 - 120 - 65, "purple")
        ],
        platforms : [
            // width, height, x, y, color
            //new Platform (400, 300, 200, 200, "brown"),
            new Platform (640 / 4, 120, 0, 480 - 120, "black"),
            new Platform (640 / 2, 435, 640 / 4, 480 - 435, "black"),
            new Platform (30, 40, 640 / 4 - 30, 480 - 225, "red"),
            new Platform (30, 40, 0, 480 - 330, "red"),
            new Platform (30, 40, 640 / 4 - 30, 480 - 435, "red"),
            new Platform (640 / 4, 120, 640 - 640 / 4, 480 - 120, "black")
        ]
    },
    
    // Level #4
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 50, 310),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 550, 480 - 120 - 65, "purple")
        ],
        platforms : [
            // width, height, x, y, color
            //new Platform (400, 300, 200, 200, "brown"),
            new Platform (640 / 4, 120, 0, 480 - 120, "black"),
            new Platform (640 / 2, 435, 640 / 4, 480 - 435, "black"),
            new Platform (30, 40, 640 / 4 - 30, 480 - 225, "red"),
            new Platform (30, 40, 0, 480 - 330, "red"),
            new Platform (30, 40, 640 / 4 - 30, 480 - 435, "red"),
            new Platform (640 / 4, 120, 640 - 640 / 4, 480 - 120, "black")
        ]
    }
];
