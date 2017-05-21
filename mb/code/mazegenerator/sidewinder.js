"use strict";


/**
 * Sidewinder
 *
 * Carves a maze by forming runs of horizontal passages and 
 * randomly connecting one cell from the run to the south
 * and starting a new run until all cells are visited.
 */
let Sidewinder = function () {};

Sidewinder.prototype.carve = function (maze) {
  let grid = maze.getFlattened(); 
  let run = 0;
  for (let i = 0; i < grid.length; i++) {

    // Add this frame to the animation queue
    animStates.push(grid[i]);

    // Flip a coin and check if an eastern neighbor exists for this cell
    if (Math.random() >= 0.5 || !grid[i].neighbors.e) {

      // End the run and pick a random cell from the run to connect south
      let randomCell = i - (Math.random() * run | 0);
      if (grid[randomCell].neighbors.s) {
        grid[i].visited = true;
        grid[randomCell].link(grid[randomCell].neighbors.s);
        run = 0;
      }
    }

    // Either there is no southern neighbor or the
    // coin flip failed; the run continues east
    if (!grid[i].visited) {
      grid[i].visited = true;
      grid[i].link(grid[i].neighbors.e);
      run++;
    }
  }
}; // end carve
