import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

function Calendar() {
  const calendarRef = useRef();
  window.setTimeout(() => {
    console.log(calendarRef.current)
  })
  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[timeGridPlugin, iCalendarPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={{
          url: `http://localhost:8082/calendar/ics/4c875e0e-ce5c-43ef-83c5-86d66f6236a1?accessToken=${
            encodeURIComponent(localStorage.accessToken)}`,
          format: 'ics',
        }}
        eventMaxStack={3}
        editable={true}
        contentHeight={600}
        nowIndicator={true}
        scrollTime={"08:00:00"}
        scrollTimeReset={false}
        allDaySlot={false}
      />
    </>
  )
}

export default Calendar
