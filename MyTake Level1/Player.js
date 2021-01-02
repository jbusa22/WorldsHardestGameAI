import p5 from './sketch'
import Game from './Game'
import Brain from './Brain'
import calculateDistance from './Node'
export default class Player {
  
  constructor(startingTile) {
    let rx = Math.abs(Math.random() * Game.tileSize - Game.playerSize)
    let ry = Math.abs(Math.random() * Game.tileSize - Game.playerSize)
    this.center = p5.createVector(startingTile.pixelPos.x + rx,startingTile.pixelPos.y + ry)
    this.playerSpeed = Game.tileSize/15.0;
    this.vel = p5.createVector(0,0)
    this.red = 69
    this.green = 105
    this.blue = 144
    this.dead = false
    this.brain = new Brain(20)
    this.moveRate = 7
    this.moveCount = 0
    this.reachedGoal = false
  }
  
  show() {
    p5.fill(this.red,this.green,this.blue);
    p5.noStroke()
    p5.rect(this.center.x, this.center.y, Game.playerSize, Game.playerSize)
  }

  setVel(x, y) {
    if (!this.dead) {
      if (this.vel.x + x < this.playerSpeed && this.vel.x + x > -this.playerSpeed)
        this.vel.x += x
      if (this.vel.y + y < this.playerSpeed && this.vel.y + y > -this.playerSpeed)
        this.vel.y += y
    }
  }

  move() {
    // Change velocity every moveRate amount of frames
    if (this.moveCount == this.moveRate) {
      this.moveCount = 0
      if (this.brain.hasStepsLeft()) {
        this.vel = this.brain.nextVel()
      } else {
        this.die()
      }
    } else {
      this.moveCount++
    }
    let temp = p5.createVector(this.vel.x, this.vel.y)
    
    // keep player speed == vel
    temp.normalize()
    temp.mult(this.playerSpeed)
    let bottomRight = p5.createVector(this.center.x + Game.playerSize, this.center.y + Game.playerSize)
    // temp = Game.restrictMovement(this.center, bottomRight, temp)
    
    let surroundingWalls = Game.getSurroundingWalls(Game.getTileFromCoords(this.center.x, this.center.y))
    for (let i = 0; i < surroundingWalls.length; i++) {
      const el = surroundingWalls[i];
      temp = el.restrictMovement(this.center, bottomRight, temp)
    }
    this.center.add(temp)
  }
  
  die() {
    this.dead = true
    this.vel = p5.createVector(0, 0)
    calculateDistance(Game.getTileFromCoords(this.center.x, this.center.y))
  }

  checkReachedGoal() {
    if (Game.getTileFromCoords(this.center.x, this.center.y).type == 'goal') {
      this.reachedGoal = true
      this.vel = p5.createVector(0, 0)
    }
  }

  update() {
    if (!this.dead && !this.reachedGoal) {
      this.move()
      this.checkReachedGoal()
    }
  }
}
