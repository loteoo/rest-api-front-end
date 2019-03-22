
import {Http, Location} from '../utils'

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
    action: ReceiveUsers,
    error: FetchUsersFailed
  })
]

export const FetchUsersFailed = (state) => ({
  ...state,
  isFetching: false,
  fetched: false
})

// Action pour placer les users dans le state
export const ReceiveUsers = (state, data) => ({
  ...state,
  isFetching: false,
  fetched: true,
  users: data.data
})

// Déclanche le fetch
export const FetchUser = (state, id) => {
  if (!state.userData[id] || !state.userData[id].id) {
    return [
      SetUser(state, id, {isFetching: true}),
      Http.get({
        url: '/users/' + id,
        action: [SetUser, id],
        error: [FetchUserFailed, id]
      })
    ]
  }
}

export const SetUser = (state, id, user) => ({
  ...state,
  userData: {
    ...state.userData,
    [id]: user
  }
})

export const FetchUserFailed = (state, id, error) => SetUser(state, id, {
  isFetching: false,
  error: error.message
})

export const CloseModal = (state, ev) => {
  ev.preventDefault()
  return [
    state,
    Location.go({to: '/'})
  ]
}
