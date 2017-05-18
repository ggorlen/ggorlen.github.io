"use strict";


/**
 * Tic tac toe
 */
function TicTacToe() {
  this.wins = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];
  this.board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  this.xMoves = [];
  this.oMoves = [];
  this.currentPlayer = "X";
} // end TicTacToe

TicTacToe.prototype.move = function (square) {
  if (parseInt(this.board[square]) >= 0) {
    this.board[square] = this.currentPlayer;
    if (this.currentPlayer === "X") {
      this.xMoves.push(square);
    }
    else {
      this.oMoves.push(square);
    }
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    return true;
  }
  return false;
}; // end move

// TODO refactor to use sets
TicTacToe.prototype.isWon = function () {
  for (let i = 0; i < this.wins.length; i++) {
    let xWon = true;
    let oWon = true;
    for (let j = 0; j < this.wins[i].length; j++) {
      if (this.xMoves.indexOf(this.wins[i][j]) < 0) {
        xWon = false;
      }
      if (this.oMoves.indexOf(this.wins[i][j]) < 0) {
        oWon = false;
      }
    }
    if (xWon || oWon) return true;
  }
  return false;
}; // end isWon

TicTacToe.prototype.toHTML = function () {
  let output = "<table>";
  for (let i = 0; i < this.board.length; i++) {
    if ((i + 1) % 3 === 1) {
      output += "<tr>";
    }

    if (this.board[i] === "X") {
      output += "<td class='x'></td>";
    }
    else if (this.board[i] === "O") {
      output += "<td class='o'></td>";
    }

    if ((i + 1) % 3 === 0) {
      output += "</tr>";
    }
  }
  return output;
}; // end toHTML


let ttt = new TicTacToe();
ttt.move(0);
ttt.move(8);
ttt.move(1);
ttt.move(4);
ttt.move(2);
console.log(ttt.isWon());
document.getElementById("tttout").innerHTML = ttt.toHTML();
