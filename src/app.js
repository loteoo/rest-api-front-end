import {h, app} from 'hyperapp'

import 'spectre.css'
import './style.css'

import {Http} from './utils'

const API_URL = 'http://localhost:8000'

// Action pour placer les users dans le state
const ReceiveUsers = (state, data) => ({
  ...state,
  isFetching: false,
  fetchSucceeded: true,
  users: data.data
})

const OpenUserModal = (state, userId) => ({
  ...state,
  userId
})

const CloseUserModal = (state) => ({
  ...state,
  userId: null
})

// Component pour afficher un user
const UserModal = ({user}) => user && (
  <div class={{modal: true, active: !!user}} onclick={CloseUserModal}>
    <a class="modal-overlay" onclick={CloseUserModal} aria-label="Close"></a>
    <div class="modal-container" role="document">
      <div class="modal-header">
        <a class="btn btn-clear float-right" aria-label="Close"></a>
        <div class="modal-title h5">{user.title}</div>
      </div>
      <div class="modal-body">
        <div class="content">
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-primary">Share</button>
        <a class="btn btn-link">Close</a>
      </div>
    </div>
  </div>
)

// Initialize the app
app({
  init: [
    {
      userId: null,
      isFetching: true,
      fetchSucceeded: false,
      users: [],
      userData: {}
    },
    Http.get({
      url: API_URL + '/api/users',
      action: ReceiveUsers
    })
  ],
  view: (state) => (
    <main class="app">
      <div class="hero bg-gray">
        <div class="hero-body wrapper">
          <h1>User List</h1>
          <p>From a REST API</p>
        </div>
      </div>
      <div class="container wrapper">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>name</th>
              <th>email</th>
            </tr>
          </thead>
          <tbody>
            {
              state.isFetching
                ? <div class="loading loading-lg"></div>
                : state.fetchSucceeded
                  ? (
                    state.users.map(user => (
                      <tr>
                        <td>{user.id}</td>
                        <td><a onclick={[OpenUserModal, user.id]}>{user.name}</a></td>
                        <td>{user.email}</td>
                      </tr>
                    ))
                  )
                  : 'FETCH FAILDED'
            }
          </tbody>
        </table>
      </div>
      {state.userId && <UserModal user={state.users.find(user => user.id === state.userId)} />}
      <pre class="state">{JSON.stringify(state, null, 2)}</pre>
    </main>
  ),
  subscriptions: console.log,
  container: document.body
})
