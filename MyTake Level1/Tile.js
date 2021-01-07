import p5 from './sketch'
import Game from './Game'
export default class Tile {
  constructor(x, y) {
    this.centerPoint = p5.createVector(x,y)
    this.pixelPos = p5.createVector(x*Game.tileSize+Game.xoff, y*Game.tileSize + Game.yoff)
    this.bottomRightPos = p5.createVector(x*Game.tileSize+ Game.tileSize+Game.xoff, y*Game.tileSize + Game.yoff + Game.tileSize)
    this.type = 'walkable'
    this.dragChanged = false
    this.red = 0
    this.green = 0
    this.blue = 0
    this.isEdge = false
    this.changeColor()
  }

  show() {
    p5.fill(this.red,this.green,this.blue);
    p5.noStroke()
    p5.rect(this.pixelPos.x, this.pixelPos.y, Game.tileSize, Game.tileSize)
  }

  drag(newType) {
    if (!this.dragChanged && this.type != newType) {
      this.changeType(newType)
      this.dragChanged = true
    }
  }

  clearDrag() {
    this.dragChanged = false
  }
  
  setEdge() {
    this.isEdge = true
    this.type = 'wall'
    this.changeColor()
  }

  changeType(newType) {
    if (this.isEdge)
      return
    this.type = newType
    this.changeColor()
  }

  changeColor() {
    switch (this.type) {
      case 'walkable':
        if ((this.centerPoint.x + this.centerPoint.y) % 2 == 0) {
          this.red = 247
          this.green = 247
          this.blue = 255
        } else {
          this.red = 230
          this.green = 230
          this.blue = 255
        }
        break;
      case 'wall':
        this.red = 200
        this.green = 100
        this.blue = 0
        break;
      case 'goal':
        this.red = 0
        this.green = 255
        this.blue = 0
        break;
      case 'start':
        this.red = 212
        this.green = 180
        this.blue = 131
        break;
      default:
        break;
    }
  }
  
  serializeCoords() {
    return this.centerPoint.y * Game.cols + this.centerPoint.x
  }

  restrictMovement(tl, br, movement) {

    var x = movement.x;
    var y = movement.y;

    var ptl = p5.createVector(tl.x+movement.x, tl.y);
    var pbr = p5.createVector(br.x+movement.x, br.y);

    if ((ptl.x < this.bottomRightPos.x && pbr.x > this.pixelPos.x) &&( ptl.y < this.bottomRightPos.y && pbr.y > this.pixelPos.y)) {
      x=0;
    }

    ptl = p5.createVector(tl.x, tl.y +movement.y);
    pbr = p5.createVector(br.x, br.y + movement.y);
    if ((ptl.x <this.bottomRightPos.x && pbr.x > this.pixelPos.x) &&( ptl.y < this.bottomRightPos.y && pbr.y > this.pixelPos.y)) {
      y=0;
    }

    return p5.createVector(x, y);
  }
}
