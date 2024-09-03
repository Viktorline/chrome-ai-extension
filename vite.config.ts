import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        content: 'src/content.tsx'
      },
      output: {
        format: 'esm',
        entryFileNames: '[name].js',
        dir: 'dist'
      }
    }
  }
})
