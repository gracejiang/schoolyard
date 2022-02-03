import '../styles/App.css'
import React from 'react'
import { Button, Card, Form } from 'react-bootstrap'

function ClassDashboard() {
  return (
    <div style={{ margin: '2em' }}>
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
        <Card style={{ width: '18%' }}>
          <p>Lecture</p>
          <p>MFW 1:45PM - 3:15PM</p>
          <p>Other class details</p>
        </Card>
        <Card style={{ width: '60%' }}>Discussion Posts</Card>
        <Card style={{ width: '18%' }}>Upcoming Assignments</Card>
      </div>
    </div>
  )
}

export default ClassDashboard
