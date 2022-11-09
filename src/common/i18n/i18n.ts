import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'

export const LANGUAGES = ['en']

// eslint-disable-next-line import/no-named-as-default-member
i18next.use(initReactI18next).init({
	resources: {
		en: {
			translation: en,
		},
	},
	fallbackLng: LANGUAGES[0],
	interpolation: {
		escapeValue: false,
	},
})

export const i18n = i18next
