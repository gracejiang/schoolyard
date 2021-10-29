import { useHistory } from 'react-router'
import { useEffect } from 'react'
import { post } from '../util/rest'

export default function Login() {
  const history = useHistory()

  function handleLogin(e) {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form[0].value,
      password: form[1].value,
    }

    post('user/login', user, ({ data }) => {
      alert('Success!')
      localStorage.accessToken = data.token
    })
  }

  return (
    <form onSubmit={e => handleLogin(e)}>
      <input required type="email" />
      <input required type="password" />
      <input type="submit" value="Submit" />
    </form>
  )
}
