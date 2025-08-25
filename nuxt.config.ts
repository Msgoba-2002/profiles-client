// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@formkit/nuxt',
    'nuxt-icon',
    '@pinia/nuxt',
    'nuxt-snackbar',
    'vue3-carousel-nuxt',
    '@nuxt/test-utils/module',
    'nuxt-vuefire'
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
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseAppId: '',
    }
  },
  experimental: {
    typedPages: true,
    asyncContext: true,
  },
  vuefire: {
    auth: {
      enabled: true,
      sessionCookie: true,
    },
    config: {
      apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || '',
      authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
      projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || '',
      appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || '',
    }
  }
})