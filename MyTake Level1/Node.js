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
  return nodeDistances
}
