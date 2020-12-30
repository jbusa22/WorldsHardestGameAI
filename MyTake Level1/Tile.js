class Tile {
  constructor(x, y) {
    this.centerPoint = createVector(x,y)
    this.pixelPos = createVector(x*tileSize+xoff, y*tileSize + yoff)
    this.toggled = false
    this.dragChanged = false
    if ((this.centerPoint.x +this.centerPoint.y) % 2 ==0) {
      this.red = 247
      this.unSelectedRed = 247
      this.green = 247
      this.blue = 255
    } else {
      this.red = 230
      this.unSelectedRed = 230
      this.green = 230
      this.blue = 255
    }
  }
  show(){
    fill(this.red,this.green,this.blue);
    noStroke()
    rect(this.pixelPos.x, this.pixelPos.y, tileSize, tileSize)
  }
  drag(turnOn) {
    if (!this.dragChanged && this.toggled != turnOn) {
      this.toggle()
      this.dragChanged = true
    }
  }
  clearDrag() {
    this.dragChanged = false
  }
  toggle() {
      this.toggled = !this.toggled
      this.red = this.toggled ? 0 : this.unSelectedRed
      return this.toggled
  }

}
