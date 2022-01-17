import React, {useEffect, useState, useRef} from 'react'
import { post } from '../../util/rest'
import { Modal, Form, Button, ButtonGroup, ToggleButton, Col, Row } from "react-bootstrap";
import DateTimePicker from 'react-datetime'

import "react-datetime/css/react-datetime.css";


function AddEventModal({show, setShow}) {
  const startTimePicker = useRef()
  const endTimePicker = useRef()
  const startDatePicker = useRef()
  const endDatePicker = useRef()

  const [title, setTitle] = useState("")
  const [isFreeBlock, setIsFreeBlock] = useState(false)
  const [isAllDay, setIsAllDay] = useState(false)
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));

  const [isRecurring, setIsRecurring] = useState(false)
  const [isEndless, setIsEndless] = useState(true)
  const [startRecurDate, setStartRecurDate] = useState(new Date());
  const [endRecurDate, setEndRecurDate] = useState(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
  const [recurDays, setRecurDays] = useState([new Date().getDay()]);

  const isDateInvalid = () => ((isRecurring &&
    !(endDate?.getHours() > startDate?.getHours() ||
      (endDate?.getHours() === startDate?.getHours() && endDate?.getMinutes() > startDate?.getMinutes())))
    || (!isRecurring && endDate?.getTime() <= startDate?.getTime()))
  const isRecurDateInvalid = () => isRecurring && !isEndless && endRecurDate?.getTime() <= startRecurDate?.getTime()
  const isTitleInvalid = () => title.length >= 200

  const submit = () => {
    if (isRecurring) {
      startDate.setDate(endDate.getDate())
      startDate.setMonth(endDate.getMonth())
      startDate.setFullYear(endDate.getFullYear())
    }
    post("calendar/custom-event", {
      title: title || "",
      isFreeBlock,
      isRecurring,
      isEndless,
      isAllDay,
      startDate,
      endDate,
      startRecurDate,
      endRecurDate,
      recurDays,
    }, () => setShow(false))
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
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new time block</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={"(no title)"}
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
              id='is-recurring'
              label='Is recurring?'
              checked={isRecurring}
              onChange={e => setIsRecurring(!isRecurring)}
            />
          </Form.Group>
          {isRecurring && (
            <Row className="mb-3">
              <Col sm={1}/>
              <Col>
                <Form.Check
                  type="checkbox"
                  id='is-endless'
                  label='Is recurring endlessly?'
                  checked={isEndless}
                  onChange={e => setIsEndless(!isEndless)}
                  className="mb-2 mt-1"
                />
                <Row>
                  <Form.Group as={Col} className="mb-3">
                    <Form.Label>Start recurring event on:</Form.Label>
                    <DateTimePicker timeFormat={false} value={startRecurDate}
                                    onChange={date => setStartRecurDate(new Date(date))}/>
                  </Form.Group>
                  {!isEndless && (
                    <>
                      <Form.Group as={Col} className="mb-3">
                        <Form.Label>End recurring event on:</Form.Label>
                        <DateTimePicker timeFormat={false} value={endRecurDate}
                                        onChange={date => setEndRecurDate(new Date(date))}/>
                        {isRecurDateInvalid() && (
                          <Form.Text style={{display: "block"}} className="invalid-feedback">
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
                {["S", "M", "T", "W", "T", "F", "S"].map((dayLabel, dayIdx) => (
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
                      let newRecurDays;
                      if (idxInArr < 0) {
                        newRecurDays = [...recurDays, dayIdx];
                      } else {
                        newRecurDays = recurDays.slice(0, idxInArr).concat(recurDays.slice(idxInArr + 1))
                      }
                      setRecurDays(newRecurDays);
                    }}
                  />
                ))}
              </Col>
            </Row>
          )}
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
              {(isRecurring && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Start time</Form.Label>
                    <DateTimePicker ref={startTimePicker} initialViewMode="time" dateFormat={false} value={startDate}
                                    onChange={date => setStartDate(new Date(date))}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>End time</Form.Label>
                    <DateTimePicker ref={endTimePicker} initialViewMode="time" dateFormat={false} value={endDate}
                                    onChange={date => setEndDate(new Date(date))}/>
                  </Form.Group>
                </>
              )) || (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Start</Form.Label>
                    <DateTimePicker ref={startDatePicker} value={startDate} onChange={date => setStartDate(new Date(date))}/>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>End</Form.Label>
                    <DateTimePicker ref={endDatePicker} value={endDate} onChange={date => setEndDate(new Date(date))}/>
                  </Form.Group>
                </>
              )}
              {isDateInvalid() && (
                <Form.Text style={{display: "block"}} className="invalid-feedback">
                  End date must be after the start date
                </Form.Text>
              )}
            </>
          )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button
            variant="primary"
            disabled={isDateInvalid() || isRecurDateInvalid() || isTitleInvalid()}
            onClick={submit}
          >Save changes</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddEventModal