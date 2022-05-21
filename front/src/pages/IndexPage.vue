<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
  </q-page>
</template>

<script setup>
import useCreateResource from 'composables/models/core/useCreateResource'

const resourceCreator = useCreateResource({
  pascalName: 'Goal',
  fields: {
    goal: {
      type: 'String'
    },
    description: {
      type: 'String'
    }
  }
})

console.log(resourceCreator.query)
</script>
