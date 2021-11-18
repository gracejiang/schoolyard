import React, { useState, useEffect } from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, Form } from 'react-bootstrap'

const COURSES_URL =
  'https://apps.wharton.upenn.edu/reports/1443/data/?&course_dept=all&req_satisfied=all&ccp_flag=all'

export default function Classes() {
  useEffect(() => {
    axios
      .get(COURSES_URL)
      .then((res) => {
        setCourses(res.data.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')

  return (
    <div style={{ margin: '1em' }}>
      <Form>
        <Form.Group className='mb-3'>
          <Form.Control
            type='text'
            placeholder='Search for classes by department'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {courses
          .filter((c) =>
            c.course_dept.toLowerCase().includes(search.toLowerCase())
          )
          .slice(0, 52)
          .map((c) => (
            <Card style={{ width: '18rem', margin: '0.2em' }}>
              <Card.Body>
                <Card.Title>{c.course_dept + ' ' + c.course_number}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  {c.course_title}
                </Card.Subtitle>
                {/* <Button variant='primary'>Join Class</Button> */}
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  )
}
