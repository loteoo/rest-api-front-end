
import {Http, Location} from './utils'

export const ParseUrl = (state, path) => {
  const parts = path.split('/').filter((part, index) => index !== 0)
  return {
    ...state,
    userId: parts[0]
  }
}

// Déclanche le fetch
export const FetchUsers = (state) => [
  {
    ...state,
    isFetching: true
  },
  Http.get({
    url: '/users',
    action: ReceiveUsers
  })
]

// Action pour placer les users dans le state
export const ReceiveUsers = (state, data) => ({
  ...state,
  isFetching: false,
  fetched: true,
  users: data.data
})

// Déclanche le fetch
export const FetchUser = (state, id) => [
  SetUser(state, id, {loading: true}),
  Http.get({
    url: '/users/' + id,
    action: [SetUser, id]
  })
]
// Action pour placer les users dans le state
export const SetUser = (state, id, user) => ({
  ...state,
  userData: {
    ...state.userData,
    [id]: user
  }
})

export const CloseModal = (state, ev) => {
  ev.preventDefault()
  return [
    state,
    Location.go({to: '/'})
  ]
}
