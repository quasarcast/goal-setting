import { useUpdateResource } from 'api'
import GoalSchema from '../GoalSchema.json'

export function useUpdateGoal () {
  return {
    ...useUpdateResource(GoalSchema),
  }
}
