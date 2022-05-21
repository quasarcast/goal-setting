<script setup>
import GoalForm from 'src/components/goal/GoalForm.vue'
import useCreateGoal from 'composables/models/goal/useCreateGoal'
import { ref } from 'vue'
import useIndexGoals from 'src/composables/models/goal/useIndexGoals'

const createGoalService = useCreateGoal()
const createGoalDialogComponent = ref()
async function createGoal () {
  await createGoalService.create()
  createGoalDialogComponent.value.hide()
  goalsIndexer.data.value.data.goals.data.push(createGoalService.data.value.data.createGoal.data)
}

const goalsIndexer = useIndexGoals()
goalsIndexer.fetch()
</script>

<template>
  <q-page
    padding
  >
    <div class="row">
      <div
        v-for="goalRecord in goalsIndexer.goals.value"
        :key="goalRecord.id"
        class="full-width q-pa-sm"
        style="max-width: 200px"
      >
        <q-card class="full-width">
          <q-card-section>
            {{ goalRecord.attributes.goal }}
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-dialog ref="createGoalDialogComponent">
      <q-card>
        <q-toolbar class="bg-primary text-white">
          <q-toolbar-title>Create Goal</q-toolbar-title>
          <q-btn
            v-close-popup
            icon="close"
            round
            flat
          />
        </q-toolbar>

        <div
          class="scroll"
          style="max-height: calc(100vh - 150px)"
        >
          <q-card-section>
            <GoalForm v-model="createGoalService.form.value" />
          </q-card-section>
        </div>

        <q-btn
          class="full-width"
          color="primary"
          label="create"
          :loading="createGoalService.creating.value"
          @click="createGoal"
        />
      </q-card>
    </q-dialog>

    <q-page-sticky
      position="bottom-right"
      :offset="[22,22]"
    >
      <q-btn
        color="accent"
        icon="add"
        round
        size="lg"
        @click="$refs.createGoalDialogComponent.show()"
      />
    </q-page-sticky>
  </q-page>
</template>
