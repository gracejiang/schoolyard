import { useHistory } from 'react-router'
import { useEffect } from 'react'
import { post } from '../../util/rest'

import 'bootstrap/dist/css/bootstrap.min.css'

import { Form, Button } from 'react-bootstrap'

export default function CreateGroup() {
    const history = useHistory()

    async function handleCreateGroup(e) {
        e.preventDefault()
    
        const form = e.target
        const group = {
          group_name: form[0].value,
          description: form[1].value,
          basic_info: form[2].value, 
          contact_email: form[3].value,
          contact_number: form[4].value,
          join_instructions: form[5].value,
          slug: form[6].value,
        }
    
        post('group/create', group, () => alert('Success!'))
      }
    
      return (
        <div style={{ margin: '1em' }}>
          <h1>Register</h1>
          <Form onSubmit={e => handleCreateGroup(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control type="text" placeholder="eg. CIS 401 Party" />
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="eg. We are a group of cool students who like to code." style={{ height: '100px' }}/>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Basic Information</Form.Label>
              <Form.Control type="text" placeholder="Input basic information of the group." />
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="text" placeholder="Put an email where it is easy to reach you." />
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Put a phone number where it is easy to reach you."/>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Join Instructions</Form.Label>
              <Form.Control type="text" placeholder="How do users join this group?"/>
            </Form.Group>
    
            <Form.Group className="mb-3">
              <Form.Label>Slug</Form.Label>
              <Form.Control type="text" placeholder="Custom join URL, eg. cis401-party"/>
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      )
}