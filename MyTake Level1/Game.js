import Tile from './Tile'
import Player from './Player'
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
      if (tileInBounds(newI, newJ) && this.tiles[newI][newJ].type != 'wall') {
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
    this.spawnPlayer()
    let graph = createGraph()
    console.log(graph)
  }

  changeTypeSelected(newType) {
    this.typeSelected = newType
  }

  spawnPlayer() {
    if (this.editing) {
      return
    }
    let randomSpawnTile = this.getRandomSpawnTile()
    
    this.player = new Player(randomSpawnTile)
    console.log(this.player)
  }

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
    let keys = this.graph.keys()
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == deathTile.serializeCoords()) {
        initial.push(0)
      } else {
        initial.push(Infinity)
      }
    }
    return initial
  }

}


var instance = new Game();

export default instance;
