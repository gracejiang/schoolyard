import React, { useEffect, useState, useRef } from 'react'
import {
  Modal, Form, Button, ButtonGroup, ToggleButton, Col, Row,
} from 'react-bootstrap'
import DateTimePicker from 'react-datetime'
import { post, remove } from '../../util/rest'

import 'react-datetime/css/react-datetime.css'

function AddEventModal({
  show, setShow, isEdit, editedEvent, customEvents, setCustomEvents, parseCustomEventPayload, setEditingEvent, setEditedEvent,
}) {
  const timeClosest15Multiple = Math.ceil(new Date().getTime() / 15 / 60 / 1000) * 15 * 60 * 1000
  const startTimePicker = useRef()
  const endTimePicker = useRef()
  const startDatePicker = useRef()
  const endDatePicker = useRef()

  const [title, setTitle] = useState(isEdit ? editedEvent.title : '')
  const [isFreeBlock, setIsFreeBlock] = useState(isEdit ? editedEvent.isFreeBlock : false)
  const [isAllDay] = useState(isEdit ? editedEvent.isAllDay : false)
  const [startDate, setStartDate] = useState(editedEvent?.startDate ? new Date(editedEvent.startDate) : new Date(timeClosest15Multiple))
  const [endDate, setEndDate] = useState(editedEvent?.endDate ? new Date(editedEvent.endDate) : new Date(timeClosest15Multiple + 60 * 60 * 1000))

  const [isRecurring, setIsRecurring] = useState(isEdit ? editedEvent.isRecurring : false)
  const [isEndless, setIsEndless] = useState(isEdit ? editedEvent.isEndless : true)
  const [startRecurDate, setStartRecurDate] = useState(isEdit && editedEvent.isRecurring
    ? new Date(editedEvent.recurStartDate) : new Date())
  const [endRecurDate, setEndRecurDate] = useState(isEdit && editedEvent.isRecurring && !editedEvent.isEndless
    ? new Date(editedEvent.recurEndDate) : new Date(new Date().getTime() + 24 * 60 * 60 * 1000))
  const [recurDays, setRecurDays] = useState(isEdit && editedEvent.isRecurring ? editedEvent.recurDays : [new Date().getDay()])

  const isDateInvalid = () => ((isRecurring
    && !(endDate?.getHours() > startDate?.getHours()
      || (endDate?.getHours() === startDate?.getHours() && endDate?.getMinutes() > startDate?.getMinutes())))
    || (!isRecurring && endDate?.getTime() <= startDate?.getTime()))
  const isRecurDateInvalid = () => isRecurring && !isEndless && endRecurDate?.getTime() <= startRecurDate?.getTime()
  const isTitleInvalid = () => title.length >= 200

  const close = () => {
    setEditingEvent(false)
    setEditedEvent(null)
    setShow(false)
  }

  const removeEvent = () => {
    remove(`calendar/custom-event/${editedEvent.id}`, null, () => {
      const idx = customEvents.findIndex(ev => ev.id === editedEvent.id)
      setCustomEvents(customEvents.slice(0, idx).concat(customEvents.slice(idx + 1)))
      close()
    })
  }

  const submit = () => {
    if (isRecurring) {
      startDate.setDate(endDate.getDate())
      startDate.setMonth(endDate.getMonth())
      startDate.setFullYear(endDate.getFullYear())
    }
    post('calendar/custom-event', {
      title: title || '',
      isFreeBlock,
      isRecurring,
      isEndless,
      isAllDay,
      startDate,
      endDate,
      startRecurDate,
      endRecurDate,
      recurDays,
      id: isEdit ? editedEvent.id : null,
    }, result => {
      let newCustomEvents = customEvents
      if (isEdit) {
        const idx = customEvents.findIndex(ev => ev.id === editedEvent.id)
        newCustomEvents = customEvents.slice(0, idx).concat(customEvents.slice(idx + 1))
        setCustomEvents(newCustomEvents)
      }
      setCustomEvents([...newCustomEvents, parseCustomEventPayload(result.data)])
      close()
    })
  }

  useEffect(() => {
    if (isRecurring) {
      startTimePicker?.current?.navigate('time')
      endTimePicker?.current?.navigate('time')
    } else {
      startDatePicker?.current?.navigate('days')
      endDatePicker?.current?.navigate('days')
    }
  }, [isRecurring, show, startTimePicker, endTimePicker, startDatePicker, endDatePicker])

  return (
    <>
      <Modal show={show} onHide={() => close()}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!isEdit ? 'Add new ' : 'Edit the '}
            time block
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="(no title)"
                isInvalid={isTitleInvalid()}
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Title should have fewer than 200 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <ButtonGroup>
                <ToggleButton
                  id="radio-event-busy"
                  type="radio"
                  variant="outline-danger"
                  name="radio-event"
                  value={false}
                  checked={!isFreeBlock}
                  onChange={e => setIsFreeBlock(false)}
                >
                  Busy
                </ToggleButton>
                <ToggleButton
                  id="radio-event-free"
                  type="radio"
                  variant="outline-success"
                  name="radio-event"
                  value
                  checked={isFreeBlock}
                  onChange={e => setIsFreeBlock(true)}
                >
                  Free
                </ToggleButton>
              </ButtonGroup>
              <Form.Text className="text-muted">
                <br />
                Free time blocks indicate availability and override busy time blocks for scheduling purposes
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                id="is-recurring"
                label="Is recurring?"
                checked={isRecurring}
                onChange={e => setIsRecurring(!isRecurring)}
              />
            </Form.Group>
            {isRecurring && (
            <Row className="mb-3">
              <Col sm={1} />
              <Col>
                <Form.Check
                  type="checkbox"
                  id="is-endless"
                  label="Is recurring endlessly?"
                  checked={isEndless}
                  onChange={e => setIsEndless(!isEndless)}
                  className="mb-2 mt-1"
                />
                <Row>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Start recurring event on:</Form.Label>
                    <DateTimePicker
                      timeFormat={false}
                      value={startRecurDate}
                      onChange={date => setStartRecurDate(new Date(date))}
                    />
                  </Form.Group>
                  {!isEndless && (
                    <>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label>End recurring event on:</Form.Label>
                        <DateTimePicker
                          timeFormat={false}
                          value={endRecurDate}
                          onChange={date => setEndRecurDate(new Date(date))}
                        />
                        {isRecurDateInvalid() && (
                          <Form.Text style={{ display: 'block' }} className="invalid-feedback">
                            End recurring date must be after the start recurring date
                          </Form.Text>
                        )}
                      </Form.Group>
                    </>
                  )}
                </Row>
                <Row>
                  <Form.Label>
                    Repeat weekly on
                  </Form.Label>
                </Row>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((dayLabel, dayIdx) => (
                  <Form.Check
                    key={dayIdx}
                    type="checkbox"
                    inline
                    id={`day-select-${dayIdx}`}
                    label={dayLabel}
                    checked={recurDays.indexOf(dayIdx) >= 0}
                    disabled={recurDays.length === 1 && recurDays.indexOf(dayIdx) >= 0}
                    onChange={e => {
                      const idxInArr = recurDays.indexOf(dayIdx)
                      let newRecurDays
                      if (idxInArr < 0) {
                        newRecurDays = [...recurDays, dayIdx]
                      } else {
                        newRecurDays = recurDays.slice(0, idxInArr).concat(recurDays.slice(idxInArr + 1))
                      }
                      setRecurDays(newRecurDays)
                    }}
                  />
                ))}
              </Col>
            </Row>
            )}
            {!isAllDay && (
            <>
              {(isRecurring && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Start time</Form.Label>
                    <DateTimePicker
                      ref={startTimePicker}
                      initialViewMode="time"
                      dateFormat={false}
                      value={startDate}
                      onChange={date => setStartDate(new Date(date))}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>End time</Form.Label>
                    <DateTimePicker
                      ref={endTimePicker}
                      initialViewMode="time"
                      dateFormat={false}
                      value={endDate}
                      onChange={date => setEndDate(new Date(date))}
                    />
                  </Form.Group>
                </>
              )) || (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Start</Form.Label>
                    <DateTimePicker ref={startDatePicker} value={startDate} onChange={date => setStartDate(new Date(date))} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>End</Form.Label>
                    <DateTimePicker ref={endDatePicker} value={endDate} onChange={date => setEndDate(new Date(date))} />
                  </Form.Group>
                </>
              )}
              {isDateInvalid() && (
                <Form.Text style={{ display: 'block' }} className="invalid-feedback">
                  End date must be after the start date
                </Form.Text>
              )}
            </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {isEdit && (
          <>
            <button type="button" className="btn btn-danger" onClick={removeEvent}>Remove</button>
            <div style={{ flex: 1 }} />
          </>
          )}
          <Button variant="secondary" onClick={() => close()}>Close</Button>
          <Button
            variant="primary"
            disabled={isDateInvalid() || isRecurDateInvalid() || isTitleInvalid()}
            onClick={submit}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEventModal
