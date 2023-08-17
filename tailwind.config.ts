import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'icarus-purple': '#7067CF',
        'icarus-light-purple': '#E9D5FF',
        'icarus-yellow': '#FFF56D',
        'icarus-grey': '#C8C6D7',
        'icarus-red': '#CC5A71',
        'icarus-white': '#F5F5F5',
      },
    },
  },
  plugins: [],
};
export default config;
