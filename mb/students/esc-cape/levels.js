// Levels is an array of objects, each of which contains a player 
// object, a doors array, and a platforms array.
// Access the first level with LEVELS[0], and so on
const LEVELS = [
    
    // Level #0
    {
        // width, height, color, x, y
        playerX : 10,
        playerY : 100,
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
        playerX : 80,
        playerY : 350,
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
			new Spike (0, 0, 320, 240, testImg)
		]
    },
    
    // Level #2
    {
        // width, height, color, x, y
        playerX : 25,
        playerY : 125,
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 580, 175, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            
            // Floor
            new Platform (100, 240, 0, 240, Transparent),
            new Platform (100, 240, 100, 240, Transparent),
            new Platform (50, 240, 200, 240, Transparent),
            //new Platform (100, 240, 300, 240, Transparent),
            new Platform (100, 240, 400, 240, Transparent),
            new Platform (100, 240, 500, 240, Transparent),
            new Platform (40, 240, 600, 240, Transparent),
            
            // Platforms
            new Platform (80, 80, 175, 160, L2P1),
            new Platform (130, 150, 390, 95, testImg)
        ],
		spikes : [
			new Spike (150, 40, 250, 440, L2Spike1)
		]
    },
    
    // Level #3
    {
        // width, height, color, x, y
        playerX : 50,
        playerY : 310,
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 550, 480 - 120 - 65, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            new Platform (640 / 4, 120, 0, 480 - 120, testImg),
            new Platform (640 / 2, 435, 640 / 4, 480 - 435, testImg),
            new Platform (30, 40, 130, 255, testImg),
            new Platform (30, 40, 0, 150, testImg),
            new Platform (30, 40, 130, 45, testImg),
            new Platform (160, 120, 480, 360, testImg)
        ],
		spikes : [
			new Spike (100, 100, 320, 240, testImg)
		]
    },
    
    // Level #4
    {
        // width, height, color, x, y
        playerX : 50,
        playerY : 310,
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 585, 240, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            
            // Bottom Left
            new Platform (160, 240, 0, 240, testImg),
            // Top Left
            new Platform (130, 200, 0, 0, testImg),
            // Bottom Right
            new Platform (130, 175, 540, 305, testImg),
            // Top Right
            new Platform (160, 240, 540, 0, testImg),
            // Platform 1
            new Platform (80, 20, 230, 135, testImg),
            // Platform 2
            new Platform (80, 20, 380, 340, testImg)
        ],
		spikes : [
            // width, height, x, y, color
            //(380, 100, 160, 480 - 100, testImg)
			new Spike (0, 0, 160, 480 - 100, testImg)
		]
    },
    
    // Level #5
    {
        // width, height, color, x, y
        playerX : 75,
        playerY : 90,
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 585, 5, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            // Bottom Floor
            new Platform (100, 30, 0, 450, testImg),
            new Platform (100, 30, 100, 450, testImg),
            new Platform (100, 30, 200, 450, testImg),
            new Platform (100, 30, 300, 450, testImg),
            new Platform (100, 30, 400, 450, testImg),
            new Platform (100, 30, 500, 450, testImg),
            new Platform (40, 30, 600, 450, testImg),
            
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
            new Platform (100, 30, 140, 70, testImg),
            new Platform (100, 30, 240, 70, testImg),
            new Platform (100, 30, 340, 70, testImg),
            new Platform (100, 30, 440, 70, testImg),
            new Platform (100, 30, 540, 70, testImg)
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
        playerX : 50,
        playerY : 30,
        doors : [
            // width, height, x, y, color
            new Door (55, 65, 575, 385, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            
            // Starting Block
            new Platform (100, 100, 0, 80, testImg),
            new Platform (100, 100, 0, 180, testImg),
            new Platform (100, 100, 0, 280, testImg),
            new Platform (100, 100, 0, 380, testImg),
            
            // Bottom Floor
            new Platform (100, 30, 100, 450, testImg),
            new Platform (100, 30, 200, 450, testImg),
            new Platform (100, 30, 300, 450, testImg),
            new Platform (100, 30, 400, 450, testImg),
            
            new Platform (100, 30, 500, 450, testImg),
            new Platform (40, 30, 600, 450, testImg),
            
            // Block with Spikes
            new Platform (100, 400, 200, 0, testImg),
            
            // 
            new Platform (25, 50, 400, 350, testImg),
            new Platform (25, 50, 300, 250, testImg),
            new Platform (25, 50, 400, 150, testImg),
            
            // Going up block
            new Platform (100, 100, 425, 80, testImg),
            new Platform (100, 100, 425, 180, testImg),
            new Platform (100, 100, 425, 280, testImg),
            new Platform (100, 70, 425, 380, testImg)
        ],
		spikes : [
            // width, height, x, y, img
            new Spike (20, 290, 180, 100, L6SpikeLeft)
            //new Spike (20, 20, 180, 420, testImg)
		]
        
        
    },
    
    // Level #7
    {
        // width, height, color, x, y
        playerX : 50,
        playerY : 30,
        doors : [
            // width, height, x, y, color
            //new Door (55, 65, 575, 385, doorImg)
            new Door (0, 0, 575, 385, doorImg)
        ],
        platforms : [
            // width, height, x, y, color
            
            // Bottom Left
            new Platform (250, 370, 0, 110, Transparent),
            new Platform (250, 30, 0, 0, Transparent),
            // Top Right
            new Platform (250, 90, 390, 390, Transparent),
            // Bottom Left 
            new Platform (250, 310, 390, 0, Transparent)
        ],
		spikes : [
            // width, height, x, y, img
            //new Spike (0, 480, 180, 100, L6SpikeLeft)
		]
        
    }
];
