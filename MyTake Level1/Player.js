import p5 from './sketch'
import Game from './Game'
import Brain from './Brain'
import calculateDistance from './Node'
export default class Player {
  
  constructor(startingTile) {
    this.center = p5.createVector(startingTile.pixelPos.x + Game.tileSize / 2 - Game.playerSize / 2,startingTile.pixelPos.y + Game.tileSize / 2 - Game.playerSize / 2)
    this.playerSpeed = Game.tileSize/15.0;
    this.startingTile = startingTile
    this.vel = p5.createVector(0,0)
    this.red = 69
    this.deathTile = null
    this.green = 105
    this.blue = 144
    this.dead = false
    this.brain = new Brain(20)
    this.moveRate = 7
    this.moveCount = 0
    this.deathAtStep = 0
    this.gen = 1
    this.fitness = 0
    this.reachedGoal = false
  }
  
  show() {
    // p5.fill(this.red,this.green,this.blue);
    // p5.noStroke()
    // p5.rect(this.center.x, this.center.y, Game.playerSize, Game.playerSize)
    p5.image(Game.playerImage, this.center.x, this.center.y, Game.playerSize, Game.playerSize)
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
        this.die(false)
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
      if (Game.wallsKill) {
        const el = surroundingWalls[i].restrictMovement(this.center, bottomRight, temp);
        if (temp.x != el.x || temp.y != el.y)
          this.die(true)
      } else {
        const el = surroundingWalls[i]
        temp = el.restrictMovement(this.center, bottomRight, temp)
      }
    }
    this.center.add(temp)
  }
  
  die(collision) {
    this.dead = true
    this.deathAtStep = this.brain.step
    this.deathTile = Game.getTileFromCoords(this.center.x + this.vel.x *-1, this.center.y + this.vel.y *-1)
    this.vel = p5.createVector(0, 0)
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

  getNearestWalkableTile() {
    let attempt = Game.getTileFromCoords(this.center.x, this.center.y)
    if (attempt.type !== 'wall')
      return attempt

    
    if (Math.abs(attempt.pixelPos.x - this.center.x) <  Math.abs(attempt.pixelPos.y - this.center.y)) {
      let bl = p5.createVector(attempt.pixelPos.x, attempt.pixelPos.y + Game.tileSize)
      if (Math.abs(bl.x - this.center.x) >  Math.abs(bl.y - this.center.y)) {
        return Game.tiles[attempt.centerPoint.y + 1][attempt.centerPoint.x]
      } else {
        return Game.tiles[attempt.centerPoint.y][attempt.centerPoint.x - 1]
      }
    } else {
      let tr = p5.createVector(attempt.pixelPos.x + Game.tileSize, attempt.pixelPos.y)
      if (Math.abs(tr.x - this.center.x) >  Math.abs(tr.y - this.center.y)) {
        return Game.tiles[attempt.centerPoint.y - 1][attempt.centerPoint.x]
      } else {
        return Game.tiles[attempt.centerPoint.y][attempt.centerPoint.x + 1]
      }
    }
  }

  getDistanceToClosestGoal() {
    let distances = calculateDistance(this.deathTile);
    let goalTiles = Game.getGoalTiles()
    let smallestDist = Infinity
    for (let i = 0; i < goalTiles.length; i++) {
      const tile = goalTiles[i];
      let dist = distances[tile.serializeCoords()]
      if (dist < smallestDist) {
        smallestDist = dist
      }
    }
    return smallestDist
  }

  calculateFitness() {
    if (this.reachedGoal) {//if the dot reached the goal then the fitness is based on the amount of steps it took to get there
      this.fitness = 1.0/16.0 + 10000.0/(this.brain.step * this.brain.step);
    } else {//if the dot didn't reach the goal then the fitness is based on how close it is to the goal
      var estimatedDistance = this.getDistanceToClosestGoal() / Game.defaultWeight//the estimated distance of the path from the player to the goal
      // TODO
      // if (this.deathByDot) {
      //   estimatedDistance *= 0.9;
      // }
      this.fitness = 1.0/(estimatedDistance * estimatedDistance);
    }
    this.fitness*=this.fitness;
  }
  
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
   gimmeBaby() {
    var baby = new Player(this.startingTile);
    baby.brain = this.brain.clone();//babies have the same brain as their parents
    // TODO
    // baby.deathByDot = this.deathByDot;
    baby.deathAtStep = this.deathAtStep;
    baby.gen = this.gen;
    return baby;
  }
}
