import p5 from './sketch'
import Game from './Game'
import calculateDistance from './Node'
export default class Player {
  
  constructor(startingTile) {
    let rx = Math.abs(Math.random() * Game.tileSize - Game.playerSize)
    let ry = Math.abs(Math.random() * Game.tileSize - Game.playerSize)
    this.center = p5.createVector(startingTile.pixelPos.x + rx,startingTile.pixelPos.y + ry)
    this.red = 69
    this.green = 105
    this.blue = 144
  }
  
  show() {
    p5.fill(this.red,this.green,this.blue);
    p5.noStroke()
    p5.rect(this.center.x, this.center.y, Game.playerSize, Game.playerSize)
  }
  
  die() {
    // calculateDistance(Game.getTileFromCoords(this.center.x, this.center.y))
  }
}
