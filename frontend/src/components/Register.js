import { useHistory } from 'react-router'
import { useEffect } from 'react'
import { post } from '../util/rest'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Form, Button } from 'react-bootstrap'

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
    <div style={{ margin: '1em' }}>
      <h1>Register</h1>
      <Form onSubmit={e => handleRegister(e)}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Email" />
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
