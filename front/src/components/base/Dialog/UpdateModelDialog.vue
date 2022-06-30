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

  updating: {
    required: false,
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:modelValue',
  'update:form',
  'update',
])

const form = useVModel(props, 'form', emit)

const updateDialog = ref()

defineExpose({
  show: () => updateDialog.value.show(),
  hide: () => updateDialog.value.hide(),
})
</script>

<template>
  <BDialog
    ref="updateDialog"
    v-bind="$attrs"
    toolbar-title="Update Goal"
    :color="schema.color"
  >
    <q-card-section>
      <SchemaForm
        v-model="form"
        :schema="schema"
      />
    </q-card-section>
    <template #footer>
      <q-btn
        label="update"
        class="full-width"
        :color="schema.color"
        unelevated
        :loading="updating"
        @click="emit('update')"
      />
    </template>
  </BDialog>
</template>
