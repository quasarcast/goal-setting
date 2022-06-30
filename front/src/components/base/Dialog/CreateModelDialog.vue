<script setup>
import { useVModel } from '@vueuse/core'
import { SchemaForm } from 'components/base'
import BDialog from 'components/base/Dialog/BDialog.vue'
import { ref } from 'vue'

const props = defineProps({
  form: {
    required: true,
    type: Object,
  },

  schema: {
    required: true,
    type: Object,
  },

  creating: {
    required: false,
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:form',
  'create',
])

const form = useVModel(props, 'form', emit)

const createGoalDialog = ref()

defineExpose({
  show: () => createGoalDialog.value.show(),
  hide: () => createGoalDialog.value.hide(),
})
</script>

<template>
  <BDialog
    ref="createGoalDialog"
    v-bind="$attrs"
    toolbar-title="Create Goal"
    :color="schema.color"
  >
    <q-card-section>
      <SchemaForm
        v-model="form"
        :schema="schema"
      />
    </q-card-section>
    <q-btn
      label="create"
      class="full-width"
      :color="schema.color"
      unelevated
      :loading="creating"
      @click="emit('create')"
    />
  </BDialog>
</template>
