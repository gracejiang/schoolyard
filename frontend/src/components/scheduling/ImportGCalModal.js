import React, {useEffect, useState} from 'react'
import { Modal, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UploadIcs from './UploadIcs'
import {post, remove} from '../../util/rest'
import Calendar from './Calendar'
import {loadCalendarEvents, loadCalendarList} from "../../util/gapi";

function ImportGCalModal({
  show, setShow
}) {
  const [calendarsList, setCalendarsList] = useState([])
  const [isImportingCalendar, setIsImportingCalendar] = useState(false)
  useEffect(() => {
    if (show) {
      loadCalendarList().then(setCalendarsList).catch(() => setShow(false))
    }
  }, [show])

  const importCalendarEvents = (calendarId, calendarName) => {
    setIsImportingCalendar(true)
    loadCalendarEvents(calendarId).then(events => {
      if (!events?.length) {
        setShow(false)
        return
      }
      const parsedEvents = events.filter(event => event?.start?.dateTime && event?.end?.dateTime).map(event => {
        const rrule = event?.recurrence?.find(rule => rule.indexOf("RRULE") >= 0)
        const parsedEvent = {
          startDate: event.start.dateTime,
          endDate: event.end.dateTime,
          isRecurring: !!rrule,
          title: event.summary,
        }
        if (rrule) {
          parsedEvent.rrule = rrule
          const startRecurDate = new Date(event.start.dateTime)
          startRecurDate.setMinutes(0)
          startRecurDate.setHours(0)
          startRecurDate.setSeconds(0)
          startRecurDate.setMilliseconds(0)
          parsedEvent.startRecurDate = startRecurDate.toISOString()
        }
        return parsedEvent
      })
      post('calendar/gcal-events', {
        gcalId: calendarId,
        gcalName: calendarName,
        events: parsedEvents,
      }, result => {

        setShow(false)
      })
    }).catch(() => setShow(false))
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Import Google Calendar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { !calendarsList?.length ? 'Loading a list of importable calendars...' : (
            isImportingCalendar ? 'Importing calendar events...' : (
              <>
                Choose a calendar to import events from:
                <Table striped bordered hover>
                  <tbody>
                  {calendarsList.map(({ id, summary }) => (
                    <tr key={id}>
                      <td
                        style={{ cursor: 'pointer' }}
                        onClick={() => importCalendarEvents(id, summary)}
                      >
                        {summary}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </>
          ))}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ImportGCalModal
