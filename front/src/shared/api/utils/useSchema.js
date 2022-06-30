export default function useSchema (schema) {
  const fields = schema.fields
  const fieldEntries = Object.entries(fields)

  return {
    fields,
    fieldEntries,
  }
}

export { useSchema }
