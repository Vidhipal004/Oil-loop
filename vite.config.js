import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    proxy: { '/api': { target: 'http://localhost:4000', changeOrigin: true } }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        dashboard: resolve(process.cwd(), 'dashboard.html'),
        portal: resolve(process.cwd(), 'portal.html'),
        restaurant: resolve(process.cwd(), 'restaurant.html'),
        collector: resolve(process.cwd(), 'collector.html')
      }
    }
  }
});
