<script setup>
import { useUpdateResource } from 'api'
import { GoalSchema } from 'models/Goal'
import SchemaForm from 'components/base/SchemaForm/SchemaForm.vue'

const goal = {
  id: 2,
  attributes: {
    goal: 'gym twice a week',
    description: 'sdfgsd',
  },
}

const goalUpdater = useUpdateResource(GoalSchema, {
  id: goal.id,
  form: goal.attributes,
})

goalUpdater.form.value.goal = 'geep'
goalUpdater.id.value = 3
</script>

<template>
  <q-page class="column flex-center">
    <SchemaForm
      v-model="goalUpdater.form.value"
      :schema="GoalSchema"
    />

    <q-btn
      label="update"
      @click="goalUpdater.update()"
    />
  </q-page>
</template>
