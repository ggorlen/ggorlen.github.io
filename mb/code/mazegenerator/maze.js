"use strict";

/** 
 * Represents a maze
 */
let Maze = function(width, height) {
  this.width = width;
  this.height = height;
  this.grid;
  
  // for each on this grid
  this.onGrid = function(callback) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].callback();
      }
    }
  };
  
  // returns a flattened grid
  this.getFlattened = function() {
    let tempGrid = [];
    for (let i = 0; i < maze.grid.length; i++) {
      for (let j = 0; j < maze.grid[i].length; j++) {
        tempGrid.push(maze.grid[i][j]);
      }
    }
    return tempGrid;
  };

  // initializes this maze
  this.init = function() {
  
    // make a new 2d maze array
    this.grid = new Array(this.height);
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(this.width);
    }
  
    // add cells to maze array
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j] = new Cell(j, i);
      }
    }
    
    // set neighbors for each cell
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        this.grid[i][j].setNeighbors(this);
      }
    }
  };
  
  // renders the maze as a table
  this.toHTML = function() {
    let s = "<table>";
    for (let i = 0; i < this.grid.length; i++) {
      s += "<tr>";
      for (let j = 0; j < this.grid[i].length; j++) {
        s += this.grid[i][j].toHTML();
      }
      s += "</tr>";
    }
    return s + "</table>";
  };
  
  // renders the maze to canvas
  this.draw = function() {
    this.onGrid(draw);
  };
}; // end Maze class
