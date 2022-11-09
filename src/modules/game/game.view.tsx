import { useMemo, useState } from 'react'
import clsx from 'clsx'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'
import ShieldCheckIcon from '@heroicons/react/24/solid/ShieldCheckIcon'

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
	const [heroPos, setHeroPos] = useState<Point>(() => [...START_POINT])
	const movableTiles = useMemo(
		() => tilesToDict(getMovableTiles(heroPos, { mobility: 5, grid: GRIDS })),
		[heroPos],
	)

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
							>
								{isStartPoint(j, i) && <img src={HERO_ICON} />}
								{tile === BLOCK_TILE && <XMarkIcon />}
								{tile === FOREST_TILE && <ShieldCheckIcon />}
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
