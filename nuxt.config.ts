import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: { preset: 'vercel' },
  runtimeConfig: {
    public: {
      appBaseUrl: process.env.PUBLIC_APP_BASE_URL,
      betterAuthAppUrl: process.env.BETTER_AUTH_APP_URL,
    },
    exchangeRateApiKey: process.env.EXCHANGE_RATE_API_KEY,
    betterAuthSecret: process.env.BETTER_AUTH_SECRET,
    upstashRedisRestUrl: process.env.UPSTASH_REDIS_REST_URL,
    upstashRedisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN,
    databaseUrl: process.env.DATABASE_URL,
    databaseAuthToken: process.env.DATABASE_AUTH_TOKEN,
  },
  modules: [
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'nuxt-graphql-server',
    '@peterbud/nuxt-query',
    '@nuxtjs/i18n',
    'motion-v/nuxt',
    'nuxt-security',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
  ],

  pinia: {
    storesDirs: ['./app/stores/**'],
  },

  graphqlServer: {
    url: '/api/graphql',
    codegen: {
      contextType: '~~/server/lib/graphql/context#GraphQLContext',
    },
  },

  i18n: {
    locales: [
      { code: 'id', language: 'id-ID', currency: 'IDR' },
      { code: 'en', language: 'en-US', currency: 'USD' },
      { code: 'jp', language: 'ja-JP', currency: 'JPY' },
      { code: 'my', language: 'ms-MY', currency: 'MYR' },
      { code: 'sg', language: 'en-SG', currency: 'SGD' },
    ],
    defaultLocale: 'id',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },

  security: {
    corsHandler: {
      origin: [
        'http://localhost:3000',
        process.env.PUBLIC_APP_BASE_URL,
        process.env.BETTER_AUTH_APP_URL,
      ].filter(Boolean) as string[],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      credentials: true,
    },
  },

  routeRules: {
    '/api/**': { cors: true }
  },

  nuxtQuery: {
    devtools: true,
    autoImports: ["useQueryClient"],
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@apollo/client/core',
        '@tanstack/vue-query',
        '@vue/apollo-composable',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'better-auth/client/plugins',
        'better-auth/vue',
        'class-variance-authority',
        'clsx',
        'lucide-vue-next',
        'reka-ui',
        'tailwind-merge',
        'vue-sonner',
      ]
    }
  },
})