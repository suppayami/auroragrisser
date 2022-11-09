import { HomeView } from '@app/modules/home/home.view'
import { render, screen } from '@app/test_utils'

describe('Home View', () => {
	it('should render correctly', () => {
		render(<HomeView />)
		expect(screen.getByText('React Template')).toBeInTheDocument()
	})
})
