import '../styles/App.css'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {get} from '../util/rest'

import {
  Container,
  Card,
  Button,
  Form,
} from 'react-bootstrap'

function ProfileList() {
  const [allProfiles, setAllProfiles] = useState([])
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (query.length > 0) {
      get(`${query}`, result => {
        if (result?.data.length > 1) setAllProfiles([...result.data])
        else if (result?.data) setAllProfiles([result.data])
      })
    }
  }, [query])

  return (
    <div style={{ margin: '2em', textAlign: 'center' }}>
      <Container fluid>
        <div className='search-bars'>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Search for a User</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username to search"
                style={{ width: '100%'}}
                value={ search }
                onChange={ (e) => setSearch(e.target.value) }
              />
            </Form.Group>
            <Button
              variant='primary'
              onClick={(e) => {
                setQuery('user/profile/' + search)
              }}
              style={{
                marginRight: '1em'
              }}
            >
              Search
            </Button>
            <Button
              variant='info'
              onClick={(e) => {
                setQuery('user/users')
              }}
            >
              Get All Users
            </Button>
          </Form>
        </div>
        <br ></br>
        { allProfiles.length == 0 && (
          <div>
          <p className='text-muted'>
            No users found. Please update your search query.
          </p>
        </div>
        )}
        { allProfiles
            .map((currProfile) => (
              <Card style={{ margin: '2em' }}>
                <Card.Body>
                  <a href={`/profile/${currProfile.username}`}>{
                    currProfile.first_name + " " + currProfile.last_name
                  }</a>
                </Card.Body>
              </Card>
        )) }
      </Container>
    </div>
  )
}

export default ProfileList
