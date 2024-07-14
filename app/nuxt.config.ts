// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  runtimeConfig: { public: { WEB3_PROJECT_ID: process.env.WEB3_PROJECT_ID } },
  modules: ['@formkit/nuxt', '@vueuse/nuxt'],
  formkit: {
    // Experimental support for auto loading (see note):
    autoImport: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],
});
