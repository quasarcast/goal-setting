export { default as GoalSchema } from './GoalSchema.json'

/**
 * Components
 */
export { default as GoalCard } from './components/cards/GoalCard.vue'
export { default as GoalFrom } from './components/forms/GoalForm.vue'

/**
 * Composables
 */
export { useCreateGoal } from './composables/useCreateGoal'
export { useIndexGoals } from './composables/useIndexGoals'
export { useUpdateGoal } from './composables/useUpdateGoal'
export { useRemoveGoal } from './composables/useRemoveGoal'
