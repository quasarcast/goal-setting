<script setup>
import { useVModel } from '@vueuse/core'

const props = defineProps({
  goal: {
    required: true,
    type: Object,
  },

  updating: {
    type: Boolean,
    default: false,
    required: false,
  },

  removing: {
    type: Boolean,
    default: false,
    required: false,
  },
})

const emit = defineEmits([
  'edit',
  'update',
  'remove',
  'update:goal',
])

const goal = useVModel(props, 'goal', emit)
</script>

<template>
  <q-card>
    <q-card-section>
      <q-input
        v-model="goal.goal"
        :loading="updating"
        borderless
        @blur="emit('update', goal)"
      />
    </q-card-section>
    <q-card-actions align="between">
      <q-btn
        flat
        icon="edit"
        color="grey-7"
        @click="emit('edit', goal)"
      />
      <q-btn
        flat
        icon="delete"
        color="grey-7"
        :loading="removing"
        @click="emit('remove', goal)"
      />
    </q-card-actions>
  </q-card>
</template>
