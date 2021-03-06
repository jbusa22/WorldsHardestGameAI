import Tile from './Tile'
import Player from './Player'
import HumanPlayer from './HumanPlayer'
import createGraph from './Graph'
import Population from './Population';
class Game {
  constructor() {
    if(!Game.instance) {
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
      this.wallsKill = false
      this.defaultWeight = 10
      this.typeSelected = 'wall'
      this.showBest = false
      this.graph = null
      this.player = null
      this.humanPlaying = false
      this.populationSize = 200
      this.showDeathPath = true
      this.evolutionSpeed = 1
      this.testPopulation = null
      this.mutationRate = 0.02;
      this.playerImage = null
      Game.instance = this;
    }
    return Game.instance;
  }

  editLevel() {
    this.editing = true
    this.testPopulation = null
    this.graph = null
    this.player = null
  }

  resetTiles() {
    for (var i = 0; i < this.rows; i++) {
      this.tiles[i] = [];
      for (var j = 0; j< this.cols; j++) {
        this.tiles[i][j] = new Tile(j, i);
      }
    }
    // set walls
    for (var i = 0; i < this.rows; i++) {
      this.tiles[i][0].setEdge()
      this.tiles[i][this.cols - 1].setEdge()
    }
    for (var j = 0; j < this.cols; j++) {
      this.tiles[0][j].setEdge()
      this.tiles[this.rows - 1][j].setEdge()
    }
  }

  setPlayerImage(img) {
    this.playerImage = img
  }

  drawTiles() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.tiles[i][j].show();
      }
    }
  }
  
  drawEdges() {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.tiles[i][j].type !== 'wall')
          this.tiles[i][j].showEdges();
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
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
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
    this.spawnPlayer()
  }

  changeTypeSelected(newType) {
    this.typeSelected = newType
  }

  getGoalTiles() {
    let goalTiles = []
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (this.tiles[i][j].type == 'goal')
          goalTiles.push(this.tiles[i][j])
      }
    }
    return goalTiles
  }

  spawnPlayer() {
    if (this.editing) {
      return
    }
    
    if (this.humanPlaying) {
      let randomSpawnTile = this.getRandomSpawnTile()
      this.player = new HumanPlayer(randomSpawnTile)
    } else {
      this.testPopulation = new Population(this.populationSize)
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


  trainNormally() {
    if (this.testPopulation.allPlayersDead()) {
      //genetic algorithm
      this.testPopulation.calculateFitness();
      this.testPopulation.naturalSelection();
      this.testPopulation.mutateDemBabies();
      //reset dots
    //  resetDots();

      //every 5 generations incease the number of moves by 5
      if (this.testPopulation.gen % 5 ==0) {
        this.testPopulation.increaseMoves();
      }

    } else {

      // moveAndShowDots();
      //update and show population

      for(var j = 0 ; j < this.evolutionSpeed; j++){
        // for (var i = 0; i < dots.length; i ++) {
        //   dots[i].move();
        // }
        this.testPopulation.update();
      }

      // for (var i = 0; i < dots.length; i ++) {
      //   dots[i].show();
      // }
      this.testPopulation.show();
    }
  }
}


var instance = new Game();

export default instance;
