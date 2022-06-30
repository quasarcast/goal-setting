# Goal Setting (goal-setting)

```vue
<script>
const goal = {
  id: 56,
  attributes: {
    goal: 'gym twice a week',
  }
}

const goalUpdater = useUpdateResource(GoalSchema, {
  form: {
    id: goal.id,
    ...goal.attributes
  },
  idField: 'myId'
})

function reset() {
  goalUpdater.id.value = 22
  goalUpdater.form.value = {
    goal: 'new goal',
  }
}
</script>

<template>
  <UpdateModelDialog
    v-model:form="goalUpdater.form"
    @reset="reset"
    @update="goalUpdater.update()"
  />
</template>
```
