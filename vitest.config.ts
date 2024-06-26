import { defineVitestConfig } from '@nuxt/test-utils/config';
// import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'url';

const alias = {
  '@': (new URL('./', import.meta.url)).toString(),
};

// https://vitejs.dev/config/
export default defineVitestConfig({
  // plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
  test: {
    environment: 'jsdom',
    root: './',
    globals: true,
  }
});