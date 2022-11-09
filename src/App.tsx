import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient()

export function App() {
	return (
		<QueryClientProvider client={client}>
			<div className="flex flex-1 flex-col items-center justify-center bg-slate-900">
				<Outlet />
			</div>
		</QueryClientProvider>
	)
}
