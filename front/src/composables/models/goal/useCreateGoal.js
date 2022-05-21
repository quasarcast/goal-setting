import { ref } from 'vue'
import useGraphql from 'composables/graphql/useGraphql'

export default () => {
  const form = ref({
    goal: '',
    description: '',
    color: null,
    target_date: null,
    completion_date: null
  })

  const query = `
    mutation CreateGoal($goal: String, $description: String) {
      createGoal(data: { goal: $goal, description: $description }) {
        data {
          id
          attributes {
            goal
            description
          }
        }
      }
    }`

  const graphQl = useGraphql(query, form, { operationName: 'CreateGoal' })

  return {
    create: graphQl.execute,
    form,
    data: graphQl.data,
    creating: graphQl.isFetching
  }
}
