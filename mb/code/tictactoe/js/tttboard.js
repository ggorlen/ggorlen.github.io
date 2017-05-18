"use strict";


/**
 * Tic tac toe game logic 
 */
function TicTacToeBoard() {
  this.winPositions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
  ];
  this.position = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  this.xMoves = [];
  this.oMoves = [];
  this.currentPlayer = "X";
} // end TicTacToe

/**
 * Moves the current player to the parameter 
 * square and switches sides
 */
TicTacToeBoard.prototype.move = function (square) {
  if (parseInt(this.position[square]) >= 0) {
    this.position[square] = this.currentPlayer;
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
TicTacToeBoard.prototype.isWon = function () {

  // TODO refactor to use sets
  for (let i = 0; i < this.winPositions.length; i++) {
    let xWon = true;
    let oWon = true;
    for (let j = 0; j < this.winPositions[i].length && (xWon || oWon); j++) {
      if (this.xMoves.indexOf(this.winPositions[i][j]) < 0) {
        xWon = false;
      }
      if (this.oMoves.indexOf(this.winPositions[i][j]) < 0) {
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
TicTacToeBoard.prototype.isDrawn = function () {
  return this.xMoves.length + this.oMoves.length >= 9;
}; // end isDrawn

/**
 * Returns an array of valid moves for this board
 */
TicTacToeBoard.prototype.getMoves = function () {
  let moves = [];
  for (let i = 0; i < this.position.length; i++) {
    if (parseInt(this.position[i]) >= 0) {
      moves.push(i);
    }
  }
  return moves;
}; // end getMoves

/**
 * Produces a clone of this gamestate
 */
TicTacToeBoard.prototype.clone = function () {
  let ttt = new TicTacToeBoard();
  ttt.position = this.position.slice();
  ttt.xMoves = this.xMoves.slice();
  ttt.oMoves = this.oMoves.slice();
  ttt.currentPlayer = this.currentPlayer;
  return ttt;
}; // end clone
