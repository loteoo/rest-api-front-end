
// GET fetch effect
const get = ({url, action, error}, dispatch) =>
  fetch(url)
    .then(response => response.json())
    .then(data => dispatch(action, data))
    .catch(err => dispatch(error, err))

// Http service
export const Http = {
  get: ({url, action, error}) => [get, {url, action, error}]
}
