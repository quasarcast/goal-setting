import useSchema from './useSchema'

export default function makeForm (schema, defaultValues = {}) {
  const form = {}

  const { fieldEntries } = useSchema(schema)

  fieldEntries.forEach(([key]) => {
    form[key] = defaultValues[key] || null
  })

  return form
}

export { makeForm }
