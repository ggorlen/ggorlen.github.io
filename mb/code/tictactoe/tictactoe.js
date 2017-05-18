"use strict";


/**
 * Tic tac toe game logic 
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

/**
 * Moves the current player to the parameter 
 * square and switches sides
 */
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

/**
 * Returns whether the current position has a winner
 */
TicTacToe.prototype.isWon = function () {

  // TODO refactor to use sets
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

/**
 * Determines whether the game is drawn
 * Note: must be called after isWon()
 */
TicTacToe.prototype.isDrawn = function () {
  return this.xMoves.length + this.oMoves.length >= 9;
}; // end isDrawn

/**
 * Returns an array of valid moves for this board
 */
TicTacToe.prototype.getMoves = function () {
  let moves = [];
  for (let i = 0; i < this.board.length; i++) {
    if (parseInt(this.board[i]) >= 0) {
      moves.push(i);
    }
  }
  return moves;
}; // end getMoves

/**
 * Renders the current game board to HTML
 */
TicTacToe.prototype.toHTML = function () {
  let output = "<table>";
  for (let i = 0; i < this.board.length; i++) {
    if ((i + 1) % 3 === 1) {
      output += "<tr>";
    }

    if (this.board[i] === "X") {
      output += "<td class='x'";
    }
    else if (this.board[i] === "O") {
      output += "<td class='o'";
    }
    else {
      output += "<td class='empty' onclick='doTurn(" + i + ");'";
    }
    output += "></td>";

    if ((i + 1) % 3 === 0) {
      output += "</tr>";
    }
  }
  return output;
}; // end toHTML

/**
 * Produces a clone of this gamestate
 */
TicTacToe.prototype.clone = function () {
  let ttt = new TicTacToe();
  ttt.board = this.board.slice();
  ttt.xMoves = this.xMoves.slice();
  ttt.oMoves = this.oMoves.slice();
  ttt.currentPlayer = this.currentPlayer;
  return ttt;
}; // end clone
