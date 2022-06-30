import { computed, ref } from 'vue'
import { useGraphql } from '../'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

export default function useRemoveResource (schema, options = {}) {
  const removedResource = ref(null)
  const id = ref(options.id || null)

  const queryObject = ref({
    mutation: {
      __name: `Remove${schema.pascalName}`,
    },
  })

  queryObject.value.mutation[`delete${schema.pascalName}`] = {
    __args: { id },
    data: {
      id: true,
      attributes: {},
    },
  }

  Object.entries(schema.fields).forEach(([key, _value]) => {
    queryObject.value.mutation[`delete${schema.pascalName}`]
      .data
      .attributes[key] = true
  })

  const queryOptions = { pretty: true }

  const query = computed(() => {
    return jsonToGraphQLQuery(
      queryObject.value,
      queryOptions,
    )
  })

  const graphQl = useGraphql(
    query,
    {},
    { operationName: `Remove${schema.pascalName}` },
  )

  async function remove () {
    await graphQl.execute()
    if (!graphQl.hasErrors.value) {
      removedResource.value = graphQl.data.value.data.deleteGoal.data
    }
  }

  return {
    id,
    remove,
    removing: graphQl.isFetching,
    removedResource,
    standardErrors: graphQl.errors,
    hasErrors: graphQl.hasErrors,
    schema,
  }
}

export { useRemoveResource }
