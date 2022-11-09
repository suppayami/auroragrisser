import path from 'path'

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@app': path.resolve(__dirname, 'src'),
		},
	},
	test: {
		include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
		environment: 'jsdom',
		globals: true,
		setupFiles: './src/test_setup.ts',
	},
})
