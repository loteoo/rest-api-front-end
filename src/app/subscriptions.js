
import {Location} from '../utils'
import {ParseUrl} from './actions'

export const subscriptions = (state) => {
  console.log(state)
  return [
    Location.changed({
      action: ParseUrl
    })
  ]
}
