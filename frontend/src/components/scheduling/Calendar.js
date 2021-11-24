import React, { useRef, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'
import "../../styles/Calendar.css"
import {get, getServerUrl} from "../../util/rest";
import IcsManagementModal from "./IcsManagementModal";

function Calendar() {
  const calendarRef = useRef();
  const [showIcsManagementModal, setShowIcsManagementModal] = useState(false)
  useEffect(() => {
    get("calendar/ics", result => {
      if (result?.data?.length) {
        for (const icsId of result.data) {
          calendarRef.current.getApi().addEventSource({
            url: getServerUrl(`calendar/ics/${icsId}?accessToken=${
              encodeURIComponent(localStorage.accessToken)}`),
            format: 'ics',
          })
        }
      }
    });
  }, [])
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, iCalendarPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        eventMaxStack={3}
        editable={true}
        contentHeight={600}
        nowIndicator={true}
        scrollTime={"08:00:00"}
        scrollTimeReset={false}
        allDaySlot={false}
        customButtons={{
          manageIcs: {
            text: 'iCal files',
            click: () => {
              setShowIcsManagementModal(true)
            }
          }
        }}
        headerToolbar={{
          left: 'manageIcs',
          right: 'prev,next today',
          center: 'title',
        }}
      />
      <IcsManagementModal
        show={showIcsManagementModal}
        setShow={setShowIcsManagementModal}
        calendarApi={calendarRef?.current?.getApi()}
      />
    </>
  )
}

export default Calendar
