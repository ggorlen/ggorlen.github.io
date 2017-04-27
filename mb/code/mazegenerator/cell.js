"use strict";

/** 
 * Represents a maze cell
 */
let Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.neighbors = { 'n': null, 's': null, 'e': null, 'w': null };
  this.links = { 'n': false, 's': false, 'e': false, 'w': false };
  this.visited = false;
}; // end Cell class
  
/** 
 * Prepares cell for HTML output
 */
Cell.prototype.toHTML = function() {
  return "<td id='cell_" + this.y + 
    "_" + this.x + "' class='" + 
    this.getClass() + "'></td>";
}; // end toHTML
  
/** 
 * Returns a CSS class representation
 */
Cell.prototype.getClass = function() {
  let output = "grid";
  if (this.links.n) output += " n";
  if (this.links.s) output += " s";
  if (this.links.e) output += " e";
  if (this.links.w) output += " w";
  return output;
}; // end getClass
  
/** 
 * Renders cell to a canvas context
 */
Cell.prototype.draw = function(ctx, grid) {
  let x = this.x * grid + 1;
  let y = this.y * grid + 1;
  
  ctx.beginPath();
  ctx.strokeStyle = "#000000";
  ctx.moveTo(x, y);
  
  this.links.n ? ctx.moveTo(x + grid, y) : 
                 ctx.lineTo(x + grid, y);
  this.links.e ? ctx.moveTo(x + grid, y + grid) : 
                 ctx.lineTo(x + grid, y + grid);
  this.links.s ? ctx.moveTo(x, y + grid) : 
                 ctx.lineTo(x, y + grid);
  this.links.w ? ctx.moveTo(x, y) : 
                 ctx.lineTo(x, y);
           
  ctx.closePath();
  ctx.stroke();
}; // end draw

/**
 * Sets the neighbors for this cell
 */
Cell.prototype.setNeighbors = function(maze) {        
  let dirs = { 'n': [-1, 0], 's': [1, 0], 'e': [0, 1], 'w': [0, -1] };
  for (let dir in dirs) { 
    if (this.y + dirs[dir][0] >= 0 &&
        this.x + dirs[dir][1] >= 0 &&
        this.y + dirs[dir][0] < maze.height &&
        this.x + dirs[dir][1] < maze.width) {
      this.neighbors[dir] = maze.grid[this.y + dirs[dir][0]]
                                     [this.x + dirs[dir][1]];
    }
  }
}; // end setNeighbors

/**
 * Links this and parameter cell
 */
Cell.prototype.link = function(otherCell) {

  // Set this cell's link
  for (let neighbor in this.neighbors) {
    if (this.neighbors[neighbor] === otherCell) {
      this.links[neighbor] = true;
      break
    }
  }

  // Set the other cell's link
  for (let neighbor in otherCell.neighbors) {
    if (this === otherCell.neighbors[neighbor]) {
      otherCell.links[neighbor] = true;
      break;
    }
  }
}; // end link
