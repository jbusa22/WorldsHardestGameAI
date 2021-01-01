import Game from './Game'
import PriorityQueue from './PriorityQueue'

export default function dijkstras(deathTile) {
  let visited = new Set()
  let nodeDistances = Game.initializeDis(deathTile)
  let pq = new PriorityQueue()
  nodeDistances.forEach((e, i) => {
    pq.add(i,e)
  });
  debugger
  while (pq.length > 0) {
    let [smallestIndex, smallestDistance] = pq.pop()
    visited.add(smallestIndex)
    nodeDistances[smallestIndex] = smallestDistance
    // update distances of adjacent tiles
    let adjacentTiles = Game.getAdjacentWalkableTilesAndWeights(
      Math.floor(smallestIndex / Game.rows), smallestIndex % Game.rows
    )
    let adjacentTileKeys = adjacentTiles.keys()
    for (let i = 0; i < adjacentTileKeys.length; i++) {
      pq.changePriority(adjacentTileKeys[i], smallestDistance + adjacentTiles[adjacentTileKeys])
    }
  }
  console.log(nodeDistances)
  return nodeDistances
}
