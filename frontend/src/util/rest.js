import axios from 'axios'

const SERVER_ADDRESS = {
  localhost: 'http://localhost:8082',
}

export const getServerUrl = path => `${SERVER_ADDRESS.localhost}/${path}`

// path, data, onSuccess are required arguments
export const post = (path, data, onSuccess, onError, headers) => {
  if (!headers) {
    headers = {}
  }
  axios.post(getServerUrl(path), data, {
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
