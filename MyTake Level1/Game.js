import Tile from './Tile'
import Player from './Player'
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

}


var instance = new Game();

export default instance;
