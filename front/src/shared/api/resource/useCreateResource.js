import { computed, ref } from 'vue'
import { useGraphql, useForm, useSchema } from '../'
import { jsonToGraphQLQuery } from 'json-to-graphql-query'

export default function useCreateResource (schema) {
  const formService = useForm(schema)
  formService.resetForm()

  const { fieldEntries } = useSchema(schema)

  const createdResource = ref(null)

  function getVariables () {
    const result = {}
    fieldEntries.forEach(([key, field]) => {
      result[key] = field.type
    })
  }

  const queryObject = {
    mutation: {
      __name: `Create${schema.pascalName}`,
      __variables: getVariables(),
    },
  }

  queryObject.mutation[`create${schema.pascalName}`] = {
    __args: { data: formService.form.value },
    data: {
      id: true,
      attributes: {},
    },
  }

  fieldEntries.forEach(([key, value]) => {
    queryObject.mutation[`create${schema.pascalName}`]
      .data
      .attributes[key] = true
  })

  const queryOptions = { pretty: true }

  const query = computed(() => {
    return jsonToGraphQLQuery(
      queryObject,
      queryOptions,
    )
  })

  const graphQl = useGraphql(query, formService.form, { operationName: `Create${schema.pascalName}` })

  async function create () {
    await graphQl.execute()
    if (!graphQl.hasErrors.value) {
      createdResource.value = graphQl.data.value
        .data[`create${schema.pascalName}`]
        .data
    }
  }

  return {
    create,
    form: formService.form,
    data: graphQl.data,
    creating: graphQl.isFetching,
    createdResource,
    standardErrors: graphQl.errors,
    hasErrors: graphQl.hasErrors,
    schema,
  }
}

export { useCreateResource }
