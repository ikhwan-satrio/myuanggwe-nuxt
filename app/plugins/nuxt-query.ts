import { QueryClient, QueryCache } from '@tanstack/vue-query'

export default defineNuxtPlugin({
  enforce: 'pre',
  setup(nuxtApp) {
    nuxtApp.hook('nuxt-query:configure', (getPluginOptions) => {
      const clientOptions = useRuntimeConfig().public.nuxtQuery?.queryClientOptions || {}

      const queryClient = new QueryClient({
        ...clientOptions,
        queryCache: new QueryCache({
          onSuccess: (data: unknown) => console.log('onSuccess', { data }),
        }),
      })

      getPluginOptions(queryClient)
    })
  },
})
