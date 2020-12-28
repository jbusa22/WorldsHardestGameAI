var tiles = []
var tileSize = 50;
var xoff = 200
var yoff = 100


function setup() {
  createCanvas(1280, 720)

  for (var i = 0; i< 22; i++) {
    tiles[i] = [];
    for (var j = 0; j< 10; j++) {
      tiles[i][j] = new Tile(i, j);
    }
  }  
}

function draw() {
  background(255,255,255)
  drawTiles()
}

// show all tiles
function drawTiles() {
  for (var i = 0; i< tiles.length; i++) {
    for (var j = 0; j< tiles[0].length; j++) {
      tiles[i][j].show();
    }
  }
}
