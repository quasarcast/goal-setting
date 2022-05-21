import { createFetch } from '@vueuse/core'
import { useLocalStorageTokenRepo } from '@vueauth/strapi'

const tokenRepo = useLocalStorageTokenRepo()

const useGraphqlBase = createFetch({
  options: {
    immediate: false,
    async beforeFetch (context) {
      context.url = 'http://localhost:1337/graphql'
      const token = await tokenRepo.get()
      context.options.headers = {
        ...context.options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
  }
})

export default useGraphqlBase
