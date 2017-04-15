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
            new Door (55, 65, 525, 480 - 250 - 65, doorImg)
            //new Door (50, 65, 525, 185, "red")
        ],
        platforms : [
            // width, height, x, y, img
            new Platform (640, 250, 0, 480 - 250, platformL1P1)
        ]
    },

    // Level #1
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 20, 300), 
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 525, 60, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            new Platform (640, 50, 0, 480 - 50, "black"),
            new Platform (100, 30, 475, 350, "black"),
            new Platform (110, 30, 300, 280, "black"),
            new Platform (150, 30, 60, 250, "black"),
            new Platform (120, 30, 270, 150, "black"),
            new Platform (200, 30, 640 - 200, 125, "black")
        ]
    },
    
    // Level #2
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 100, 10),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 550, 480 - 120 - 65, doorImg)
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
            new Door (55, 65, 550, 480 - 120 - 65, doorImg)
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
            new Door (55, 65, 550, 480 - 120 - 65, doorImg)
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
