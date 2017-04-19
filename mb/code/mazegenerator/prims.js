"use strict";


/**
 * Prim's algorithm -- in progress!
 */
let Prims = function() {};

Prims.prototype.carve = function(maze) {
  let grid = maze.getFlattened(); 

  // Set of cells left to explore
  let frontier = [];

  // Randomly select an unvisited cell from the grid and mark it visited
  let cell = sample(grid);

  // Add its neighbors to the frontier
  for (let dir in cell.neighbors) {
    frontier.push(cell.neighbors[dir]);
  }

  // Keep going while there are unvisited cells in the frontier
  while (frontier.length) {

    // Remove a random cell from the frontier
    cell = frontier.splice(Math.floor(Math.random() * frontier.length), 1)[0];
    if (!cell) break;
    cell.visited = true;

    // Get this cell's neighbor keys in random order
    let randDirs = shuffle(Object.keys(cell.neighbors)); 

    // Find a valid random neighbor and add it to the maze
    for (let dir in randDirs) {
      if (cell.neighbors[dir] && !cell.neighbors[dir].visited) {
        let neighbor = cell.neighbors[dir];
        neighbor.visited = true; //? ?
        cell.link(neighbor);

        // Add its unvisited neighbors to the frontier
        for (let nDir in neighbor.neighbors) {
          if (neighbor.neighbors[nDir] && 
              !neighbor.neighbors[nDir].visited) {
            frontier.push(neighbor.neighbors[nDir]);
          }
        }
        break;
      }
    }
  }
}; // end carve
