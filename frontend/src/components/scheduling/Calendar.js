import React, { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import '../../styles/Calendar.css'
import { get, getServerUrl } from '../../util/rest'
import IcsManagementModal from './IcsManagementModal'
import AddEventModal from './AddEventModal'

const updateIcsEventSources = (icsFiles, icsEventSourcesIds, setIcsEventSourcesIds, calendarApi, isPreview) => {
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
      editable: !isPreview,
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
  const [icsFiles, setIcsFiles] = useState([])
  const [icsEventSourcesIds, setIcsEventSourcesIds] = useState([]) // ids of ics files already added to calendar

  useEffect(() => {
    if (!isPreview) {
      get('calendar/ics', result => {
        if (result?.data?.length) {
          setIcsFiles([
            ...result.data.map(({ ics_name, s3_ics_id }) => ({ icsName: ics_name, s3IcsId: s3_ics_id })),
          ])
        }
      })
    } else {
      setIcsFiles([...previewIcsFiles])
    }
  }, [])

  useEffect(() => {
    updateIcsEventSources(icsFiles, icsEventSourcesIds, setIcsEventSourcesIds, calendarRef?.current?.getApi(), isPreview)
  }, [calendarRef, isPreview, icsFiles])

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
        scrollTime="08:00:00"
        scrollTimeReset={false}
        allDaySlot={false}
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
      />
      ))}
    </div>
  )
}

export default Calendar
