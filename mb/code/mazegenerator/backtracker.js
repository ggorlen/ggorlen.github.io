// carves a maze depth-first, creating long, winding passages

let Backtracker = function() {};

Backtracker.prototype.carve = function(maze) {
    
  // start at a random cell
  let stack = [maze.grid[Math.floor(Math.random() * maze.grid.length)]
                        [Math.floor(Math.random() * maze.grid[0].length)]];
  
  while (stack.length) {
  
    // make the top of the stack the current cell
    let cell = stack[stack.length - 1];
    
    // add this cell to the animation queue
    animStates.push(["cell_" + cell.y + "_" + cell.x, cell]);
  
    // mark this cell visited
    cell.visited = true;
    
    // get this cell's neighbors in random order
    let randomNeighbors = shuffle(cell.neighbors.slice());

    // find an unvisited neighbor
    let pop = true;
    for (let i = 0; i < randomNeighbors.length && pop; i++) {
      if (randomNeighbors[i] && !randomNeighbors[i].visited) {
        stack.push(randomNeighbors[i]);
        pop = false;
        
        // make a path between current cell and unvisited neighbor                      
        switch (cell.neighbors.indexOf(randomNeighbors[i])) {
          case 0: cell.n = randomNeighbors[i].s = true; break;
          case 1: cell.s = randomNeighbors[i].n = true; break;
          case 2: cell.e = randomNeighbors[i].w = true; break;
          case 3: cell.w = randomNeighbors[i].e = true; break;
          default: console.log("error");
        }
      }
    }
    
    // no valid neighbors were found, pop the stack
    if (pop) stack.pop();
  }
};

// shuffles an array using fisher-yates
function shuffle(arr) {
  let i = arr.length;
  while (i > 0) {
    let r = Math.floor(Math.random() * i--);
    let temp = arr[r];
    arr[r] = arr[i];
    arr[i] = temp;
  }
  return arr;
}