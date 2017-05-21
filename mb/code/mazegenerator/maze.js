"use strict";


/** 
 * Represents a maze
 */
let Maze = function (width, height) {
  this.width = width;
  this.height = height;
  this.grid;
}; // end Maze
  
/** 
 * For each on this grid--TODO implement!
 */
Maze.prototype.onGrid = function (callback) {
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j].callback();
    }
  }
}; // end onGrid

/** 
 * Returns a flattened grid
 */
Maze.prototype.getFlattened = function () {
  let tempGrid = [];
  for (let i = 0; i < maze.grid.length; i++) {
    for (let j = 0; j < maze.grid[i].length; j++) {
      tempGrid.push(maze.grid[i][j]);
    }
  }
  return tempGrid;
}; // end getFlattened

/**
 * Initializes this maze
 */ 
Maze.prototype.init = function () {

  // Make a new 2d maze array
  this.grid = new Array(this.height);
  for (let i = 0; i < this.grid.length; i++) {
    this.grid[i] = new Array(this.width);
  }

  // Add cells to maze array
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j] = new Cell(j, i);
    }
  }
  
  // Set neighbors for each cell
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j].setNeighbors(this);
    }
  }
}; // end init

/**
 * Renders the maze as an HTML table
 */
Maze.prototype.toHTML = function () {
  let s = "<table>";
  for (let i = 0; i < this.grid.length; i++) {
    s += "<tr>";
    for (let j = 0; j < this.grid[i].length; j++) {
      s += this.grid[i][j].toHTML();
    }
    s += "</tr>";
  }
  return s + "</table>";
}; // end toHTML

/**
 * Renders the maze to canvas
 */
Maze.prototype.draw = function (ctx, gridSize) {
  for (let i = 0; i < this.grid.length; i++) {
    for (let j = 0; j < this.grid[i].length; j++) {
      this.grid[i][j].draw(ctx, gridSize);
    }
  }
}; // end draw
