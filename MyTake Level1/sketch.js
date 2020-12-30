import Game from './Game.js'
import * as p5 from './libraries/p5';

let s = (sk) => {    

  sk.setup = () =>{
    sk.createCanvas(Game.canvasWidth, Game.canvasHeight)
    console.log(Game)
    Game.resetTiles()
  }

  sk.draw = () => {
    sk.background(255,255,255)
    Game.drawTiles()
  }

  sk.mousePressed = () => {
    let selectedTile = Game.getTileFromCoords(sk.mouseX, sk.mouseY)
    if (selectedTile)
      Game.turnOnTile(selectedTile)
  }

  sk.mouseReleased = () => {
    Game.clearDragging()
  }

  sk.mouseDragged = () => {
    Game.mouseDragged(sk.mouseX, sk.mouseY)
  }
}
const P5 = new p5(s);

// document.getElementById("update-col-rows").addEventListener("click", (e) => {
//   let newRows = document.querySelector(".rows").value
//   let newCols = document.querySelector(".cols").value
//   if (newRows && newCols) {
//     console.log(newRows, newCols)
//     rows = newRows
//     cols = newCols
//     canvasWidth = tileSize * cols
//     canvasHeight = tileSize * rows
//     setup()
//   }
// })

// document.querySelector(".start").addEventListener("click", (e) => {
//   let newRows = document.querySelector(".rows").value
//   let newCols = document.querySelector(".cols").value
//   if (newRows && newCols) {
//     console.log(newRows, newCols)
//     Game.rows = newRows
//     Game.cols = newCols
//     Game.canvasWidth = tileSize * cols
//     Game.canvasHeight = tileSize * rows
//     P5.setup()
//   }
// })

export default P5;
