import React, { useRef } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import iCalendarPlugin from '@fullcalendar/icalendar'

function Calendar() {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin, iCalendarPlugin]}
        initialView="dayGridWeek"
        events={{
          url: `http://localhost:8082/calendar/ics/4c875e0e-ce5c-43ef-83c5-86d66f6236a1?accessToken=${
            encodeURIComponent(localStorage.accessToken)}`,
          format: 'ics',
        }}
      />
    </>
  )
}

export default Calendar
