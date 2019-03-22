import {h} from 'hyperapp'

import {Link} from './utils'

import {FetchUser, CloseModal} from './actions'

// App view
export const view = (state) => (
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
              : state.fetched
                ? (
                  state.users.map(user => (
                    <tr>
                      <td>{user.id}</td>
                      <td><Link to={'/' + user.id}>{user.name}</Link></td>
                      <td>{user.email}</td>
                    </tr>
                  ))
                )
                : 'FETCH FAILDED'
          }
        </tbody>
      </table>
    </div>
    {state.userId && <UserModal userId={state.userId} user={state.userData[state.userId]} />}
    <pre class="state">{JSON.stringify(state, null, 2)}</pre>
  </main>
)

// Component pour afficher un user
const UserModal = ({userId, user}) => {
  const loaded = user && user.id
  return (
    <div class={{modal: true, active: !!user}} onclick={CloseModal} onmount={[FetchUser, userId]}>
      <a class="modal-overlay" onclick={CloseModal} aria-label="Close"></a>
      <div class="modal-container" role="document">
        <div class="modal-header">
          <a class="btn btn-clear float-right" aria-label="Close"></a>
          <div class="modal-title h5">{loaded ? `User #${user.id}` : 'Loading...'}</div>
        </div>
        <div class="modal-body">
          {loaded ? (
            <div class="content">
              <span>Name: </span>
              <h4>{user.name}</h4>
              <span>Email: </span>
              <h4>{user.email}</h4>
            </div>
          ) : <div class="loading loading-lg"></div>}
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary">Share</button>
          <a class="btn btn-link">Close</a>
        </div>
      </div>
    </div>
  )
}
