export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  css: ['~/assets/main.css'],

  modules: ['@pinia/nuxt', 'nuxt-mdi'],

  app: {
    head: {
      title: "YOUTH - Youth Officials' Unified Transparency Hub",
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/youth-ims-logo.svg'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;500;600;700;800;900&display=swap'
        }
      ]
    }
  },

  devServer: {
    port: 5174,
  },
})