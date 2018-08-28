"use strict";

const height = 5;
const width = 20;
const palette = {
  topLCorner: "\u250c",
  topRCorner: "\u2510",
  btmLCorner: "\u2514",
  btmRCorner: "\u2518",
  hLine: "\u2500",
  vLine: "\u2502",
  shade: "\u2591"
};

const res = [];

res.push(palette.topLCorner);

for (let j = 0; j < width; j++) {
  res.push(palette.hLine);
}

res.push(palette.topRCorner);
res.push("<br>");

for (let i = 0; i < 3; i++) {
  res.push(palette.vLine);

  if (i === 1) {
    res.push("    hello world     ");
  }
  else {
    res.push("                    ");
  }

  res.push(palette.vLine);

  if (i > 0) {
    res.push(palette.shade);
    res.push(palette.shade);
  }
  
  res.push("<br>");
}

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
