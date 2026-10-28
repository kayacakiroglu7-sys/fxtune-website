/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        fxcyan: '#00E8CC',
        fxmagenta: '#9B30FF',
        fxgold: '#FFD700',
        deepspaceblack: '#08080A',
        fxgray: '#111115',
        fxsurface: '#0D0D10',
        fxtxt: '#E8E8EC',
        fxorange: '#FF6B00',
        fxdarkpurple: '#4A00E0',
        electricpurple: '#8E2DE2',
        studioblack: '#0A0A0C',
        studiodark: '#141418',
        studiomid: '#1C1C22',
        studiolight: '#252530',
        studioelevated: '#2A2A35',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'platinum-gradient': 'linear-gradient(135deg, #00E8CC, #9B30FF)',
        'wave-gradient': 'linear-gradient(180deg, #8E2DE2, #4A00E0, #00E8CC)',
        'studio-surface': 'linear-gradient(180deg, #0A0A0C, #141418)',
      },
    },
  },
  plugins: [],
};
