import { ref } from 'vue'
import useGraphqlBase from './useGraphqlBase'

export default (
  query,
  variables,
  options = {}
) => {
  query = ref(query) || ref('')
  variables = ref(variables) || ref({})
  options.operationName = options.operationName || null

  const fetcher = useGraphqlBase('')

  async function execute () {
    const body = { query: query.value, variables: variables.value }
    if (typeof options.operationName === 'string') {
      body.operationName = options.operationName
    }

    await fetcher.post(body).json().execute()
  }

  return {
    query,
    execute,
    variables,
    isFetching: fetcher.isFetching,
    data: fetcher.data,
    isFinished: fetcher.isFinished
  }
}
