
export default defineNuxtRouteMiddleware(async () => {
  const { $authClient } = useNuxtApp()

  const session = await $authClient.getSession({
    fetchOptions: {
      headers: useRequestHeaders(['cookie'])
    }
  })

  if (session.data?.user?.role !== 'developer') {
    return navigateTo('/')
  }
})
