import { ref } from 'vue'
import makeForm from './makeForm'

export default function useForm (schema, initialForm = null) {
  const fields = schema.fields
  const fieldEntries = Object.entries(fields)

  const form = initialForm ? ref(initialForm) : ref(makeForm(schema))

  function resetForm () {
    fieldEntries.forEach(([key]) => {
      form.value[key] = null
    })
  }

  return {
    form,
    resetForm,
    fields,
    fieldEntries,
  }
}

export { useForm }
