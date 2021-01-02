import Player from './Player'
import calculateDistance from './Node'
import Game from './Game'
import p5 from './sketch'

export default class HumanPlayer extends Player {
  constructor(start) {
    super(start)
  }
  
  die() {
    this.dead = true
    this.vel = p5.createVector(0, 0)
    let dist = calculateDistance(Game.getTileFromCoords(this.center.x, this.center.y))
    Game.showDistancesOnTiles(dist)
  }

  move() {
    let temp = p5.createVector(this.vel.x, this.vel.y)
    
    // keep player speed == vel
    temp.normalize()
    temp.mult(this.playerSpeed)
    let bottomRight = p5.createVector(this.center.x + Game.playerSize, this.center.y + Game.playerSize)
    // temp = Game.restrictMovement(this.center, bottomRight, temp)
    
    let surroundingWalls = Game.getSurroundingWalls(Game.getTileFromCoords(this.center.x, this.center.y))
    for (let i = 0; i < surroundingWalls.length; i++) {
      const el = surroundingWalls[i].restrictMovement(this.center, bottomRight, temp);
      if (temp.x != el.x || temp.y != el.y) {
        this.die()
      }
    }
    this.center.add(temp)
  }
}
