"use strict";


/**
 * Aldous-Broder
 *
 * Carves a maze by marking a random cell as part of the maze, then
 * choosing a neighbor at random and marking it part of the maze if
 * it isn't already. If it is already part of the maze, make it the
 * current cell and continue inspecting its neighbors until all cells
 * are in the maze.
 */
let AldousBroder = function () {};

AldousBroder.prototype.carve = function (maze) {
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
    let randNeighbor = cell.getRandNeighbors()[0];
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
