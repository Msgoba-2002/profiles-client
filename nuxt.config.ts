// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@formkit/nuxt',
    'nuxt-icon',
    '@pinia/nuxt',
    'nuxt-snackbar',
    'vue3-carousel-nuxt',
  ],
  snackbar: {
    top: true,
    left: true,
    duration: 3000,
  },
  formkit: {
    autoImport: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      backendUrl: '',
      apiDockerUrl: '',
    }
  },
  experimental: {
    typedPages: true,
  }
})
