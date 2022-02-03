import React, { useState, useEffect } from 'react'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/classes.css'
import { Button, Card, Form } from 'react-bootstrap'

const COURSES_URL =
  'https://penncoursereview.com/api/base/2022A/search/courses/?search='

export default function Classes() {
  const [courses, setCourses] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const ENDPOINT = `${COURSES_URL}${query}`
    if (query !== '') {
      axios
        .get(ENDPOINT)
        .then((res) => {
          setCourses(res.data)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }
  }, [query])

  return (
    <div style={{ margin: '2em' }}>
      <div className='search-bars'>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Search for classes</Form.Label>
            <Form.Control
              type='text'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form.Group>
          <Button
            variant='success'
            onClick={(e) => {
              setQuery(search)
            }}
          >
            Search
          </Button>
        </Form>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {courses.length == 0 && (
          <div className='bg-light no-courses'>
            <p className='text-muted'>
              <em>No courses found. Please enter a search query.</em>
            </p>
          </div>
        )}
        {courses
          .filter((c) => c.num_sections > 0)
          .slice(0, 24)
          .map((c) => (
            <Card className='class-card'>
              <Card.Body>
                <div className='class-card-header'>
                  <div>
                    <Card.Title>
                      <strong>{c.id.replace('-', ' ')}</strong>
                    </Card.Title>{' '}
                    <Card.Subtitle className='class-title'>
                      {c.title}
                    </Card.Subtitle>
                  </div>
                  <div>
                    <Button size='sm'>Join</Button>
                  </div>
                </div>
                <Card.Text className='mb-2 text-muted class-preview'>
                  {c.description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
  )
}
