import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom'

import { App } from '@app/App'
import { HomeView } from '@app/modules/home/home.view'

const routes = (
	<Route path="/" element={<App />}>
		<Route index element={<HomeView />} />
	</Route>
)

export const router = createBrowserRouter(createRoutesFromElements(routes))
