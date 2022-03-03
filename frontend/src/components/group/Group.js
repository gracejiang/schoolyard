import '../../styles/App.css'
import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {get, post} from '../../util/rest'

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

// const [group, setGroup] = useState('')

function Group() {

  // useEffect(() => {
  //   get(`group/group/:id`, result => {
  //     if (result?.data) setGroup(result.data)
  //   })
  // })

  return (
    <Container fluid>
      <br />
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <h1>Group Name</h1>
          <Card.Text>
            A group that has a lot of ducks!
          </Card.Text>
          <Button variant="outline-info">Clubs</Button>
          {' '}
          <Button variant="outline-info">Developing</Button>
          {' '}
          <Button variant="outline-info">Ducks</Button>
          {' '}
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </Card>
      <br />
      <Row>
        <Col xs="8">
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Description</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et dapibus nunc. Vivamus sit amet est lacinia, semper sem ut, laoreet est. Etiam interdum tortor velit, vel porta turpis mollis a. Nullam sagittis mi vel diam placerat molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras efficitur velit nunc, pharetra consequat lorem rutrum sed. Phasellus pellentesque eleifend convallis. Sed pulvinar feugiat congue. Ut tincidunt vel nibh quis faucibus. Praesent accumsan sem eu tellus convallis, quis pretium nisl elementum. Fusce finibus aliquam commodo. Cras nec nisl ornare, lacinia velit in, pulvinar felis.

                Praesent ut rutrum sapien, vitae pulvinar nisl. Nulla facilisi. Curabitur malesuada efficitur quam, at sagittis purus vulputate in. Nam sed consequat metus. Nullam leo velit, imperdiet et vulputate quis, imperdiet sit amet lorem. Nunc ultricies nisi et libero finibus suscipit. Proin tempor nunc ut enim dignissim, id ultricies odio malesuada. Maecenas non placerat est. Nullam aliquam neque urna, ac viverra lacus dapibus ornare. Cras velit orci, mollis vel congue sit amet, mollis ut purus. Vivamus molestie libero nec imperdiet pulvinar. Etiam congue, augue non aliquam rhoncus, nisi nisi placerat velit, non consectetur sem metus ac erat. Nam cursus finibus magna, eu convallis odio aliquet id. Pellentesque augue dui, pulvinar sed maximus quis, feugiat id justo. Maecenas a pharetra lorem.

                Aliquam congue sem dui, eget ultrices leo mollis eu. Ut dictum odio a odio imperdiet euismod. Praesent placerat varius velit id tincidunt. Suspendisse ac tortor sed mauris pretium ultricies. Suspendisse metus sapien, condimentum id metus non, facilisis placerat odio. Fusce sit amet nisi ligula. Ut sit amet ligula nec turpis tincidunt hendrerit et nec leo.

                Proin scelerisque, metus et tempus eleifend, quam mauris consectetur ipsum, nec gravida velit nulla ut ligula. Integer est nunc, posuere quis sem a, vulputate maximus ante. Suspendisse potenti. Aenean vitae ex ipsum. Aenean at nulla nec lorem pretium rhoncus. Integer lacus velit, lacinia et leo eget, egestas pellentesque lacus. Vestibulum luctus, nulla et gravida rhoncus, velit felis vulputate ipsum, sed vehicula nisl odio ac nulla. Vivamus vitae sem dolor. Aliquam id turpis eu neque aliquet dictum. In hac habitasse platea dictumst.

                Aenean volutpat convallis sapien, eget posuere magna. Ut a eros dapibus, feugiat magna vel, ultrices sem. Donec nec sodales est, eget mattis nisl. Aliquam sed pulvinar nisl. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper velit justo, id venenatis velit facilisis sit amet. Sed eget congue lectus. Mauris venenatis convallis odio, nec aliquet mauris commodo sed. Mauris venenatis diam ac diam ultrices, quis ornare lorem tempus.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Frequently Asked Questions</Card.Title>
              <Alert variant="info">
                Do you need to be a Penn student to join the group?
              </Alert>
              <Card.Text>No, you do not.</Card.Text>
              <Alert variant="info">
                Do you need to be a Penn student to join the group?
              </Alert>
              <Card.Text>No, you do not.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>Basic Information</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              <Card.Title>Contact</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
          <br />
          <Card style={{ width: '100%' }}>
            <Card.Body>
              <Card.Title>How to Join</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Group
