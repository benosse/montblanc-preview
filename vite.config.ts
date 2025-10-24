import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

const repo = 'montblanc-preview'

export default defineConfig({
  plugins: [svelte()],
  base: process.env.NODE_ENV === 'production' ? `/${repo}/` : '/',
})
