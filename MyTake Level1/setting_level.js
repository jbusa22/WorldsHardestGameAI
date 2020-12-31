import Game from './Game'

document.getElementById("lock").addEventListener("click", (e) => {
  Game.setup()
})

document.querySelectorAll("input[name='tile-gender']").forEach(b => {
    
    b.addEventListener("click", (e) => {
      Game.changeTypeSelected(e.currentTarget.value)
    })
  }
)



document.getElementById("update-col-rows").addEventListener("click", (e) => {
  let newRows = document.querySelector(".rows").value
  let newCols = document.querySelector(".cols").value
  if (newRows && newCols) {
    console.log(newRows, newCols)
    rows = newRows
    cols = newCols
    canvasWidth = tileSize * cols
    canvasHeight = tileSize * rows
    setup()
  }
})

document.querySelector(".start").addEventListener("click", (e) => {
  let newRows = document.querySelector(".rows").value
  let newCols = document.querySelector(".cols").value
  if (newRows && newCols) {
    console.log(newRows, newCols)
    Game.rows = newRows
    Game.cols = newCols
    Game.canvasWidth = tileSize * cols
    Game.canvasHeight = tileSize * rows
    P5.setup()
  }
})
