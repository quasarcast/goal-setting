import { computed, ref } from 'vue'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'
import { useForm, useGraphql } from '../'

export default function useUpdateResource (schema, options = {}) {
  const form = ref(options.form || {})
  const updatedResource = ref(null)
  const id = ref(options.id || null)

  const formService = useForm(schema, form)

  function getVariables () {
    const result = {}
    formService.fieldEntries.forEach(([key, field]) => {
      result[key] = field.type
    })
  }

  const queryObject = ref({
    mutation: {
      __name: `Update${schema.pascalName}`,
      __variables: getVariables(),
    },
  })

  queryObject.value.mutation[`update${schema.pascalName}`] = {
    __args: { id, data: formService.form },
    data: {
      id: true,
      attributes: {},
    },
  }

  formService.fieldEntries.forEach(([key, _value]) => {
    queryObject.value.mutation[`update${schema.pascalName}`]
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

  const graphQl = useGraphql(query, formService.form, { operationName: `Update${schema.pascalName}` })

  async function update () {
    await graphQl.execute()
    if (!graphQl.hasErrors.value) {
      updatedResource.value = graphQl.data.value
        .data[`update${schema.pascalName}`]
        .data
    }
  }

  return {
    id,
    update,
    form: formService.form,
    updating: graphQl.isFetching,
    updatedResource,
    standardErrors: graphQl.errors,
    hasErrors: graphQl.hasErrors,
    schema,
  }
}

export { useUpdateResource }
