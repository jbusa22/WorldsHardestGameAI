import Game from './Game'
// start at where you died
// use dfs recurse to 

// current node is serialized into a single number rows * cols + cols
export default function createGraph() {
  let graph = {}
  for (let i = 0; i < Game.rows; i++) {
    for (let j = 0; j < Game.cols; j++) {
      let serializedCoords = i * Game.cols + j
      let adjacentTiles = Game.getAdjacentWalkableTilesAndWeights(i, j)
      graph[serializedCoords] = adjacentTiles
    }
  }
  return graph
}
