import { computed, ref } from 'vue'
import { useGraphql } from 'api'

export function useIndexGoals () {
  const onFetchCallbacks = ref([])

  const onFetch = (callback) => {
    onFetchCallbacks.value.push(callback)
  }

  const query = `query {
    goals(
      pagination: {
        pageSize: 100
      }
    ) {
      data {
        id
        attributes {
          goal
          description
          color
          target_date
          completion_date
        }
      }
    }
  }`

  const graphQl = useGraphql(query)

  const goals = computed(() => {
    if (!graphQl.data.value) {
      return []
    }
    return graphQl.data.value.data.goals.data
  })

  async function fetch () {
    await graphQl.execute()
    onFetchCallbacks.value.forEach(callback => callback(goals.value))
  }

  return {
    fetch,
    data: graphQl.data,
    indexing: graphQl.isFetching,
    goals,
    onFetch,
  }
}
