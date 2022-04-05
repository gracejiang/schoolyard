import '../../styles/App.css'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {get} from '../../util/rest'

import {
  Figure,
  Container,
  Navbar,
  Card,
  Row,
  Col,
  Button,
  Alert,
} from 'react-bootstrap'

function GroupList() {
  const [allGroups, setAllGroups] = useState([])

  useEffect(() => {
    get(`group/groups`, result => {
      if (result?.data) setAllGroups([...result.data])
    })
  }, [])

  return (
    <div style={{ margin: '2em', textAlign: 'center' }}>
      <Container fluid>
        <br ></br>
        { allGroups.map((currGroup) => (
          <Card style={{ margin: '2em' }}>
            <Card.Body>
              <a href={`/group/${currGroup._id}`}>{ currGroup.group_name }</a>
            </Card.Body>
          </Card>
        )) }
      </Container>
    </div>
  )
}

export default GroupList
