// https://nuxt.com/docs/api/configuration/nuxt-config
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/hints',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui',
    '@nuxt/eslint',
    '@vueuse/nuxt',
  ],
  css: ['./app/tailwind.css'],
  vite: {
    plugins: [svgLoader()],
  },
});
