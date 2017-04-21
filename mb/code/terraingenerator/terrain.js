/**
 * Simple ASCII terrain generator
 *
 * todo: allow user to specify terrain types
 */

"use strict";

 
// variables
let height;
let width;
let homogeneity;
let terrainTypes;
let grid;

// initializes the grid state
function init() {
  grid = [];
  for (let i = 0; i < height; i++) {
    grid.push(new Array(width));
  }
  terrainTypes = ["&#9617;", "&#9619;", "&#9618;", "~", 
    ".", "&#8776;", "&#8607;", "&#9650", "&nbsp;"];
}

// creates the terrain
function setTerrain() {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      let neighbors = getNeighbors(i, j);
      let options = terrainTypes;
      for (let i = 0; i < homogeneity; i++) {
        options = options.concat(neighbors);
      }
      grid[i][j] = options[Math.random() * options.length | 0];
    }
  }
}

// gets neighbors for a particular coordinate
function getNeighbors(h, w) {
  let output = [];
  let dirs = [[0, -1], [-1, -1], [-1, 0], [1, -1]];  
  for (let i = 0; i < dirs.length; i++) {
    if (grid[dirs[i][1] + h] && 
        grid[dirs[i][1] + h][dirs[i][0] + w]) {
      output.push(grid[dirs[i][1] + h][dirs[i][0] + w]);
    }
  }
  return output;
}

// render to HTML
function toHTML() {
  let output = "<table>";
  for (let i = 0; i < grid.length; i++) {
    output += "<tr>";
    for (let j = 0; j < grid[i].length; j++) {
      output += "<td>" + grid[i][j] + "</td>";
    }
    output += "</tr>";
  }
  return output + "</table>";
}
