import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [
    svelte()
  ],
  //build: {
  //  lib: {
  //    entry: './src/App.svelte',
  //    formats: ['es'],
  //    name: 'Map3D'
  //  }
  //}
});