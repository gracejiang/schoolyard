import React, { useState } from 'react'
import { remove } from '../../util/rest'
import { Modal, Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker'
import UploadIcs from "./UploadIcs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Calendar from "./Calendar";

function AddEventModal({show, setShow}) {
  const [isFreeBlock, setIsFreeBlock] = useState(false)
  const [isAllDay, setIsAllDay] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new time block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Title" required isInvalid/>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <ButtonGroup>
                <ToggleButton
                  id='radio-event-busy'
                  type="radio"
                  variant='outline-danger'
                  name="radio-event"
                  value={false}
                  checked={!isFreeBlock}
                  onChange={e => setIsFreeBlock(false)}
                >
                  Busy
                </ToggleButton>
                <ToggleButton
                  id='radio-event-free'
                  type="radio"
                  variant='outline-success'
                  name="radio-event"
                  value={true}
                  checked={isFreeBlock}
                  onChange={e => setIsFreeBlock(true)}
                >
                  Free
                </ToggleButton>
              </ButtonGroup>
              <Form.Text className="text-muted">
                <br/>
                Free time blocks indicate availability and override busy time blocks for scheduling purposes
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                id='is-all-day'
                label='Is all day?'
                checked={isAllDay}
                onChange={e => setIsAllDay(!isAllDay)}
              />
            </Form.Group>
            {!isAllDay && (
              <>
                <DateTimePicker value={startDate} onChange={setStartDate}/>
              </>
            )}
          </Form>
          Is all day?
          Start
          End
          Is recurring?
          Days of the week
          Recurrence start
          Recurrence end
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEventModal