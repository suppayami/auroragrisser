import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import ShieldCheckIcon from '@heroicons/react/24/solid/ShieldCheckIcon'
import { js as Easystar } from 'easystarjs'

import {
	BLOCK_TILE,
	FOREST_TILE,
	getMovableTiles,
	getTileKey,
} from '@app/modules/game/panel_manager'
import type { Point } from '@app/modules/game/panel_manager'

const GRIDS = [
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, FOREST_TILE, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, BLOCK_TILE, 0, 0, 0, 0, 0, 0, BLOCK_TILE, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, FOREST_TILE, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

const START_POINT = [10, 3] as const
const HERO_ICON = '/heroes/Sword of Light and Shadow.png'

const isStartPoint = (x: number, y: number) => x === START_POINT[0] && y === START_POINT[1]
const tilesToDict = (tiles: Point[]) => {
	const result: Record<symbol, boolean> = {}

	for (const tile of tiles) {
		result[getTileKey(tile)] = true
	}

	return result
}

export const GameView = () => {
	const [heroPos] = useState<Point>(() => [...START_POINT])
	const [movePos, setMovePos] = useState<Point>()
	const [easystar] = useState(() => new Easystar())
	const movableTiles = useMemo(
		() => tilesToDict(getMovableTiles(heroPos, { mobility: 5, grid: GRIDS })),
		[heroPos],
	)
	const [moveTiles, setMoveTiles] = useState<Point[]>([])

	useEffect(() => {
		easystar.setGrid(GRIDS)
		easystar.setAcceptableTiles([0, FOREST_TILE])
		easystar.setTileCost(FOREST_TILE, FOREST_TILE)
		easystar.enableSync()
	}, [easystar])

	useEffect(() => {
		if (movePos) {
			easystar.findPath(heroPos[0], heroPos[1], movePos[0], movePos[1], (path) => {
				setMoveTiles(
					path
						.filter((v) => v.x !== heroPos[0] || v.y !== heroPos[1])
						.map((v) => [v.x, v.y]),
				)
			})
			easystar.calculate()
		}
	}, [movePos, heroPos, easystar])

	const prepareMoveHandler = (x: number, y: number) => () => {
		if (movableTiles[getTileKey([x, y])]) {
			setMovePos([x, y])
		}
	}

	return (
		<div className="flex h-[720px] w-[1280px] rounded bg-slate-700 p-4 text-white">
			<div className="flex flex-1 flex-col gap-1 overflow-x-auto">
				{GRIDS.map((row, i) => (
					<div className="flex aspect-square flex-row gap-1" key={`${i}`}>
						{row.map((tile, j) => (
							<div
								key={`${j}-${i}`}
								id={`${j}-${i}`}
								className={clsx(
									'group relative aspect-square basis-0 rounded border',
									tile !== BLOCK_TILE && 'hover:ring hover:ring-red-400',
								)}
								onClick={prepareMoveHandler(j, i)}
							>
								<div className="absolute inset-0">
									{isStartPoint(j, i) && <img src={HERO_ICON} />}
								</div>
								<div className="absolute inset-0">
									{tile === BLOCK_TILE && <XMarkIcon />}
								</div>
								<div className="absolute inset-0">
									{tile === FOREST_TILE && <ShieldCheckIcon />}
								</div>

								<div className="absolute inset-0">
									{j}-{i}
								</div>
								<div
									className={clsx(
										'absolute inset-0 h-full w-full',
										movableTiles[getTileKey([j, i])] &&
											!isStartPoint(j, i) &&
											'bg-green-400/50',
										tile === BLOCK_TILE && 'bg-red-900/50',
										tile !== BLOCK_TILE && 'group-hover:bg-rose-400/30',
										moveTiles.find((p) => p[0] === j && p[1] === i) &&
											'bg-amber-500/50',
									)}
								/>
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	)
}
