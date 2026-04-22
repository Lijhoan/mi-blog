import { flagshipContentSchema } from './contracts'
import { flagshipContentPayload } from '../data/flagship-content'

export const getFlagshipContentPayload = () => {
  return flagshipContentSchema.parse(flagshipContentPayload)
}
