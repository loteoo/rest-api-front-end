import {h} from 'hyperapp'
/* eslint-disable fp/no-mutation */

// Copier / collé d'un autre projet, normallement ce qui est dans ce fichier sera dans NPM

const apiEndPoint = 'http://localhost:8000/api'

// HTTP effects
const get = ({url, action, error}, dispatch) =>
  fetch(apiEndPoint + url, {
  })
    .then(response => response.json())
    .then(data => dispatch(action, data))
    .catch(err => dispatch(error, err))

const post = ({url, data, action, error}, dispatch) =>
  fetch(apiEndPoint + url, {
    method: 'post',
    body: data
  })
    .then(response => response.json())
    .then(data => dispatch(action, data))
    .catch(err => dispatch(error, err))

const put = ({url, data, action, error}, dispatch) =>
  fetch(apiEndPoint + url, {
    method: 'put',
    body: data
  })
    .then(response => response.json())
    .then(data => dispatch(action, data))
    .catch(err => dispatch(error, err))

const del = ({url, action, error}, dispatch) =>
  fetch(apiEndPoint + url, {
    method: 'delete'
  })
    .then(response => response.json())
    .then(data => dispatch(action, data))
    .catch(err => dispatch(error, err))

// Http service
export const Http = {
  get: ({url, action, error}) => [get, {url, action, error}],
  post: ({url, data, action, error}) => [post, {url, data, action, error}],
  put: ({url, data, action, error}) => [put, {url, data, action, error}],
  del: ({url, action, error}) => [del, {url, action, error}]
}

export const baseHref = '/rest-api-front-end'

// Navigation effect
const go = ({to}, dispatch) => {
  history.pushState(null, '', baseHref + to)
  dispatchEvent(new CustomEvent('pushstate'))
}

// Navigation subscription
const changed = ({action}, dispatch) => {
  const handleLocationChange = ev => {
    dispatch(action, window.location.pathname.replace(baseHref, ''))
  }
  addEventListener('pushstate', handleLocationChange)
  addEventListener('popstate', handleLocationChange)
  return () => {
    removeEventListener('pushstate', handleLocationChange)
    removeEventListener('popstate', handleLocationChange)
  }
}


// Location service
export const Location = {
  go: ({to}) => [go, {to}],
  changed: ({action}) => [changed, {action}]
}

// Link component
export const Link = ({to, ...rest}, children) => (
  <a href={to} onclick={[Navigate, to]} {...rest}>
    {children}
  </a>
)
const Navigate = (state, to, ev) => {
  ev.preventDefault()
  return [
    state,
    Location.go({to})
  ]
}

// DOM custom event (hyperapp will treat this like any other event)
export const enableOnMountDomEvent = () => {
  const mountEvent = new Event('mount')
  const realCreateElement = document.createElement.bind(document)
  document.createElement = (name) => {
    const el = realCreateElement(name)
    setTimeout(() => el.dispatchEvent(mountEvent))
    return el
  }
}
