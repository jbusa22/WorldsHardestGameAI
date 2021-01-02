import Tile from './Tile'
import Player from './Player'
import HumanPlayer from './HumanPlayer'
import createGraph from './Graph'
class Game {
  constructor(){
    if(!Game.instance){
      this.tiles = [];
      this.tileSize = 50;
      this.xoff = 0;
      this.yoff = 0;
      this.rows = 10;
      this.cols = 20;
      this.canvasHeight = this.tileSize * this.rows;
      this.canvasWidth = this.tileSize * this.cols;
      this.iClicked = 0
      this.jClicked = 0
      this.turnOn = false
      this.dragging = false
      this.editing = true
      this.playerSize = 20
      this.defaultWeight = 100
      this.typeSelected = 'wall'
      this.graph = null
      this.player = null
      this.humanPlaying = false
      Game.instance = this;
    }
    return Game.instance;
  }

  resetTiles() {
    for (var i = 0; i< this.rows; i++) {
      this.tiles[i] = [];
      for (var j = 0; j< this.cols; j++) {
        this.tiles[i][j] = new Tile(j, i);
      }
    }
  }

  drawTiles() {
    for (var i = 0; i< this.rows; i++) {
      for (var j = 0; j< this.cols; j++) {
        this.tiles[i][j].show();
      }
    }
  }

  updatePlayer() {
    if (this.player) {
      this.player.update()
    }
  }

  drawPlayer() {
    if (this.player) {
      this.player.show()
    }
  }

  getTileFromCoords(mouseX, mouseY) {
    if (this.inBounds(mouseX, mouseY)) {
      this.iClicked = Math.floor(mouseY / this.tileSize)
      this.jClicked = Math.floor(mouseX / this.tileSize)
      return this.tiles[this.iClicked][this.jClicked]
    }
  }
  
  turnOnTile(selectedTile) {
    selectedTile.changeType(this.typeSelected);
  }
  
  clearDragging() {
    if (!this.dragging) {
      return
    }
    
    this.dragging = false
    for (var i = 0; i< this.rows; i++) {
      for (var j = 0; j< this.cols; j++) {
        this.tiles[i][j].clearDrag();
      }
    }
  }

  inBounds(mouseX, mouseY) {
    return mouseX > this.xoff && mouseX < this.xoff + this.canvasWidth 
        && mouseY > this.yoff && mouseY < this.yoff + this.canvasHeight
  }

  // creates an object like so {12:100,13:100}
  getAdjacentWalkableTilesAndWeights(i, j) {
    let adjacentTiles = {}
    let diffs = [[-1 , 0], [1, 0], [0, -1], [0, 1]]
    for (let k = 0; k < diffs.length; k++) {
      let newI = i + diffs[k][0]
      let newJ = j + diffs[k][1]
      if (this.tileInBounds(newI, newJ) && this.tiles[newI][newJ].type != 'wall') {
        let serializedCoords = newI * this.cols + newJ
        adjacentTiles[serializedCoords] = this.defaultWeight
      }
    }
    return adjacentTiles
  }

  tileInBounds(i, j) {
    return i >= 0 && i < this.rows && j >= 0 && j < this.cols
  }

  mouseDragged(mouseX, mouseY) {
    if (this.inBounds(mouseX, mouseY)) {
      this.dragging = true
      let i = Math.floor(mouseY / this.tileSize)
      let j = Math.floor(mouseX / this.tileSize)
      if (i != this.iClicked || j != this.jClicked) {
        this.tiles[i][j].drag(this.typeSelected);
      }
    }
    
  }

  setup() {
    this.editing = false
    this.graph = createGraph()
    this.humanPlaying = true
    this.spawnPlayer()
  }

  changeTypeSelected(newType) {
    this.typeSelected = newType
  }

  spawnPlayer() {
    if (this.editing) {
      return
    }
    let randomSpawnTile = this.getRandomSpawnTile()
    if (this.humanPlaying) {
      this.player = new HumanPlayer(randomSpawnTile)
    } else {
      this.player = new Player(randomSpawnTile)
    }
  }

  showDistancesOnTiles(nodeDistances) {
    let maxDist = 1 
    for (let i = 0; i < nodeDistances.length; i++) {
      const el = nodeDistances[i];
      if (el != Infinity && el > maxDist) {
        maxDist = el
      }
    }
    
    for (let i = 0; i < nodeDistances.length; i++) {
      let el = nodeDistances[i]
      let val = Math.floor(el / (maxDist + 100) * 255)
      let tile = this.tiles[Math.floor(i / this.cols)][i % this.cols]
      if (tile.type != "goal") {
        tile.blue = val
        tile.green = val
        tile.red = val
      }
    }
  }
  
  // restrictMovement(tl, br, movement) {

  //   var x = movement.x;
  //   var y = movement.y;

  //   var ptl = p5.createVector(tl.x+movement.x, tl.y);
  //   var pbr = p5.createVector(br.x+movement.x, br.y);

  //   if ((ptl.x < this.bottomRightPos.x && pbr.x > this.pixelPos.x) &&( ptl.y < this.bottomRightPos.y && pbr.y > this.pixelPos.y)) {
  //     x=0;
  //   }

  //   ptl = p5.createVector(tl.x, tl.y +movement.y);
  //   pbr = p5.createVector(br.x, br.y + movement.y);
  //   if ((ptl.x <this.bottomRightPos.x && pbr.x > this.pixelPos.x) &&( ptl.y < this.bottomRightPos.y && pbr.y > this.pixelPos.y)) {
  //     y=0;
  //   }

  //   return p5.createVector(x, y);
  // }

  getRandomSpawnTile() {
    let spawnTiles = []
    for (var i = 0; i< this.rows; i++) {
      for (var j = 0; j< this.cols; j++) {
        if (this.tiles[i][j].type == 'start')
          spawnTiles.push(this.tiles[i][j])
      }
    }
    return spawnTiles[Math.floor(Math.random() * spawnTiles.length)]
  }
  
  initializeDis(deathTile) {
    let initial = []
    let keys = Object.keys(this.graph)
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == deathTile.serializeCoords()) {
        initial.push(0)
      } else {
        initial.push(Infinity)
      }
    }
    return initial
  }

  getSurroundingWalls(tile) {
    let surroundingWalls = []
    if (tile.type == 'wall')
      surroundingWalls.push(tile)
    let diffs = [[-1, 0], [-1, -1], [-1, 1], [1, 1], [1, -1], [1, 0], [0, -1], [0, 1]]
    for (let k = 0; k < diffs.length; k++) {
      let newJ = tile.centerPoint.x + diffs[k][0]
      let newI = tile.centerPoint.y + diffs[k][1]
      if (this.tileInBounds(newI, newJ) && this.tiles[newI][newJ].type == 'wall') {
        surroundingWalls.push(this.tiles[newI][newJ])
      }
    }
    return surroundingWalls
  }
}


var instance = new Game();

export default instance;
