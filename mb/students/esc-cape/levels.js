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
        ],
        platforms : [
            // width, height, x, y, img
            new Platform (640, 250, 0, 480 - 250, L0Floor)
        ],
		spikes : [
			new Spike (0, 0, 320, 240, testImg)
		]
    },

    // Level #1
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 80, 350), 
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 525, 60, doorImg),
            new Door (55, 65, 20, 15, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            
            // Floor
            new Platform (640, 50, 0, 480 - 50, L1Floor),
            // Entrance Door
            new Platform (55, 65, 20, 480 - 115, entranceImg),
            // Platform 1
            new Platform (100, 30, 475, 350, L1P1),
            // Platform 2
            new Platform (110, 30, 300, 280, L1P1),
            // Platform 3
            new Platform (150, 30, 60, 250, L1P1),
            // Platform for Second Door
            new Platform (140, 30, 0, 80, L1P1),
            // Platform 4
            new Platform (120, 30, 270, 150, L1P1),
            // Platform 5
            new Platform (200, 30, 640 - 200, 125, L1P1)
        ],
		spikes : [
			new Spike (100, 100, 320, 240, testImg)
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
            new Platform (640 / 3, 120, 0, 480 - 120, testImg),
            new Platform (640 / 6, 200, 640 / 3, 480 - 200, testImg),
            new Platform (640 / 6, 280, 640 / 3 + 640 / 6, 480 - 280, testImg),
            new Platform (640 / 3, 120, 640 - 640 / 3, 480 - 120, testImg)
        ],
		spikes : [
			new Spike (100, 100, 320, 240, testImg)
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
            new Platform (640 / 4, 120, 0, 480 - 120, testImg),
            new Platform (640 / 2, 435, 640 / 4, 480 - 435, testImg),
            new Platform (30, 40, 640 / 4 - 30, 480 - 225, testImg),
            new Platform (30, 40, 0, 480 - 330, testImg),
            new Platform (30, 40, 640 / 4 - 30, 480 - 435, testImg),
            new Platform (640 / 4, 120, 640 - 640 / 4, 480 - 120, testImg)
        ],
		spikes : [
			new Spike (100, 100, 320, 240, testImg)
		]
    },
    
    // Level #4
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 50, 310),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 585, 480 - 175 - 65, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            new Platform (640 / 4, 240, 0, 480 - 240, testImg),
            new Platform (640 / 4 - 25, 200, 0, 0, testImg),
            new Platform (80, 20, 230, 135, testImg),
            new Platform (80, 20, 380, 340, testImg),
            new Platform (640 / 4 - 25, 175, 640 - 100, 480 - 175, testImg),
            new Platform (640 / 4, 240, 640 - 100, 0, testImg)
        ],
		spikes : [
            // width, height, x, y, color
			new Spike (380, 100, 160, 480 - 100, testImg)
		]
    },
    
    // Level #5
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 75, 390),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 585, 0, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            // Bottom Floor
            new Platform (100, 30, 0, 480 - 30, testImg),
            new Platform (100, 30, 100, 480 - 30, testImg),
            new Platform (100, 30, 200, 480 - 30, testImg),
            new Platform (100, 30, 300, 480 - 30, testImg),
            new Platform (100, 30, 400, 480 - 30, testImg),
            new Platform (100, 30, 500, 480 - 30, testImg),
            new Platform (40, 30, 600, 480 - 30, testImg),
            
            // Entrance Door
            new Platform (55, 65, 0, 480 - 95, entranceImg),
            
            // First floor
            new Platform (100, 30, 0, 350, testImg),
            new Platform (100, 30, 100, 350, testImg),
            new Platform (100, 30, 200, 350, testImg),
            new Platform (100, 30, 300, 350, testImg),
            new Platform (100, 30, 400, 350, testImg),
            
            // Second floor
            new Platform (100, 30, 140, 250, testImg),
            new Platform (100, 30, 240, 250, testImg),
            new Platform (100, 30, 340, 250, testImg),
            new Platform (100, 30, 440, 250, testImg),
            new Platform (100, 30, 540, 250, testImg),
            
            // Third Floor
            new Platform (100, 30, 0, 150, testImg),
            new Platform (100, 30, 100, 150, testImg),
            new Platform (100, 30, 200, 150, testImg),
            new Platform (100, 30, 300, 150, testImg),
            new Platform (100, 30, 400, 150, testImg),
            
            // Fourth floor
            new Platform (100, 30, 140, 65, testImg),
            new Platform (100, 30, 240, 65, testImg),
            new Platform (100, 30, 340, 65, testImg),
            new Platform (100, 30, 440, 65, testImg),
            new Platform (100, 30, 540, 65, testImg)
        ],
		spikes : [
            // width, height, x, y, color
            new Spike (20, 20, 500, 355, L5Spike4),
			new Spike (20, 20, 120, 255, L5Spike2),
            new Spike (20, 20, 500, 155, L5Spike4),
            new Spike (20, 20, 120, 70, L5Spike2)
		]
    },
    
    // Level #6
    {
        // width, height, color, x, y
        player : new Player(PLAYER_SIZE, PLAYER_SIZE, "gray", 50, 30),
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 575, 385, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            // Bottom Floor
            new Platform (100, 400, 0, 80, testImg),
            new Platform (100, 30, 100, 480 - 30, testImg),
            new Platform (100, 30, 200, 480 - 30, testImg),
            
            new Platform (100, 400, 200, 0, testImg),
            
            new Platform (100, 30, 300, 480 - 30, testImg),
            new Platform (100, 400, 400, 80, testImg),
            
            new Platform (100, 30, 500, 480 - 30, testImg),
            new Platform (40, 30, 600, 480 - 30, testImg)
        ],
		spikes : [
            // width, height, x, y, img
            new Spike (20, 290, 180, 100, L6SpikeLeft)
		]
    }
];
