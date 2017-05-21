"use strict";


/* Todo:
 *
 * add djikstra's, solver with various algorithms such as recursive backtracker
 * https://en.wikipedia.org/wiki/Maze_solving_algorithm
 *
 * animate algorithm help:
 * http://stackoverflow.com/questions/17719662/animating-a-recursive-backtracking-algorithm-in-javascript
 * http://stackoverflow.com/questions/29588816/animate-javascript-canvas-while-in-recursive-calculation
 *
 * CSS border problems:
 * http://stackoverflow.com/questions/1339084/css-issue-on-firefox-border-not-show-correctly
 * http://stackoverflow.com/questions/5894642/how-to-fix-this-white-dot-border-issue-in-a-drop-down-menu
 */


// Global variables
let canvas;
let ctx;
let grid;
let width; 
let height;
let animate;
let animationSpeed;
let maze;
let animStates;
let interval;

// Processes the user's form submission
function process() {
  
  // Clear previous interval if active
  clearInterval(interval);

  // Grab canvas and context from DOM
  canvas = document.getElementById("mazecanvas");
  ctx = canvas.getContext("2d");
  
  // Collect info from form
  let userForm = document.forms["mazein"].elements;
  width = parseInt(userForm["width"].value) || 20;
  height = parseInt(userForm["height"].value) || 20;
  grid = userForm["gridsize"].value || 10;
  animate = userForm["animate"].checked;
  
  // Create animation vars
  animationSpeed = 40;
  animStates = [];
  
  // Create a maze object and carve it with the selected algorithm
  maze = new Maze(width, height);
  maze.init();
  document.getElementById("mazeout").innerHTML = maze.toHTML();

  switch (userForm["algorithm"].selectedIndex) {
    case 0 : new Backtracker().carve(maze);  break;
    case 1 : new Prims().carve(maze);        break;
    case 2 : new BinaryTree().carve(maze);   break;
    case 3 : new AldousBroder().carve(maze); break;
    case 4 : new Wilsons().carve(maze);      break;
    case 5 : new Sidewinder().carve(maze);   break;
    case 6 : new HuntAndKill().carve(maze);  break;
    default: console.log("Error: invalid algorithm selection");
  }

  // Create a cylindrical maze
  // aluminum can : 50x115 grid: 8 .. 13in x 5.75in in gimp (?)
  //for (let i = 0; i < height; i++) {
  //  maze.grid[i][width - 1].neighbors[2] = maze.grid[i][0];
  //  maze.grid[i][0].neighbors[3] = maze.grid[i][width - 1];
  //}
  
  // Add entrance and exit
  //maze.grid[0][0].n = true;
  //maze.grid[maze.height - 1][maze.width - 1].s = true;
  
  // Display maze, either as an animation or directly
  if (animate) {
    let cell;
    let cellClass;
    interval = setInterval(function() {
      if (animStates.length) {
        if (cell) {
          document.getElementById(cellClass).className = cell.getClass();
        }
        cell = animStates.shift();
        cellClass = "cell_" + cell.y + "_" + cell.x;
        document.getElementById(cellClass).className = 
          cell.getClass() + " gridactive";
      }
      else {
        clearInterval(interval);
        document.getElementById(cellClass).className = cell.getClass();
      }
    }, animationSpeed);
  }
  else {
    document.getElementById("mazeout").innerHTML = maze.toHTML();
  }
  
  // Set the grid's CSS properties
  $(".grid").css('width', grid + "px");
  $(".grid").css('height', grid + "px");
} // end Process


// jQuery script to prevent forms from refreshing the page on submit
$(document).ready(function() {
  $(function() {
    $("form").submit(function() { return false; });
  });
});
