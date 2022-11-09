import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import { App } from '@app/App'
import { HomeView } from '@app/modules/home/home.view'
import { GameView } from '@app/modules/game/game.view'

const routes = (
	<Route path="/" element={<App />}>
		<Route index element={<HomeView />} />
		<Route path="/game" element={<GameView />} />
	</Route>
)

export const router = createBrowserRouter(createRoutesFromElements(routes))
