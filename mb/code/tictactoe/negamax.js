"use strict";

/**
 * Negamax algorithm to find the best move in a 
 * two-player, perfect information game position
 *
 * TODO not yet working
 */
function Negamax() { }

/**
 * Returns best move in this position
 */
Negamax.prototype.getBestMove = function (board) {
  this.board = board;
  this.bestMove;
  this.getBestMoveHelper(this.board, 0, -1);
  return this.bestMove;
}; // end getBestMove

/**
 * Recursive negamax algorithm
 */
Negamax.prototype.getBestMoveHelper = function (node, depth, color) {
  if (node.isWon()) return color;
  if (node.isDrawn()) return 0;

  let bestVal = -2;
  let moves = node.getMoves();
  for (let i = 0; i < moves.length; i++) {
    let nextNode = node.clone();
    nextNode.move(moves[i]);
    let childVal = -this.getBestMoveHelper(nextNode, depth + 1, -color);
    bestVal = Math.max(bestVal, childVal);
    if (depth === 0 && bestVal <= childVal && color === 1) {
      this.bestMove = moves[i];
    }
  }
  return bestVal;
}; // end getBestMoveHelper
