import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const __dirname = path.resolve(path.dirname(''));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Alias '@' to 'src' folder
    },
  },
  server: {
    host: true,        // equivalent to --host
    watch: {
      usePolling: true // fixes file watching issues in Docker
    }
  }
})
