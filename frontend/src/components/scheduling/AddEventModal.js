import React, { useState } from 'react'
import { remove } from '../../util/rest'
import { Modal, Form, Button, ButtonGroup, ToggleButton } from "react-bootstrap";
import DateTimePicker from 'react-datetime'
import UploadIcs from "./UploadIcs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import Calendar from "./Calendar";

import "react-datetime/css/react-datetime.css";


function AddEventModal({show, setShow}) {
  const [isFreeBlock, setIsFreeBlock] = useState(false)
  const [isAllDay, setIsAllDay] = useState(false)
  const [isRecurring, setIsRecurring] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
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
                <Form.Group className="mb-3">
                  <Form.Label>Start:</Form.Label>
                  <DateTimePicker value={startDate} onChange={setStartDate}/>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>End:</Form.Label>
                  <DateTimePicker value={endDate} onChange={setEndDate}/>
                </Form.Group>
              </>
            )}
          </Form>
          <Form.Group>
            <Form.Check
              type="checkbox"
              id='is-recurring'
              label='Is recurring?'
              checked={isRecurring}
              onChange={e => setIsRecurring(!isRecurring)}
            />
          </Form.Group>
          {isRecurring && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Start recurring event on:</Form.Label>
                <DateTimePicker timeFormat={false} value={startDate} onChange={setStartDate}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>End recurring event on:</Form.Label>
                <DateTimePicker timeFormat={false} value={endDate} onChange={setEndDate}/>
              </Form.Group>
            </>
          )}
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