<script setup>
import componentMap from './componentMap'

import { useVModel } from '@vueuse/core'
import { useSchema } from 'api'

const props = defineProps({
  schema: {
    required: true,
    type: Object,
  },

  modelValue: {
    required: true,
    type: Object,
  },
})

const emit = defineEmits(['update:modelValue'])

const form = useVModel(props, 'modelValue', emit)

const schemaService = useSchema(props.schema)
</script>

<template>
  <q-form>
    <div
      v-for="(field, fieldKey) in schemaService.fields"
      :key="fieldKey"
      class="q-mb-md"
    >
      <component
        :is="componentMap[field.componentType].component"
        v-model="form[fieldKey]"
        v-bind="componentMap[field.componentType].baseProps"
        :label="field.label"
        :color="schema.color"
      />
    </div>
  </q-form>
</template>
