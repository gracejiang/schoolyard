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
      first_name: form[3].value,
      last_name: form[4].value,
      school_affiliation: form[5].value,
      grad_year: form[6].value,
      major: form[7].value,
      bio: form[8].value,
      profile_photo: form[9].value,
    }

    post('user/register', user, () => {
      alert('Success!')
      window.location.pathname = '/login'
    })
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

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" placeholder="eg. Grace" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="eg. Jiang"/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>School Affiliation</Form.Label>
          <Form.Select>
            <option>Select your school from the following options.</option>
            <option value="CAS">College of Arts and Sciences</option>
            <option value="Wharton">Wharton</option>
            <option value="SEAS">School of Engineering and Applied Science</option>
            <option value="Nursing">Nursing</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Graduation Year</Form.Label>
          <Form.Select>
            <option>Select your graduation year from the following options.</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Major</Form.Label>
          <Form.Control type="text" placeholder="eg. Computer and Information Science" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Bio</Form.Label>
          <Form.Control type="text" placeholder="Write bio here." style={{ height: '100px' }} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Profile Photo Link</Form.Label>
          <Form.Control type="text" placeholder="In the form of http://image.jpg or .png" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}
