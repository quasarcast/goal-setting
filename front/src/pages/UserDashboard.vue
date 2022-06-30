<script setup>
import { useIndexGoals, useCreateGoal, useUpdateGoal, useRemoveGoal } from 'models/Goal'
import CreateModelDialog from 'components/base/Dialog/CreateModelDialog.vue'
import UpdateModelDialog from 'components/base/Dialog/UpdateModelDialog.vue'
import GoalCard from 'models/Goal/components/cards/GoalCard.vue'
import { clone } from 'lodash-es'
import { useModelCollectionState } from 'api'

const goalCreator = useCreateGoal()
const goalUpdater = useUpdateGoal()
const goalRemover = useRemoveGoal()

const goalsIndexer = useIndexGoals()
goalsIndexer.fetch()

const goalsCollection = useModelCollectionState()
goalsIndexer.onFetch(goalsCollection.insert)
</script>

<template>
  <q-page padding>
    <div class="row">
      <GoalCard
        v-for="goalRecord in goalsCollection.collection.value"
        :key="goalRecord.id"
        class="full-width"
        style="max-width: 200px"
        :goal="goalRecord.attributes"
        :updating="goalUpdater.updating.value && goalRecord.id === goalUpdater.id.value"
        :removing="goalRemover.removing.value && goalRecord.id === goalRemover.id.value"
        @update="async (form) => {
          goalUpdater.id.value = goalRecord.id
          goalUpdater.form.value = form
          await goalUpdater.update()
        }"
        @edit="() => {
          goalUpdater.id.value = goalRecord.id
          goalUpdater.form.value = clone(goalRecord.attributes)
          $refs.updateGoalDialogComponent.show()
        }"
        @remove="async () => {
          goalRemover.id.value = goalRecord.id
          await goalRemover.remove()
          goalsCollection.remove(goalRemover.removedResource.value)
        }"
      />
    </div>

    <UpdateModelDialog
      ref="updateGoalDialogComponent"
      v-model:form="goalUpdater.form.value"
      :schema="goalUpdater.schema"
      :updating="goalUpdater.updating.value"
      @update="async () => {
        await goalUpdater.update()
        goalsIndexer.data.value.data.goals.data.splice(
          goalsIndexer.data.value.data.goals.data.findIndex(record => record.id === goalUpdater.id.value),
          1,
          goalUpdater.updatedResource.value,
        )
        $refs.updateGoalDialogComponent.hide()
      }"
    />

    <CreateModelDialog
      ref="createGoalDialogComponent"
      v-model:form="goalCreator.form.value"
      :schema="goalCreator.schema"
      @create="async () => {
        await goalCreator.create()
        goalsIndexer.data.value.data.goals.data.push(goalCreator.createdResource.value)
      }"
    />

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
