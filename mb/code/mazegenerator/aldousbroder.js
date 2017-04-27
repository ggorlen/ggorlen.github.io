"use strict";


/**
 * Aldous-Broder
 *
 */
let AldousBroder = function() {};

AldousBroder.prototype.carve = function(maze) {
  let grid = maze.getFlattened(); 
  let cellsLeft = grid.length;

  // Randomly select an unvisited cell from the grid and mark it part of the maze
  let cell = sample(grid);
  cell.visited = true;
  cellsLeft--;
  
  // Add this cell to the animation queue
  animStates.push(["cell_" + cell.y + "_" + cell.x, cell]);

  // Keep going while there are unvisited cells
  while (cellsLeft) {

    // Pick a random neighbor--if it's unvisited, add it
    // to the maze, else make it the current cell
    let randDirs = shuffle(Object.keys(cell.neighbors)); 
    for (let i = 0; i < randDirs.length; i++) {
      let neighbor = cell.neighbors[randDirs[i]];
      if (neighbor) {
        if (!neighbor.visited) {
          cell.link(neighbor);
          neighbor.visited = true;
          cellsLeft--;
        }
        cell = neighbor;
        break;
      } 
    }
    
    // Add this cell to the animation queue
    animStates.push(["cell_" + cell.y + "_" + cell.x, cell]);
  }
}; // end carve