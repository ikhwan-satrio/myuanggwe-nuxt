import { apolloPlugin, createApolloClient } from "~/lib/graphql/apollo"

export default defineNuxtPlugin((nuxtApp) => {
  const appoloClient = createApolloClient()

  nuxtApp.vueApp.use(apolloPlugin)

  return {
    provide: {
      apolloClient: appoloClient
    }
  }
})
