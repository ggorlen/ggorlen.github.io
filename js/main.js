"use strict";

const height = 6;
const width = 23;
const palette = {
  topLCorner: "\u2554",
  topRCorner: "\u2557",
  btmLCorner: "\u255a",
  btmRCorner: "\u255d",
  hLine: "\u2550",
  vLine: "\u2551",
  shade: "\u2591"
};

const res = [];

res.push(palette.topLCorner);

for (let j = 0; j < width; j++) {
  res.push(palette.hLine);
}

res.push(palette.topRCorner);
res.push("<br>");

[
  " ".repeat(width),
  "         hello!        ",
  " ".repeat(width),
  "  ++++++++++[>+++++++  ",
  "  +++>+++++++++++>+++  ",
  "  +++>+++++<<<<-]>+++  ",
  "  .>+++++.<.>----.+++  ",
  "  .<+++++.-------.>--  ",
  "  --.>++++.<<++.>-.<-  ",
  "  -----.>----.+++.>>-  ",
  "  ---.<<<++.>+++.--.   ",
  " ".repeat(width),
].forEach(e => 
  res.push(
    palette.vLine + e + palette.vLine + 
    palette.shade + palette.shade + "<br>"
  )
);

res.push(palette.btmLCorner);

for (let j = 0; j < width; j++) {
  res.push(palette.hLine);
}

res.push(palette.btmRCorner);
res.push(palette.shade);
res.push(palette.shade);
res.push("<br>");
res.push("   ");

for (let j = 0; j <= width; j++) {
  res.push(palette.shade);
}

document.getElementById("main").innerHTML = res.join("");
