import Game from './Game.js'
import * as p5 from './libraries/p5';
import * as listeners from './setting_level' 
import calculateDistance from './Node'

// need to import listeners for webpack to add this to bundle

let s = (sk) => {    

  sk.setup = () =>{
    sk.createCanvas(Game.canvasWidth, Game.canvasHeight)
    Game.resetTiles()
    calculateDistance(Game.tiles[0][0])
  }

  sk.draw = () => {
    sk.background(255,255,255)
    Game.drawTiles()
    Game.drawPlayer()
  }

  sk.mousePressed = () => {
    if (Game.editing) {
      let selectedTile = Game.getTileFromCoords(sk.mouseX, sk.mouseY)
      if (selectedTile)
        Game.turnOnTile(selectedTile)
    }
  }

  sk.mouseReleased = () => {
    if (Game.editing)
      Game.clearDragging()
  }

  sk.mouseDragged = () => {
    if (Game.editing)
      Game.mouseDragged(sk.mouseX, sk.mouseY)
  }
}
const P5 = new p5(s);



export default P5;
