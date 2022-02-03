import '../styles/App.css'
import React from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap'

function ClassDashboard() {
  return (
    <div style={{ margin: '2em' }}>
      <p>
        <a href='/'>Back to Home</a>
      </p>
      <Card>
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Card.Title>
              CIS 120: Programming Languages and Techniques I
            </Card.Title>
            <Button size='sm'>Join Class</Button>
          </div>
          <Card.Text>
            A fast-paced introduction to the fundamental concepts of programming
            and software design. This course assumes some previous programming
            experience, at the level of a high school computer science class or
            CIS110. (If you got at least 4 in the AP Computer Science A or AB
            exam, you will do great.) No specific programming language
            background is assumed: basic experience with any language (for
            instance Java, C, C++, VB, Python, Perl, or Scheme) is fine. If you
            have never programmed before, you should take CIS 110 first.
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '18%' }}>
          <Alert variant='success'>Class Details</Alert>
          <Card>
            <Card.Body>
              <Card.Title>Class Times</Card.Title>
              <p>MWF 1:45PM - 3:15PM</p>
              <Card.Title>Students</Card.Title>
              <Card.Text>
                <ul>
                  <li>Christina Lu</li>
                  <li>Grace Jiang</li>
                  <li>Carol Li</li>
                  <li>Damian Krupa</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div style={{ width: '60%' }}>
          <Alert variant='primary'>Discussion Posts</Alert>
          <Card className='bg-light' style={{ padding: '10px' }}>
            <Form.Group
              className='mb-3'
              controlId='exampleForm.ControlTextarea1'
            >
              <Form.Control
                as='textarea'
                placeholder='Write post here'
                rows={3}
              />
            </Form.Group>
            <Button>Post</Button>
          </Card>
        </div>
        <div style={{ width: '18%' }}>
          <Alert variant='warning'>Upcoming Assignments</Alert>
          <Card style={{ marginBottom: '10px' }}>
            <Card.Body>Homework 1</Card.Body>
          </Card>
          <Card>
            <Card.Body>Homework 2</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ClassDashboard
