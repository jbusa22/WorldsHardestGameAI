var tiles = []
var tileSize = 50;
var xoff = 0
var yoff = 0

var rows = 10
var cols = 20
var canvasWidth = tileSize * cols
var canvasHeight = tileSize * rows
console.log(canvasHeight, canvasWidth)
function setup() {
  createCanvas(canvasWidth, canvasHeight)

  for (var i = 0; i< rows; i++) {
    tiles[i] = [];
    for (var j = 0; j< cols; j++) {
      tiles[i][j] = new Tile(j, i);
    }
  }
}

function draw() {
  background(255,255,255)
  drawTiles()
}
var iClicked = 0
var jClicked = 0
var turnOn = false
function mousePressed() {
  if (mouseX > xoff && mouseX < xoff + canvasWidth 
      && mouseY > yoff && mouseY < yoff + canvasHeight) {
    iClicked = Math.floor(mouseY / tileSize)
    jClicked = Math.floor(mouseX / tileSize)
    turnOn = tiles[iClicked][jClicked].toggle();
  }
}

var dragging = false
function mouseDragged() {
  if (mouseX > xoff && mouseX < xoff + canvasWidth 
      && mouseY > yoff && mouseY < yoff + canvasHeight) {
    dragging = true
    let i = Math.floor(mouseY / tileSize)
    let j = Math.floor(mouseX / tileSize)
    if (i != iClicked || j != jClicked) {
      tiles[i][j].drag(turnOn);
    }
  } 
}

function mouseReleased() {
  if (dragging) {
    dragging = false
    clearDragging()
  }
}

function clearDragging() {
  for (var i = 0; i< rows; i++) {
    for (var j = 0; j< cols; j++) {
      tiles[i][j].clearDrag();
    }
  }
}

// show all tiles
function drawTiles() {
  for (var i = 0; i< rows; i++) {
    for (var j = 0; j< cols; j++) {
      tiles[i][j].show();
    }
  }
}
