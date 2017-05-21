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
  animStates.push(cell);

  // Keep going while there are unvisited cells
  while (cellsLeft) {

    // Pick a random neighbor--if it's unvisited, add it
    // to the maze, else make it the current cell
    let randNeighbor = cell.getRandNeighbor();
    if (!randNeighbor.visited) {
      cell.link(randNeighbor);
      randNeighbor.visited = true;
      cellsLeft--;
    }
    cell = randNeighbor;
    
    // Add this cell to the animation queue
    animStates.push(cell);
  }
}; // end carve
