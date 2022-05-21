import { computed } from 'vue'
import useGraphql from 'composables/graphql/useGraphql'

export default () => {
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
    if (!graphQl.isFinished.value) {
      return []
    }
    return graphQl.data.value.data.goals.data
  })

  return {
    fetch: graphQl.execute,
    data: graphQl.data,
    indexing: graphQl.isFetching,
    goals
  }
}
