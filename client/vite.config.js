import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  css: {
    modules: {
      // BEM-ish readable class names in dev, hashed in prod
      generateScopedName: '[name]__[local]___[hash:base64:5]',
    },
  },
});
