<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    required: true,
    type: Object,
  },
})

const emit = defineEmits(['update:modelValue'])

const form = useVModel(props, 'modelValue', emit)
</script>

<template>
  <q-form class="q-gutter-md">
    <q-input
      v-model="form.goal"
      filled
      label="goal"
    />

    <q-input
      v-model="form.description"
      type="textarea"
      filled
      label="Description"
    />

    <q-color
      v-model="form.color"
      type="textarea"
      flat
      bordered
    />

    <q-date
      v-model="form.target_date"
      flat
      bordered
    />
  </q-form>
</template>
