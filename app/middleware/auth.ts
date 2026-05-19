
export default defineNuxtRouteMiddleware(async () => {
  const { $authClient } = useNuxtApp()

  const users = await $authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(['cookie'])
    }
  })

  if (!users.data?.user) return navigateTo('/auth')
})

