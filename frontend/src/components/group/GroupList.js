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

function Group() {
  const [allGroups, setAllGroups] = useState([])

  useEffect(() => {
    get(`group/groups`, result => {
      if (result?.data) setAllGroups([...result.data])
    })
  }, [])

  return (
    <Container fluid>
      <br ></br>
      { allGroups.map((currGroup) => (
        <Card>
          <Card.Body>
            <a href={`/group/${currGroup._id}`}>{ currGroup.group_name }</a>
          </Card.Body>
        </Card>
      )) }
    </Container>
  )
}

export default Group
