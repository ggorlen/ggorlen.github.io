// carves a maze with lots of dead ends and a north-east bias
let BinaryTree = function() {};
BinaryTree.prototype.carve = function(maze) {
  let grid = maze.getFlattened();
  
  // process each cell
  while (grid.length) {
    let cell = grid.shift();
   
    // add this cell to the animation queue
    animStates.push(["cell_" + cell.y + "_" + cell.x, cell]);
  
    // mark this cell visited
    cell.visited = true;
    
    // pick a random north or east neighbor and link.
    if (cell.neighbors[0] && cell.neighbors[2]) {
      Math.random() < 0.5 ? cell.n = cell.neighbors[0].s = true :
                            cell.e = cell.neighbors[2].w = true;
    }
    // if there's no east neighbor, choose north, and vice versa.
    else if (cell.neighbors[0] && !cell.neighbors[2]) {
      cell.n = cell.neighbors[0].s = true;
    }
    else if (cell.neighbors[2] && !cell.neighbors[0]) {
      cell.e = cell.neighbors[2].w = true;
    }
  }
};