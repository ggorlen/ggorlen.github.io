"use strict";


// Shuffles an array using Fisher-Yates
function shuffle(arr) {
  let i = arr.length;
  while (i > 0) {
    let r = Math.floor(Math.random() * i--);
    let temp = arr[r];
    arr[r] = arr[i];
    arr[i] = temp;
  }
  return arr;
} // end shuffle


// Randomly chooses an element from an array
function sample(arr) {
  return arr[Math.random() * arr.length | 0];
} // end sample


// Randomly deletes an element from an array
function randPop(arr) {
  return arr.splice((Math.random() * arr.length) | 0, 1)[0];
} // end sample
