import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
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
