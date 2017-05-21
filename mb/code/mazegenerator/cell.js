"use strict";

/** 
 * Represents a maze cell
 */
let Cell = function (x, y) {
  this.x = x;
  this.y = y;
  this.neighbors = {};
  this.links = { 'n': false, 's': false, 'e': false, 'w': false };
  this.visited = false;
}; // end Cell class
  
/** 
 * Prepares cell for HTML output
 * @return string HTML tag for this cell
 */
Cell.prototype.toHTML = function () {
  return "<td id='cell_" + this.y + 
    "_" + this.x + "' class='" + 
    this.getClass() + "'></td>";
}; // end toHTML
  
/** 
 * Returns a CSS class representation of this cell
 * @return string of CSS
 */
Cell.prototype.getClass = function () {
  let output = "grid";
  if (this.links.n) output += " n";
  if (this.links.s) output += " s";
  if (this.links.e) output += " e";
  if (this.links.w) output += " w";
  if (!this.visited) output += " gridunvisited";
  return output;
}; // end getClass
  
/** 
 * Renders cell to a canvas context
 */
Cell.prototype.draw = function (ctx, grid) {
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
 * @param maze the maze this cell is a member of
 */
Cell.prototype.setNeighbors = function (maze) {        
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
 * @param otherCell the cell to link to this
 */
Cell.prototype.link = function (otherCell) {

  // Set this cell's link
  for (let neighbor in this.neighbors) {
    if (this.neighbors[neighbor] === otherCell) {
      this.links[neighbor] = true;

      // Set the other cell's link
      for (let neighbor in otherCell.neighbors) {
        if (this === otherCell.neighbors[neighbor]) {
          otherCell.links[neighbor] = true;
          return true;
        }
      }
    }
  }
  return false;
}; // end link

/**
 * Returns an array of random neighbors or undefined if no neighbors
 * @return array of random neighbors
 */ 
Cell.prototype.getRandNeighbors = function () {
  return shuffle(Object.values(this.neighbors));
}; // end getRandNeighbor

/**
 * Creates a copy of this cell
 * @return the copy cell
 */
Cell.prototype.clone = function () {
  let cell = new Cell(); 
  cell.x = this.x;
  cell.y = this.y;

  // Avoid circular references in copy of neighbors object
  cell.neighbors = {};
  for (let direction in this.neighbors) {
    cell.neighbors[direction] = this.neighbors[direction]; 
  }
  cell.links = JSON.parse(JSON.stringify(this.links));
  cell.visited = this.visited;
  return cell;
}; // end clone
