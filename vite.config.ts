import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  build: {
    rollupOptions: {
      external: ['vue', 'element-plus', 'axios'],
      output: {
        globals: {
          'vue-demi': 'VueDemi',
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [vue(), vueJsx()],
});
