import {h, app} from 'hyperapp'

import 'spectre.css'

import {Http} from './utils'

const ReceiveUsers = (state, data) => ({
  ...state,
  isFetching: false,
  fetchSucceeded: true,
  users: data.results
})


// Initialize the app
app({
  init: [
    {
      isFetching: true,
      fetchSucceeded: false,
      users: []
    },
    Http.fetch({
      url: 'https://swapi.co/api/people/',
      action: ReceiveUsers
    })
  ],
  view: (state) => (
    <main class="app">
      <div class="hero bg-gray">
        <div class="hero-body">
          <h1>User List</h1>
          <p>From a REST API</p>
        </div>
      </div>
      <div class="container" style={{maxWidth: '1024px'}}>
        {
          state.isFetching 
            ? <div class="loading loading-lg"></div>
            : state.fetchSucceeded
              ? (
                state.users.map(user => (
                  <div class="user">
                    <p><b>{user.name}</b></p>
                    <p>{user.gender}</p>
                  </div>
                ))
              )
              : 'FETCH FAILDED'
        }
      </div>
      <pre class="state">{JSON.stringify(state, null, 2)}</pre>
    </main>
  ),
  subscriptions: console.log,
  container: document.body
})
