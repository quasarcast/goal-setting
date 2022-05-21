<script setup>
defineProps({
  goal: {
    required: true,
    type: Object
  }
})
</script>

<template>
  <q-card>
    <q-card-section>
      {{ goal.goal }}
    </q-card-section>
  </q-card>
</template>
