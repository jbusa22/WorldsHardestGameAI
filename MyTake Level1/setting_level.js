import Game from './Game'
import p5 from './sketch'

document.getElementById("lock").addEventListener("click", (e) => {
  Game.setup()
})

document.getElementById("edit").addEventListener("click", (e) => {
  Game.editLevel()
})

document.querySelectorAll("input[name='tile-gender']").forEach(b => {
    
    b.addEventListener("click", (e) => {
      Game.changeTypeSelected(e.currentTarget.value)
    })
  }
)

document.getElementById("walls-kill").addEventListener("click", (e) => {
  if (Game.editing) {
    Game.wallsKill = !Game.wallsKill
  }
})

document.getElementById("show-best").addEventListener("click", (e) => {
  Game.showBest = !Game.showBest
})


document.getElementById("update-col-rows").addEventListener("click", (e) => {
  let newRows = Number(document.querySelector(".rows").value) + 2
  let newCols = Number(document.querySelector(".cols").value) + 2
  if (newRows && newCols) {
    Game.rows = newRows 
    Game.cols = newCols 
    Game.canvasWidth = Game.tileSize * newCols 
    Game.canvasHeight = Game.tileSize * newRows
    p5.createCanvas(Game.canvasWidth, Game.canvasHeight)
    Game.resetTiles()
    Game.editing = true
  }
})

