import p5 from './sketch'
import Game from './Game'
export default class Tile {
  constructor(x, y) {
    this.centerPoint = p5.createVector(x,y)
    this.pixelPos = p5.createVector(x*Game.tileSize+Game.xoff, y*Game.tileSize + Game.yoff)
    this.type = 'walkable'
    this.dragChanged = false
    this.red = 0
    this.green = 0
    this.blue = 0
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

  changeType(newType) {
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
}
