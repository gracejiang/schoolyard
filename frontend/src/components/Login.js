import { useHistory } from 'react-router'
import { useEffect } from 'react'

export default function Login() {
  const history = useHistory()

  function handleLogin(e) {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form[0].value,
      password: form[1].value,
    }

    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem('token', data.token)
      })
  }

  return (
    <form onSubmit={(e) => handleLogin(e)}>
      <input required type='email' />
      <input required type='password' />
      <input type='submit' value='Submit' />
    </form>
  )
}
