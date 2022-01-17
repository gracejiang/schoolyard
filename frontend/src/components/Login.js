import { useHistory } from 'react-router'
import { useEffect } from 'react'
import { post } from '../util/rest'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Form, Button } from 'react-bootstrap'

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
    <div style={{ margin: '1em' }}>
      <h1>Log In</h1>
      <Form onSubmit={e => handleLogin(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
