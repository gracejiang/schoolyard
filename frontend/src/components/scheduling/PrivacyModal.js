import React, { useState } from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {put} from '../../util/rest'

function PrivacyModal({
  show, setShow, user, setUser
}) {
  const [showCalendarEventNames, setShowCalendarEventNames] = useState(!!user.showCalendarEventNames)
  const [showCalendarEventColors, setShowCalendarEventColors] = useState(!!user.showCalendarEventColors)
  const submit = () => {
    put('user', {
      showCalendarEventNames,
      showCalendarEventColors
    }, result => {
      if (result?.data) {
        setUser(result.data)
      }
      setShow(false)
    })
  }
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Calendar Privacy Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Check
              type="checkbox"
              id="privacy-event-names"
              label="Allow others to see names of your events"
              checked={!!showCalendarEventNames}
              onChange={e => setShowCalendarEventNames(!showCalendarEventNames)}
            />
            <Form.Check
              type="checkbox"
              id="privacy-event-colors"
              label="Allow others to see colors of your events"
              checked={!!showCalendarEventColors}
              onChange={e => setShowCalendarEventColors(!showCalendarEventColors)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button
            variant="primary"
            onClick={submit}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default PrivacyModal
