"use strict";


/**
 * Hunt and Kill
 *
 * Start a random walk from a random cell, linking
 * unvisited neighbors. When a cell is found that has
 * no unvisited neighbors, scan the grid for an unvisited
 * cell that has one visited neighbor and begin walking.
 * Repeat until all cells are visited.
 *
 * Optimization: memorize the row with unvisited cells
 */
let HuntAndKill = function ()  {};

HuntAndKill.prototype.carve = function (maze) {
  let grid = maze.getFlattened();
  let cell = sample(grid);
  let killing = true;

  // Enter killing mode, a random walk of linking cells
  while (killing) {

    // Add frame to animation queue
    animStates.push(cell);

    // Link with a random neighbor if possible
    cell.visited = true;
    let randNeighbors = cell.getRandNeighbors();
    for (let i = 0; i < randNeighbors.length; i++) {
      if (!randNeighbors[i].visited) {
        cell.link(randNeighbors[i]);
        cell = randNeighbors[i];
        break;
      }
    }

    // If there were no unvisited neighbors, enter hunting mode
    if (cell.visited) { 

      // Assume there are no unvisited cells left
      killing = false;

      // Hunt through the grid for an unvisited cell
      for (let i = 0; i < grid.length && !killing; i++) {
        
        // Add frame to animation queue
        animStates.push(grid[i].clone());

        if (!grid[i].visited) {

          // Check this cell's neighbors for a visited cell
          let neighbors = grid[i].getRandNeighbors();
          for (let j = 0; j < neighbors.length; j++) {
            if (neighbors[j].visited) {
              
              // Link and go back to killing
              cell = grid[i];
              cell.link(neighbors[j]);
              killing = true;
              break;
            }
          }
        }
      }
    }
  }
}; // end carve
