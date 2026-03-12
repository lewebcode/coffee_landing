import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  optimizeDeps: {
    include: ['swiper'],
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
    assetsDir: 'assets',
  },
  server: {
    port: 5173,
    open: true,
  },
});
