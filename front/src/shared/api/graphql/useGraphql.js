import { computed, ref } from 'vue'
import useGraphqlBase from './useGraphqlBase'

export default function useGraphql (
  query,
  variables,
  options = {},
) {
  query = ref(query) || ref('')
  variables = ref(variables) || ref({})
  options.operationName = options.operationName || null

  const standardErrors = ref([])
  const hasErrors = computed(() => !!standardErrors.value.length)

  const fetcher = useGraphqlBase('')

  async function execute () {
    const body = { query: query.value, variables: variables.value }
    if (typeof options.operationName === 'string') {
      body.operationName = options.operationName
    }

    await fetcher.post(body).json().execute()

    if (fetcher.error.value) {
      standardErrors.value.push({
        type: 'standard',
        message: fetcher.error.value,
      })
    }
  }

  return {
    query,
    execute,
    variables,
    standardErrors,
    hasErrors,
    isFetching: fetcher.isFetching,
    data: fetcher.data,
    isFinished: fetcher.isFinished,
  }
}

export { useGraphql }
