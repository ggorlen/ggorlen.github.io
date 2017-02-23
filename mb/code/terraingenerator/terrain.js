

const HEIGHT = 30;
const WIDTH = 100;
const HOMOGENEITY = 45;

let terrainTypes = ["&#9617;", "&#9619;", "&#9618;", "~", 
                    ".", "&#8776;", "&#8607;", "&#9650", "&nbsp;"];
let grid = [];
for (let i = 0; i < HEIGHT; i++) {
  grid.push(new Array(WIDTH));
}


function setTerrain() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let neighbors = getNeighbors(i, j);
      let options = terrainTypes;
      for (let i = 0; i < HOMOGENEITY; i++) {
        options = options.concat(neighbors);
      }
      let rIdx = Math.floor(Math.random() * options.length)
      grid[i][j] = options[rIdx];
    }
  }
}

function getNeighbors(h, w) {
  let output = [];
  let dirs = [[0, -1], [-1, -1], [-1, 0], [1, -1]];  
  for (let i = 0; i < dirs.length; i++) {
    if (grid[dirs[i][1] + h] && grid[dirs[i][1] + h][dirs[i][0] + w]) {
      output.push(grid[dirs[i][1] + h][dirs[i][0] + w]);
    }
  }
  return output;
}

function print() {
  let output = "<table>";
  for (let i = 0; i < grid.length; i++) {
    output += "<tr>";
    for (let j = 0; j < grid[i].length; j++) {
      output += "<td>" + grid[i][j] + "</td>";
    }
    output += "</tr>";
  }
  document.getElementById("output").innerHTML = output + "</table";
}


setTerrain();
print();