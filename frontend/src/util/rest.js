import axios from 'axios'

const SERVER_ADDRESS = {
  localhost: `http://${window.location.hostname}:8082`,
}

export const getServerUrl = path => `${SERVER_ADDRESS.localhost}/${path}`

// path, data, onSuccess are required arguments
export const post = (path, data, onSuccess, onError, headers) => sendRequest('post', path, data, onSuccess, onError, headers)

// path, data, onSuccess are required arguments
export const put = (path, data, onSuccess, onError, headers) => sendRequest('put', path, data, onSuccess, onError, headers)

// path, onSuccess are required arguments
export const remove = (path, data, onSuccess, onError, headers) => sendRequest('delete', path, data, onSuccess, onError, headers)

// path, onSuccess are required arguments
export const get = (path, onSuccess, onError, headers) => sendRequest('get', path, null, onSuccess, onError, headers)

const sendRequest = (method, path, data, onSuccess, onError, headers) => {
  if (!headers) {
    headers = {}
  }
  console.log(axios)
  console.log({
    method,
    url: getServerUrl(path),
    data,
    headers: {
      'x-access-token': localStorage.accessToken,
      ...headers,
    },
  })
  axios({
    method,
    url: getServerUrl(path),
    data,
    headers: {
      'x-access-token': localStorage.accessToken,
      ...headers,
    },
  }).then(onSuccess).catch(err => {
    if (onError) {
      onError(err)
    } else if (err && err.response) {
      if (err.response.data.message) {
        alert(err.response.data.message)
      } else {
        alert(err.response.data)
      }
    }
  })
}
