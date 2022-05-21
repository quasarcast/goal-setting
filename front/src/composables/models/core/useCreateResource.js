import { ref } from 'vue'
import useGraphql from 'composables/graphql/useGraphql'

export default (schema) => {
  const form = ref({})

  const fields = schema.fields
  const fieldEntries = Object.entries(fields)

  function resetForm () {
    fieldEntries.forEach(([key]) => {
      form.value[key] = null
    })
  }

  resetForm()

  function makeMutationParamsTemplate () {
    return fieldEntries.map(([fieldKey, field]) => {
      return `$${fieldKey}: ${field.type}`
    }).join(', ')
  }

  function makeCreateDataParamTemplate () {
    const insideObject = fieldEntries.map(([fieldKey, field]) => {
      return `${fieldKey}: $${fieldKey}`
    }).join(', ')

    return 'data: { ' + insideObject + ' }'
  }

  function makeAttributesTemplate () {
    const insideObject = fieldEntries.map(([fieldKey, field]) => {
      return `        ${fieldKey}`
    }).join('\n')

    return '      attributes { \n' +
      insideObject +
      '\n      }'
  }

  const query = `mutation Create${schema.pascalName}(${makeMutationParamsTemplate()}) {
  createGoal(${makeCreateDataParamTemplate()}) {
    data {
      id
${makeAttributesTemplate()}
    }
  }
}`

  const graphQl = useGraphql(query, form, { operationName: `Create${schema.pascalName}` })

  return {
    query,
    makeMutationParamsTemplate,
    makeCreateDataParamTemplate,
    makeAttributesTemplate,
    create: graphQl.execute,
    form,
    data: graphQl.data,
    creating: graphQl.isFetching
  }
}
