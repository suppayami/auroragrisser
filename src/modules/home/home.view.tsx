import { useTranslation } from 'react-i18next'

export const HomeView = () => {
	const [translate] = useTranslation()

	return (
		<div className="flex flex-col items-center justify-center gap-2 rounded bg-gray-700 p-4 text-white shadow-lg shadow-slate-700">
			<h1 className="text-xl font-bold">{translate('home.title')}</h1>
			<p className="text-lg text-white/70">{translate('home.description')}</p>
		</div>
	)
}
