class Tile {
  constructor(x, y) {
    this.centerPoint = createVector(x,y)
    this.pixelPos = createVector(x*tileSize+xoff, y*tileSize + yoff)
  }
  show(){
    if ((this.centerPoint.x +this.centerPoint.y) % 2 ==0) {
     fill(247,247,255);
    } else {
      fill(230,230,255);
    }
    noStroke()
    rect(this.pixelPos.x, this.pixelPos.y, tileSize, tileSize)
  }

}
