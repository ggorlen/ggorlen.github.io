// represents a maze cell

let Cell = function(x, y) {
  this.x = x;
  this.y = y;
  this.n = null;
  this.s = null;
  this.e = null;
  this.w = null;
  this.neighbors = [null, null, null, null]; // nsew  todo: refactor to hash
  this.visited = false;
  
  // prepares cell for HTML output
  this.toHTML = function() {
    return "<td id='cell_" + this.y + 
      "_" + this.x + "' class='" + 
      this.getClass() + "'></td>";
  };
  
  // returns a CSS class representation
  this.getClass = function() {
    let output = "grid ";
    if (this.n) output += "n";
    if (this.s) output += " s";
    if (this.e) output += " e";
    if (this.w) output += " w";
    return output;
  };
  
  // renders cell to canvas
  this.draw = function() {
    let x = this.x * grid + 1;
    let y = this.y * grid + 1;
    
    ctx.beginPath();
    ctx.strokeStyle = "#000000";
    ctx.moveTo(x, y);
    
    this.n ? ctx.moveTo(x + grid, y) : 
             ctx.lineTo(x + grid, y);
    this.e ? ctx.moveTo(x + grid, y + grid) : 
             ctx.lineTo(x + grid, y + grid);
    this.s ? ctx.moveTo(x, y + grid) : 
             ctx.lineTo(x, y + grid);
    this.w ? ctx.moveTo(x, y) : 
             ctx.lineTo(x, y);
             
    ctx.stroke();
    ctx.closePath();
  };
}; // end Cell class


// sets the neighbors for this cell
Cell.prototype.setNeighbors = function() {        
  let dirs = [[-1, 0], [1, 0], [0, 1], [0, -1]];
  
  for (let i = 0; i < dirs.length; i++) {
    if (this.y + dirs[i][0] >= 0 &&
        this.x + dirs[i][1] >= 0 &&
        this.y + dirs[i][0] < maze.height &&
        this.x + dirs[i][1] < maze.width) {
      this.neighbors[i] = maze.grid[this.y + dirs[i][0]]
                                   [this.x + dirs[i][1]];
    }
  }
};
