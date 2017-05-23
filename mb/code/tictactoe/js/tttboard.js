"use strict";

/**
 * Class representing tic tac toe game logic 
 */
function TicTacToeBoard() {
  this.xMoves = {};
  this.oMoves = {};
  this.ply = 0;
} // end TicTacToe

// List of win positions in tic tac toe
TicTacToeBoard.winPositions = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

/**
 * Moves the current player to the parameter square
 *
 * @param square the destination square in the range 0-8
 * @return true if move was executed, false otherwise
 */
TicTacToeBoard.prototype.move = function (square) {
  if (square >= 0 && square <= 8) { 
    if (this.ply & 1 && !(square in this.oMoves)) {
      this.oMoves[square] = true;
      this.ply++;
      return true;
    }
    else if (!(this.ply & 1 || square in this.xMoves)) {
      this.xMoves[square] = true;
      this.ply++;
      return true;
    }
  }
  return false;
}; // end move

/**
 * Returns whether the current position has a winner
 *
 * @return true if a player has won, false otherwise
 */
TicTacToeBoard.prototype.isWon = function () {
  if (this.ply >= 5) {
    for (let i = 0; i < TicTacToeBoard.winPositions.length; i++) {
      let xWon = true;
      let oWon = true;
      for (let j = 0; j < TicTacToeBoard.winPositions[i].length && (xWon || oWon); j++) {
        if (!(TicTacToeBoard.winPositions[i][j] in this.xMoves)) {
          xWon = false;
        }
        if (!(TicTacToeBoard.winPositions[i][j] in this.oMoves)) {
          oWon = false;
        }
      }
      if (xWon || oWon) return true;
    }
  }
  return false;
}; // end isWon

/**
 * Determines whether the game is drawn
 * Note: must be called after isWon()
 *
 * @return true if more than 
 */
TicTacToeBoard.prototype.isDrawn = function () {
  return this.ply >= 9;
}; // end isDrawn

/**
 * Returns an array of valid moves for this board
 *
 * @return valid moves array
 */
TicTacToeBoard.prototype.getMoves = function () {
  let xMoves = this.xMoves;
  let oMoves = this.oMoves;
  return [0, 1, 2, 3, 4, 5, 6, 7, 8].filter(function(e) {
    return !(e in xMoves || e in oMoves);
  });
}; // end getMoves

/**
 * Produces a clone of this gamestate
 *
 * @return TicTacToeBoard clone
 */
TicTacToeBoard.prototype.clone = function () {
  let ttt = new TicTacToeBoard();
  ttt.xMoves = JSON.parse(JSON.stringify(this.xMoves));
  ttt.oMoves = JSON.parse(JSON.stringify(this.oMoves));
  ttt.ply = this.ply;
  return ttt;
}; // end clone

/**
 * Scores a won position based on ply
 * @return the score rating
 */
TicTacToeBoard.prototype.scoreWin = function () {
  return 10 - this.ply;
}; // end scoreWin

/**
 * Scores a drawn position
 * @ return the drawn position rating
 */
TicTacToeBoard.prototype.scoreDraw = function () {
  return 0;
}; // end scoreDraw
