"use strict";

/**
 * Recursive Backtracker
 *
 * Carves a maze depth-first, creating long, winding passages
 */
let Backtracker = function () {};

Backtracker.prototype.carve = function (maze) {
    
  // Start at a random cell
  let stack = [maze.grid[Math.floor(Math.random() * maze.grid.length)]
                        [Math.floor(Math.random() * maze.grid[0].length)]];
  
  // Iterate as long as there are items left in the stack to examine
  while (stack.length) {
  
    // Make the top of the stack the current cell
    let cell = stack[stack.length - 1];
    
    // Add this cell to the animation queue
    animStates.push(cell);
  
    // Mark this cell visited
    cell.visited = true;
    
    // Get this cell's neighbors in random order
    let randNeighbors = cell.getRandNeighbors();

    // Find an unvisited neighbor--assume we'll pop the stack at the end
    let pop = true;
    for (let i = 0; i < randNeighbors.length && pop; i++) {

      // Ensure candidate cell to link to is unvisited
      if (randNeighbors[i] && !randNeighbors[i].visited) {

        // Add the unvisited neighbor to the stack
        stack.push(randNeighbors[i]);

        // Make a path between current cell and unvisited neighbor                      
        cell.link(randNeighbors[i]);

        // Flag to exit the loop and not pop the stack
        pop = false;
      }
    }
    
    // No valid neighbors were found, pop the stack
    if (pop) stack.pop();
  }
}; // end carve
