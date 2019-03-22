import {baseHref} from '../utils'
import {FetchUsers, ParseUrl} from './actions'

const initialState = {
  userId: null,
  isFetching: true,
  fetched: undefined,
  users: [],
  userData: {}
}

export const init = FetchUsers(ParseUrl(initialState, window.location.pathname.replace(baseHref, '')))
