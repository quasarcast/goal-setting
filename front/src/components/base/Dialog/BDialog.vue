<script setup>
import sizes from './sizes'
import { computed, ref } from 'vue'

const props = defineProps({
  size: {
    required: false,
    type: String,
    default: null,
  },

  toolbar: {
    required: false,
    type: Boolean,
  },

  toolbarTitle: {
    required: false,
    type: String,
    default: null,
  },

  toolbarBg: {
    required: false,
    type: String,
    default: null,
  },

  toolbarTextColor: {
    required: false,
    type: String,
    default: 'white',
  },

  color: {
    required: false,
    type: String,
    default: null,
  },
})

const sizeStyles = computed(() => {
  if (sizes[props.size]) {
    return sizes[props.size].dialogStyle
  }
  return {}
})

const toolbarBgComputed = computed(() => {
  return props.toolbarBg || props.color || 'primary'
})

const baseDialog = ref()

defineExpose({
  show: () => baseDialog.value.show(),
  hide: () => baseDialog.value.hide(),
})
</script>

<template>
  <q-dialog
    ref="baseDialog"
    v-bind="$attrs"
  >
    <q-card
      :style="sizeStyles"
      class="full-width scroll"
    >
      <q-toolbar
        v-if="toolbar || toolbarTitle"
        :class="`bg-${toolbarBgComputed} text-${toolbarTextColor}`"
      >
        <q-toolbar-title v-if="toolbarTitle">
          {{ toolbarTitle }}
        </q-toolbar-title>
        <q-btn
          v-close-popup
          flat
          round
          icon="close"
        />
      </q-toolbar>
      <div
        class="full-width scroll"
        style="max-height: calc(100vh - 145px)"
      >
        <slot name="default" />
      </div>
      <slot name="footer" />
    </q-card>
  </q-dialog>
</template>
