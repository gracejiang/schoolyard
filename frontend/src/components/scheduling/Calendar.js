import React, { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import '../../styles/Calendar.css'
import {get, getServerUrl, post} from '../../util/rest'
import IcsManagementModal from './IcsManagementModal'
import AddEventModal from './AddEventModal'


const updateCustomEvents = (customEvents, customEventsIds, setCustomEventsIds, calendarApi) => {
  if (!calendarApi) {
    return
  }
  const eventsToAdd = customEvents.filter(({ id }) => !customEventsIds.find(calendarEventId => calendarEventId === id))
  const eventsToRemove = customEventsIds.filter(calendarEventId  => !customEvents.find(customEvent => customEvent.id === calendarEventId ))
  for (const eventToAdd of eventsToAdd) {
    const eventObject = {
      id: eventToAdd.id,
      color: eventToAdd.isFreeBlock ? "green" : "purple",
//      allDay: eventToAdd.isAllDay,
      title: eventToAdd.title,
      isCustomEvent: true,
    }
    if (eventToAdd.isRecurring) {
      eventObject.groupId = eventToAdd.id
      eventObject.startTime = new Date(eventToAdd.startDate).toTimeString()
      eventObject.endTime = new Date(eventToAdd.endDate).toTimeString()
      eventObject.startRecur = new Date(eventToAdd.recurStartDate)
      if (!eventToAdd.isEndless) {
        eventObject.endRecur = new Date(eventToAdd.recurEndDate)
      }
      eventObject.daysOfWeek = eventToAdd.recurDays
    } else {
      eventObject.start = eventToAdd.startDate
      eventObject.end = eventToAdd.endDate
    }
    calendarApi.addEvent(eventObject)
  }
  for (const id of eventsToRemove) {
    calendarApi.getEventById(id)?.remove()
  }
  setCustomEventsIds(customEvents.map(({ id }) => id))
}

const updateIcsEventSources = (icsFiles, icsEventSourcesIds, setIcsEventSourcesIds, calendarApi) => {
  if (!calendarApi) {
    return
  }
  const icsToAdd = icsFiles.filter(({ s3IcsId }) => !icsEventSourcesIds.find(eventSourceId => eventSourceId === s3IcsId))
  const icsToRemove = icsEventSourcesIds.filter(s3IcsId => !icsFiles.find(icsFile => icsFile.s3IcsId === s3IcsId))
  for (const { s3IcsId } of icsToAdd) {
    calendarApi.addEventSource({
      id: s3IcsId,
      url: getServerUrl(`calendar/ics/${s3IcsId}?accessToken=${
        encodeURIComponent(localStorage.accessToken)}`),
      format: 'ics',
      editable: false,
    })
  }
  for (const s3IcsId of icsToRemove) {
    calendarApi.getEventSourceById(s3IcsId)?.remove()
  }
  setIcsEventSourcesIds(icsFiles.map(({ s3IcsId }) => s3IcsId))
}

function Calendar({ isPreview, previewIcsFiles }) {
  const calendarRef = useRef()
  const [showIcsManagementModal, setShowIcsManagementModal] = useState(false)
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [customEvents, setCustomEvents] = useState([])
  const [customEventsIds, setCustomEventsIds] = useState([]) // ids of custom events already added to calendar
  const [icsFiles, setIcsFiles] = useState([])
  const [icsEventSourcesIds, setIcsEventSourcesIds] = useState([]) // ids of ics files already added to calendar
  const [editingEvent, setEditingEvent] = useState(false)
  const [editedEvent, setEditedEvent] = useState(null)
  const [eventEditPending, setEventEditPending] = useState(false)

  const parseCustomEventPayload = ({
     end_date,
     is_all_day,
     is_endless,
     is_free_block,
     is_recurring,
     recur_days,
     recur_end_date,
     recur_start_date,
     start_date,
     title,
     _id
    }) => ({
      id: _id,
      title,
      startDate: start_date,
      endDate: end_date,
      isAllDay: is_all_day,
      isFreeBlock: is_free_block,
      isRecurring: is_recurring,
      isEndless: is_endless,
      recurDays: recur_days,
      recurEndDate: recur_end_date,
      recurStartDate: recur_start_date,
  })

  useEffect(() => {
    if (!isPreview) {
      get('calendar/ics', result => {
        if (result?.data?.length) {
          setIcsFiles([
            ...result.data.map(({ ics_name, s3_ics_id }) => ({ icsName: ics_name, s3IcsId: s3_ics_id })),
          ])
        }
      })
      get('calendar/custom-events', result => {
        if (result?.data?.length) {
          setCustomEvents([
            ...result.data.map(parseCustomEventPayload),
          ])
        }
      })
    } else {
      setIcsFiles([...previewIcsFiles])
    }
  }, [])

  useEffect(() => {
    updateIcsEventSources(icsFiles, icsEventSourcesIds, setIcsEventSourcesIds, calendarRef?.current?.getApi())
  }, [calendarRef, icsFiles])

  useEffect(() => {
    updateCustomEvents(customEvents, customEventsIds, setCustomEventsIds, calendarRef?.current?.getApi())
  }, [calendarRef, customEvents])

  return (
    <div className="schedule">
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, iCalendarPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        eventMaxStack={3}
        editable
        contentHeight={600}
        nowIndicator
        selectable
        scrollTime="08:00:00"
        scrollTimeReset={false}
        allDaySlot={false}
        select={info => {
          info.jsEvent.preventDefault() // don't let the browser navigate
          calendarRef?.current?.getApi()?.unselect()
          setEditedEvent({startDate: info.start, endDate: info.end})
          setShowAddEventModal(true)
        }}
        eventClick={info => {
          info.jsEvent.preventDefault(); // don't let the browser navigate
          if (!showAddEventModal && info.event.extendedProps.isCustomEvent) {
            setEditedEvent(customEvents.find(ev => ev.id === info.event.id))
            setEditingEvent(true)
            setShowAddEventModal(true)
          }
        }}
        eventChange={info => {
          const ev = customEvents.find(ev => ev.id === info?.event?.id)
          const startTimeDiff = info.event.start.getTime() - info.oldEvent.start.getTime()
          const endTimeDiff = info.event.end.getTime() - info.oldEvent.end.getTime()
          const daysDragged = info.event.start.getDay() - info.oldEvent.start.getDay()
          if (!ev || eventEditPending || (ev.isRecurring && info.event.end.getDay() - info.oldEvent.end.getDay() !== daysDragged)) {
            info.revert()
            return
          }

          setEventEditPending(true)
          post('calendar/custom-event', {
            title: ev.title,
            isFreeBlock: ev.isFreeBlock,
            isRecurring: ev.isRecurring,
            isEndless: ev.isEndless,
            isAllDay: ev.isAllDay,
            startDate: !ev.isAllDay && ev.startDate ? new Date(new Date(ev.startDate).getTime() + startTimeDiff) : null,
            endDate: !ev.isAllDay && ev.endDate ? new Date(new Date(ev.endDate).getTime() + endTimeDiff) : null,
            startRecurDate: ev.isRecurring && ev.recurStartDate ? new Date(new Date(ev.recurStartDate).getTime() + startTimeDiff) : null,
            endRecurDate: ev.isRecurring && !ev.isEndless && ev.recurEndDate ? new Date(new Date(ev.recurEndDate).getTime() + endTimeDiff) : null,
            recurDays: ev.recurDays?.map(day => ((day + daysDragged) % 7) < 0 ? 7 + ((day + daysDragged) % 7) : ((day + daysDragged) % 7)),
            id: ev.id,
          }, result => {
            const idx = customEvents.findIndex(ev => ev.id === info?.event?.id)
            setCustomEvents([...customEvents.slice(0, idx).concat(customEvents.slice(idx + 1)), parseCustomEventPayload(result.data)])
            setEventEditPending(false)
          })
        }}
        customButtons={{
          manageIcs: isPreview ? undefined : {
            text: 'iCal files',
            click: () => {
              setShowIcsManagementModal(true)
            },
          },
          addEvent: isPreview ? undefined : {
            text: 'Add +',
            click: () => {
              setShowAddEventModal(true)
            },
          },
        }}
        headerToolbar={{
          left: isPreview ? '' : 'addEvent manageIcs',
          right: 'prev,next today',
          center: 'title',
        }}
      />
      {!isPreview && (
      <IcsManagementModal
        show={showIcsManagementModal}
        setShow={setShowIcsManagementModal}
        icsFiles={icsFiles}
        setIcsFiles={setIcsFiles}
      />
      )}
      {!isPreview && (showAddEventModal && (
      <AddEventModal
        show={showAddEventModal}
        setShow={setShowAddEventModal}
        isEdit={editingEvent}
        editedEvent={editedEvent}
        customEvents={customEvents}
        setCustomEvents={setCustomEvents}
        parseCustomEventPayload={parseCustomEventPayload}
        setEditingEvent={setEditingEvent}
        setEditedEvent={setEditedEvent}
      />
      ))}
    </div>
  )
}

export default Calendar
