"use strict";

/**
 * Negamax algorithm to find the best move in a 
 * two-player, perfect information game position
 */
function Negamax() { }

/**
 * Determines the best move in the position by
 * performing a DFS with alpha-beta pruning
 *
 * @param  originNode the origin position of the search
 * @return the best move in the position
 */
Negamax.prototype.getBestMove = function (originNode) {
  this.getBestMoveHelper(originNode, 0, -Infinity, Infinity);
  return this.bestMove;
}; // end getBestMove

/**
 * Recursive negamax algorithm
 *
 * @param node  the origin position of the search
 * @param depth the search depth in the tree
 * @param a     alpha value
 * @param b     beta value
 * @return the best value in the position
 */
Negamax.prototype.getBestMoveHelper = function (node, depth, a, b) {

  // Return the node's value if the position is terminal
  if (node.isWon()) return -node.scoreWin();
  if (node.isDrawn()) return node.scoreDraw();

  // Set the best value low
  let bestVal = -Infinity;

  let moves = node.getMoves();
  for (let i = 0; i < moves.length; i++) {

    // Execute each move in the position on a copy node
    let nextNode = node.clone();
    nextNode.move(moves[i]);

    // Determine the value for this child
    let childVal = -this.getBestMoveHelper(nextNode, depth + 1, -b, -a);

    // Set best values and alpha based on this child's evaluation
    a = Math.max(a, childVal);

    if (bestVal < childVal) {
        bestVal = childVal;
        if (depth === 0) {
          this.bestMove = moves[i];
        }
    }
    
    // Abandon searching this node if child node
    // evaluation is outside alpha beta range
    if (a >= b) break;
  }
  return bestVal;
}; // end getBestMoveHelper
