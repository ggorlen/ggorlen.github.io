/**
 * sokoban solver
 *
 * in progress
 */

// set of visited positions
let visited;
 
// solves a sokoban level if possible
let solve = function(game) {
  visited = {};
  solveHelper(game);
}; // end solve

// recursive helper function for solve
let solveHelper = function(game) {

  console.log(game.level);

  // return true if this position is solved
  if (game.isFinished()) {
    console.log("Done!");
    return true;
  }
  // return false if the position was already visited
  else if (visited[JSON.stringify(game.level)]) {
    return false;
  }
  
  visited[JSON.stringify(game.level)] = true;

  // get list of possible pushes for this position
  let possiblePushes = getPossiblePushes(game);

  console.log(possiblePushes);
  
  // if there are no possible pushes for this position, return false
  if ($.isEmptyObject(possiblePushes)) {
    return false;
  }
  
  // execute each possible push on a copy of the level
  for (let key in possiblePushes) {
    if (possiblePushes.hasOwnProperty(key)) {
      
      // get the string of moves for this position
      let moves = possiblePushes[key];
      let solved = false;
      
      for (let i = 0; i < moves.length; i++) {
          
        // make a copy of the position
        //let gameCopy = this.level.map((a) => a.slice());
        let gameCopy = $.extend(true, {}, game);
        
        // execute move
        if (moves[i] === "u") {
          gameCopy.goTo(key[0], key[1]+1);
          gameCopy.move("u", false);
        }
        else if (moves[i] === "d") {
          gameCopy.goTo(key[0], key[1]-1);
          gameCopy.move("d", false);
        }
        else if (moves[i] === "l") {
          gameCopy.goTo(key[0]+1, key[1]);
          gameCopy.move("l", false);
        }
        else if (moves[i] === "r") {
          gameCopy.goTo(key[0]-1, key[1]);
          gameCopy.move("r", false);
        }
        
        // is the new position solvable?
        solved = solveHelper(gameCopy) ? true : solved;
      }
      return solved;
    }
  }
}; // end solveHelper

// return a hash of possible pushes in a given position in a game
// key: x, y location of pushable box.  value: string of possible pushes as udlr
let getPossiblePushes = function(game) {
  
  // extract position from game object
  let position = game.level;
    
  // find the player location for this position
  let px, py;
  let found = false;
  for (let i = 0; i < position.length && !found; i++) {
    for (let j = 0; j < position[i].length && !found; j++) {
      if (["@", "+"].indexOf(position[i][j]) >= 0) {
        px = j;
        py = i;
        found = true;
      }
    }
  }
  
  // array to store x, y locations of possible pushes for this position
  // along with the direction(s) of the push(es) in udlr format
  let pushLocations = {};
  
  // queue to hold squares pending inspection
  let queue = [];
  
  // hash of visited squares and their parents
  let visited = {};
  
  // enqueue origin, set it as visited and set its parent to null
  queue.push([px, py]);
  visited[px + " " + py] = null;
  
  // while there are still nodes left to visit...
  while (queue.length) {
      
    // dequeue the first item
    let current = queue.shift();

    // is this a pushable box?  if so, add it to the pushLocations list
    // don't enqueue it either way
    if (["$", "*"].indexOf(position[current[1]][current[0]]) >= 0) {
      
      // get the parent of the box to determine which direction we're trying to push from
      let parent = visited[current[0] + " " + current[1]];

      // create the key for the current position
      let pushKey = JSON.stringify([current[0], current[1]]);
      
      // try pushing left
      if (parent[0] > current[0] &&
          [".", " "].indexOf(position[current[1]][current[0]-1]) >= 0) {
        if (pushLocations[pushKey]) {
          pushLocations[pushKey] += "l";
        }
        else {
          pushLocations[pushKey] = "l";
        }
      }
      // try pushing right
      else if (parent[0] < current[0] && 
          [".", " "].indexOf(position[current[1]][current[0]+1]) >= 0) {
        if (pushLocations[pushKey]) {
          pushLocations[pushKey] += "r";
        }
        else {
          pushLocations[pushKey] = "r";
        }
      }
      // try pushing down
      else if (parent[1] < current[1] && 
          [".", " "].indexOf(position[current[1]+1][current[0]]) >= 0) {
        if (pushLocations[pushKey]) {
          pushLocations[pushKey] += "d";
        }
        else {
          pushLocations[pushKey] = "d";
        }
      }                                 
      // try pushing up
      else if (parent[1] > current[1] &&
          [".", " "].indexOf(position[current[1]-1][current[0]]) >= 0) {
        if (pushLocations[pushKey]) {
          pushLocations[pushKey] += "u";
        }
        else {
          pushLocations[pushKey] = "u";
        }
      }
    }
    else {  // not evaluating a box, grab a list of available adjacent squares
      let adjacent = game.getNeighbors(current[0], current[1], [" ", "*", "$", "."]);
      
      // for each unvisited adjacent square or box square, enqueue and set parent
      for (let i = 0; i < adjacent.length; i++) {
        
        // enqueue unvisited squares and box squares already in pushLocations
        // which may have another way to push which needs to be considered
        if (!visited[adjacent[i][0] + " " + adjacent[i][1]] || 
            pushLocations[JSON.stringify(adjacent[i])]) {
          queue.push(adjacent[i]);
        }
        
        // mark this square visited and set its parent to current
        visited[adjacent[i][0] + " " + adjacent[i][1]] = current;
      }
    }
  }
  
  // return the list of possible push locations
  return pushLocations;
}; // end getPossiblePushes