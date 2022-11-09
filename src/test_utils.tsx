/* eslint-disable import/export */
import type { PropsWithChildren, ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'
import { render } from '@testing-library/react'

import { i18n } from '@app/common/i18n/i18n'

const Providers = ({ children }: PropsWithChildren) => {
	return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}

const customRender = (ui: ReactElement, options = {}) =>
	render(ui, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
