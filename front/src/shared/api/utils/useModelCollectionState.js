import { keyBy } from 'lodash-es'
import { computed, isRef, ref } from 'vue'

export function useModelCollectionState (collection = [], options = {}) {
  const pkField = options.id || 'id'

  if (isRef(collection)) {
    collection = ref(keyBy(collection.value, pkField))
  } else {
    collection = ref(keyBy(collection, pkField))
  }

  function insert (entity) {
    if (Array.isArray(entity)) {
      collection.value = { ...collection.value, ...keyBy(entity, pkField) }
      return
    }
    if (typeof entity === 'object') {
      collection.value[entity[pkField]] = entity
      return
    }
    throw new Error(`entity must be an "object" or "array". ${typeof entity} given.`)
  }

  function remove (entity) {
    if (typeof entity === 'number' || !isNaN(entity)) {
      delete collection.value[entity]
    } else {
      delete collection.value[entity[pkField]]
    }
  }

  const collectionArray = computed(() => Object.values(collection.value))

  return {
    collection: collectionArray,
    insert,
    pkField,
    remove,
  }
}
