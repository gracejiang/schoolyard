import axios from 'axios'

const SERVER_ADDRESS = {
  localhost: 'http://localhost:8082',
}

export const getServerUrl = path => `${SERVER_ADDRESS.localhost}/${path}`

// path, data, onSuccess are required arguments
export const post = (path, data, onSuccess, onError, headers) =>
  sendRequest('post', path, data, onSuccess, onError, headers)

// path, onSuccess are required arguments
export const get = (path, onSuccess, onError, headers) =>
  sendRequest('get', path, null, onSuccess, onError, headers)

const sendRequest = (method, path, data, onSuccess, onError, headers) => {
  if (!headers) {
    headers = {}
  }
  axios({
    method,
    url: getServerUrl(path),
    data,
    headers: {
      'x-access-token': localStorage.accessToken,
      ...headers
    },
  }).then(onSuccess).catch(err => {
    if (onError) {
      onError(err)
    } else if (err && err.response) {
      alert(err.response.data)
    }
  })
}