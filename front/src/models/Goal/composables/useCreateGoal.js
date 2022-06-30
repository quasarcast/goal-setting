import { useCreateResource } from 'api'
import GoalSchema from '../GoalSchema.json'

export function useCreateGoal () {
  return {
    ...useCreateResource(GoalSchema),
  }
}
