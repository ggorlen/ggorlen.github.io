"use strict";

/**
 * Minimax algorithm to find the best move in a 
 * two-player, perfect information game position
 */
function Minimax() { }

Minimax.prototype.getBestMove = function (board) {
  this.board = board;
  this.bestMove;
  this.getBestMoveHelper(this.board, 0, true);
  return this.bestMove;
}; // end getBestMove

Minimax.prototype.getBestMoveHelper = function (node, depth, maximizingPlayer) {
  if (node.isWon()) return maximizingPlayer ? -1 : 1; 
  if (node.isDrawn()) return 0;

  if (maximizingPlayer) {
    let bestVal = -2;
    let moves = node.getMoves();
    for (let i = 0; i < moves.length; i++) {
      let nextNode = node.clone();
      nextNode.move(moves[i]);
      let childVal = this.getBestMoveHelper(nextNode, depth + 1, false);
      bestVal = Math.max(bestVal, childVal);
      if (depth === 0 && bestVal <= childVal) {
        this.bestMove = moves[i];
      }
    }
    return bestVal;
  }
  else { // Minimizing player
    let bestVal = 2;
    let moves = node.getMoves();
    for (let i = 0; i < moves.length; i++) {
      let nextNode = node.clone();
      nextNode.move(moves[i]);
      let childVal = this.getBestMoveHelper(nextNode, depth + 1, true);
      bestVal = Math.min(bestVal, childVal);
    }
    return bestVal;
  }
}; // end getBestMoveHelper
