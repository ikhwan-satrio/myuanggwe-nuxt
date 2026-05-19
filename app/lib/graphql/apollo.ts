import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client/core'
import type { App } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

const createHttpLink = () => {
  const headers = useRequestHeaders(["cookie"])

  return new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',
    headers
  })
}

const createApolloClient = () => {
  const cache = new InMemoryCache()
  const link = createHttpLink()
  return new ApolloClient({
    link,
    cache,
  })
}

const createPlugin = () => ({
  install: (app: App) => {
    const apolloClient = createApolloClient()
    app.provide(DefaultApolloClient, apolloClient)
  },
})

const apolloPlugin = createPlugin()

export { apolloPlugin, createApolloClient }
