import { useRemoveResource } from 'api'
import GoalSchema from '../GoalSchema.json'

export function useRemoveGoal () {
  return {
    ...useRemoveResource(GoalSchema),
  }
}
