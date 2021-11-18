import { useHistory } from 'react-router'
import { useEffect } from 'react'
import { post } from '../util/rest'

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

    post('user/register', user, () => alert('Success!'))
  }

  return (
    <form onSubmit={event => handleRegister(event)}>
      <input required type="text" placeholder="username" />
      <input required type="email" placeholder="email" />
      <input required type="password" placeholder="password" />
      <input type="submit" value="Register" />
    </form>
  )
}
