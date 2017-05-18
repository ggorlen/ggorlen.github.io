"use strict";

/**
 * Tic Tac Toe main game
 */
function TicTacToe (domElement) {
  this.playable = true;
  this.board = new TicTacToeBoard();
  this.negamax = new Negamax();
  this.domElement = domElement;
}; // end TicTacToe

/**
 * Send game as HTML table to DOM element
 */
TicTacToe.prototype.toDOM = function () {
  document.getElementById(this.domElement).innerHTML = this.toHTML();
}; // end toDOM

/**
 * Handles a turn of Tic Tac Toe
 */
TicTacToe.prototype.doTurn = function (square) {
  if (this.playable) {
    this.board.move(square);
    this.board.move(this.negamax.getBestMove(this.board));
    this.toDOM();
    if (this.board.isWon()) {
      let winner = this.board.currentPlayer === "X" ? "O" : "X";
      document.getElementById(this.domElement).innerHTML += 
        "<p>" + winner + " wins! <a href='' onclick='init();'>Play again</a></p>";
      this.playable = false;
    }
    else if (this.board.isDrawn()) {
      document.getElementById(this.domElement).innerHTML += 
        "<p>Draw! <a href='' onclick='init();'>Play again</a></p>";
      this.playable = false;
    }
  }
}; // end doTurn
  
/**
 * Renders the current game board to HTML
 */
TicTacToe.prototype.toHTML = function () {
  let output = "<table>";
  for (let i = 0; i < this.board.position.length; i++) {
    if ((i + 1) % 3 === 1) {
      output += "<tr>";
    }

    if (this.board.position[i] === "X") {
      output += "<td class='x'";
    }
    else if (this.board.position[i] === "O") {
      output += "<td class='o'";
    }
    else {
      output += "<td class='empty' onclick='ttt.doTurn(" + i + ");'";
    }
    output += "></td>";

    if ((i + 1) % 3 === 0) {
      output += "</tr>";
    }
  }
  return output;
}; // end toHTML
