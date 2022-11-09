export type Point = [number, number]
export const BLOCK_TILE = 1
export const FOREST_TILE = 2

const newPoint = (x: number, y: number): Point => [x, y]

const getAdjacentTiles = (p: Point): Point[] =>
	[
		newPoint(p[0] - 1, p[1]),
		newPoint(p[0] + 1, p[1]),
		newPoint(p[0], p[1] - 1),
		newPoint(p[0], p[1] + 1),
	].filter(([x, y]) => x >= 0 && y >= 0)

export const getTileKey = (p: Point) => Symbol.for(`${p[0]} - ${p[1]}`)

export const getMovableTiles = (start: Point, options: { mobility: number; grid: number[][] }) => {
	const open: Point[] = []
	const result: Point[] = []
	const checkedPoints: Record<symbol, boolean> = {}
	const closePointCheck: Record<symbol, boolean> = {}
	const costs: Record<symbol, number> = {}
	const MAX_WIDTH = options.grid[0].length
	const MAX_HEIGHT = options.grid.length

	let current: Point | undefined = start

	while (current) {
		const adjacentTiles = getAdjacentTiles(current)
		// start point put to close
		closePointCheck[getTileKey(current)] = true

		if (costs[getTileKey(current)] >= options.mobility) {
			current = open.shift()
			continue
		}

		// TODO: Calculate costs & block tiles
		for (const tile of adjacentTiles) {
			const check = getTileKey(tile)
			const isTileInOpen = !!open.find(
				(point) => point[0] === tile[0] && point[1] === tile[1],
			)

			// Out of bound
			if (tile[0] >= MAX_WIDTH || tile[1] >= MAX_HEIGHT) {
				continue
			}

			if (options.grid[tile[1]][tile[0]] === BLOCK_TILE) {
				continue
			}

			const cost = options.grid[tile[1]][tile[0]] || 1
			const tileCost = costs[getTileKey(tile)] || 0
			const currentCost = (costs[getTileKey(current)] || 0) + cost

			if (isTileInOpen) {
				costs[getTileKey(tile)] = Math.min(tileCost, currentCost)
			} else {
				costs[getTileKey(tile)] = currentCost
			}

			// Recheck if costs exceed mobility
			if (costs[getTileKey(tile)] > options.mobility) {
				continue
			}

			if (!closePointCheck[getTileKey(tile)]) {
				if (!isTileInOpen) {
					open.push(tile)
				}
			}

			if (!checkedPoints[check]) {
				result.push(tile)
			}

			checkedPoints[check] = true
		}

		current = open.shift()
		if (current && costs[getTileKey(current)] >= options.mobility) {
			closePointCheck[getTileKey(current)] = true
		}
	}

	return result
}
