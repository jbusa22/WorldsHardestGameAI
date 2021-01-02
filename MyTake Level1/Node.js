import Game from './Game'
import PriorityQueue from './PriorityQueue'

export default function dijkstras(deathTile) {
  let visited = new Set()
  let nodeDistances = Game.initializeDis(deathTile)
  let pq = new PriorityQueue()
  nodeDistances.forEach((e, i) => {
    pq.add(i,e)
  });
  while (pq.length() > 0) {
    let [smallestIndex, smallestDistance] = pq.pop()
    visited.add(smallestIndex)
    nodeDistances[smallestIndex] = smallestDistance
    // update distances of adjacent tiles
    let adjacentTiles = Game.getAdjacentWalkableTilesAndWeights(
      Math.floor(smallestIndex / Game.cols), smallestIndex % Game.cols
    )
    let adjacentTileKeys = Object.keys(adjacentTiles)
    for (let i = 0; i < adjacentTileKeys.length; i++) {
      pq.changePriority(Number(adjacentTileKeys[i]), smallestDistance + adjacentTiles[adjacentTileKeys[i]])
    }
  }
  console.log(nodeDistances)
  for (let i = 0; i < nodeDistances.length; i++) {
    let el = nodeDistances[i]
    Game.tiles[Math.floor(i / Game.cols)][i % Game.cols].blue = Math.floor(el / 2500 * 255)
    Game.tiles[Math.floor(i / Game.cols)][i % Game.cols].green = Math.floor(el / 2500 * 255)
    Game.tiles[Math.floor(i / Game.cols)][i % Game.cols].red = Math.floor(el / 2500 * 255)
  }
  return nodeDistances
}
