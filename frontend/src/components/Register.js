import { useHistory } from 'react-router'
import { useEffect } from 'react'

export default function Register() {
  const history = useHistory()

  async function handleRegister(e) {
    e.preventDefault()

    const form = e.target
    const user = {
      username: form[0].value,
      email: form[1].value,
      password: form[2].value,
    }

    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
  }

  return (
    <form onSubmit={(event) => handleRegister(event)}>
      <input required type='text' />
      <input required type='email' />
      <input required type='password' />
      <input type='submit' value='Register' />
    </form>
  )
}
