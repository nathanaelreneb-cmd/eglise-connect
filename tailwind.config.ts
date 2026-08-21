import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        eglise: {
          50: '#f5f3ff',
          600: '#5b21b6',
          700: '#4c1d95',
        },
      },
    },
  },
  plugins: [],
}
export default config
