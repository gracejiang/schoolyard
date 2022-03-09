import '../../styles/App.css'
import {
  Button, Container, Col, Card, Table, Form, Modal,
} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import Calendar from './Calendar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {get, post} from '../../util/rest'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {remove} from "../../util/rest";

function Schedule({forceRecreateKey, setForceRecreateKey}) {
  const { usernamesString } = useParams();
  const [users, setUsers] = useState([])
  const [usernameToAdd, setUsernameToAdd] = useState("")

  const [loadingUserCalendarEvents, setLoadingUserCalendarEvents] = useState(false)
  const [currentlyCalendarProcessingUser, setCurrentlyCalendarProcessingUser] = useState()
  const [exposedCalendarApi, setExposedCalendarApi] = useState()
  const [areCustomEventsLoaded, setAreCustomEventsLoaded] = useState(false)
  const [areIcsEventsLoaded, setAreIcsEventsLoaded] = useState(false)
  const [usersEvents, setUsersEvents] = useState({})
  const [navigatedNextOrPrev, setNavigatedNextOrPrev] = useState(0)
  const [mergedCustomEvents, setMergedCustomEvents] = useState([])

  useEffect(() => {
    if (forceRecreateKey !== usernamesString) {
      setForceRecreateKey(usernamesString)
      return
    }

    const newUsers = []
    let usernames = usernamesString?.split('-')

    get(`user/profile`, result => {
      if (result?.data?.username) {
        newUsers.push(result.data)
        if (!usernames?.length) {
          setUsers(newUsers)
          return
        }

        usernames = Array.from(new Set(usernames)).filter(username => username !== result?.data?.username)

        let i = 0
        const loadUser = () => {
          get(`user/profile${usernames[i] ? `/${usernames[i]}` : ''}`, result => {
            if (result?.data?.username === usernames[i]) {
              newUsers.push(result.data)
            }
            if (++i < usernames.length) {
              loadUser()
            } else {
              setUsers(newUsers)
            }
          }, () => {
            if (++i >= usernames.length) {
              setUsers(newUsers)
            }
          })
        }
        loadUser()
      } else {
        window.location.pathname = '/'
      }
    })
  }, [usernamesString])

  useEffect(() => {
    if (currentlyCalendarProcessingUser && exposedCalendarApi && areIcsEventsLoaded && areCustomEventsLoaded) {
      if (navigatedNextOrPrev > 0) {
        for (let i = 0; i < navigatedNextOrPrev; i++) {
          exposedCalendarApi?.next()
        }
      } else {
        for (let i = 0; i > navigatedNextOrPrev; i--) {
          exposedCalendarApi?.prev()
        }
      }
      setTimeout(() => {
        let weekStart = exposedCalendarApi.view?.activeStart || new Date()
        let weekEnd = exposedCalendarApi.view?.activeEnd || new Date()
        const calendarWeekEvents = exposedCalendarApi.getEvents().filter(ev =>
          ev?.end?.getTime() >= weekStart.getTime() && ev?.start?.getTime() <= weekEnd.getTime())
          .map(ev => {
            if (ev?.start?.getTime() < weekStart.getTime()) {
              ev.start = weekStart
            }
            if (ev?.end?.getTime() > weekEnd.getTime()) {
              ev.end = weekEnd
            }
            return ev
          })
          .filter(ev => !ev.allDay)
        const newUsersEvents = {...usersEvents}
        newUsersEvents[currentlyCalendarProcessingUser.username] = calendarWeekEvents
        setUsersEvents(newUsersEvents)
        processNextUsersEvents(newUsersEvents, weekStart, weekEnd)
      }, 1)
    }
  }, [currentlyCalendarProcessingUser, exposedCalendarApi, areIcsEventsLoaded, areCustomEventsLoaded])

  useEffect(() => {
    processNextUsersEvents()
  }, [navigatedNextOrPrev])

  const mergeTimes = (usersEvents, weekStart, weekEnd) => {
    const indices = {}
    console.log(usersEvents)
    for (const user of users) {
      // sort events in increasing order of start times
      usersEvents[user.username] = usersEvents[user.username]?.sort((ev1, ev2) => ev1.start.getTime() - ev2.start.getTime())
      indices[user.username] = 0
    }

    // consolidate events - merge overlapping events and utilize "free blocks"
    for (const user of users) {
      if (usersEvents[user.username].length === 0) {
        continue;
      }
      let userConsolidatedEvents = []

      const userConsolidatedBusyEvents = []
      const userConsolidatedFreeEvents = []
      let currConsolidatedBusy = {ev: null}
      let currConsolidatedFree = {ev: null}
      for (let i = 0; i < usersEvents[user.username].length; i++) {
        const event = usersEvents[user.username][i]
        if (!event) {
          continue
        }
        let userConsolidatedTypeEvents
        let currConsolidatedType
        if (event.extendedProps.isFreeBlock) {
          userConsolidatedTypeEvents = userConsolidatedFreeEvents
          currConsolidatedType = currConsolidatedFree
        } else {
          userConsolidatedTypeEvents = userConsolidatedBusyEvents
          currConsolidatedType = currConsolidatedBusy
        }
        if (!currConsolidatedType.ev) {
          currConsolidatedType.ev = {end: event.end, start: event.start}
          continue
        }

        if (event.end.getTime() <= currConsolidatedType.ev.end.getTime()) {
          continue
        }

        if (event.start.getTime() <= currConsolidatedType.ev.end.getTime()) {
          currConsolidatedType.ev.end = event.end
        } else {
          userConsolidatedTypeEvents.push(currConsolidatedType.ev)
          currConsolidatedType.ev = {end: event.end, start: event.start}
        }
      }
      if (currConsolidatedFree.ev) {
        userConsolidatedFreeEvents.push(currConsolidatedFree.ev)
      }
      if (currConsolidatedBusy.ev) {
        userConsolidatedBusyEvents.push(currConsolidatedBusy.ev)
      }
      if (userConsolidatedBusyEvents.length === 0 || userConsolidatedFreeEvents.length === 0) {
        userConsolidatedEvents = userConsolidatedBusyEvents
      } else { // remove free blocks from busy blocks
        let freeEventIndex = 0
        let busyEventIndex = 0
        while (freeEventIndex < userConsolidatedFreeEvents.length && busyEventIndex < userConsolidatedBusyEvents.length) {
          const freeEvent = userConsolidatedFreeEvents[freeEventIndex]
          const busyEvent = userConsolidatedBusyEvents[busyEventIndex]
          if (freeEvent.start.getTime() >= busyEvent.end.getTime()) {
            userConsolidatedEvents.push(busyEvent)
            busyEventIndex++
          } else if (freeEvent.end.getTime() <= busyEvent.start.getTime()) {
            freeEventIndex++
          } else if (freeEvent.start.getTime() <= busyEvent.start.getTime()) {
            if (freeEvent.end.getTime() >= busyEvent.end.getTime()) {
              busyEventIndex++
            } else {
              busyEvent.start = freeEvent.end
            }
          } else if (freeEvent.start.getTime() > busyEvent.start.getTime()) {
            if (freeEvent.end.getTime() < busyEvent.end.getTime()) {
              const eventToPush = {...busyEvent}
              eventToPush.end = freeEvent.start
              userConsolidatedEvents.push(eventToPush)
              busyEvent.start = freeEvent.end
            } else {
              busyEvent.end = freeEvent.start
            }
          }
        }
        while (busyEventIndex < userConsolidatedBusyEvents.length) {
          userConsolidatedEvents.push(userConsolidatedBusyEvents[busyEventIndex++])
        }
      }
      usersEvents[user.username] = userConsolidatedEvents
    }

    let currEvent = {
      usersBusy: [],
      start: weekStart,
    }
    const mergedEvents = []
    while (currEvent.start.getTime() < weekEnd.getTime()) {
      let earliestEvent = null
      for (const user of users) {
        if (indices[user.username] >= usersEvents[user.username].length) {
          continue
        }
        const event = usersEvents[user.username][indices[user.username]]
        if (!earliestEvent || earliestEvent.start.getTime() > event.start.getTime()) {
          earliestEvent = event
          earliestEvent.username = user.username
        }
      }
      if (!earliestEvent) {
        if (currEvent.usersBusy.length === 0) {
          currEvent.end = weekEnd
          mergedEvents.push({...currEvent})
          break
        } else {
          mergedEvents.push({...currEvent})
          currEvent.start = currEvent.end
          currEvent.usersBusy = []
          continue
        }
      }

      if (currEvent.usersBusy.length === 0) {
        if (currEvent.start.getTime() < earliestEvent.start.getTime()) {
          currEvent.end = earliestEvent.start
          mergedEvents.push(currEvent)
        }
        currEvent = {usersBusy: [earliestEvent.username], start: earliestEvent.start, end: earliestEvent.end}
        indices[earliestEvent.username]++
      } else {
        if (earliestEvent.toRemove) {
          const eventToPush = {...currEvent}
          eventToPush.end = earliestEvent.start
          eventToPush.usersBusy = [...eventToPush.usersBusy]
          mergedEvents.push(eventToPush)

          const toRemoveIndex = currEvent.usersBusy.indexOf(earliestEvent.username)
          currEvent.usersBusy = currEvent.usersBusy.slice(0, toRemoveIndex)
            .concat(currEvent.usersBusy.slice(toRemoveIndex + 1, currEvent.usersBusy.length))
          currEvent.start = earliestEvent.end
          indices[earliestEvent.username]++
        } else if (earliestEvent.start.getTime() >= currEvent.end.getTime()) {
          mergedEvents.push(currEvent)
          currEvent = {usersBusy: [], start: currEvent.end}
        } else {
          if (earliestEvent.start.getTime() > currEvent.start.getTime()) {
            const eventToPush = {...currEvent}
            eventToPush.end = earliestEvent.start
            eventToPush.usersBusy = [...eventToPush.usersBusy]
            mergedEvents.push(eventToPush)
          }

          currEvent.start = earliestEvent.start
          currEvent.usersBusy.push(earliestEvent.username)
          if (earliestEvent.end.getTime() < currEvent.end.getTime()) {
            earliestEvent.start = earliestEvent.end
            earliestEvent.toRemove = true
          } else if (earliestEvent.end.getTime() === currEvent.end.getTime()) {
            indices[earliestEvent.username]++
          } else {
            earliestEvent.start = currEvent.end
          }
        }
      }
    }
    return mergedEvents
  }

  const createMergedSchedule = mergedEvents => {
    setMergedCustomEvents(mergedEvents.map(event => {
      const percentageBusy = event.usersBusy.length / users.length
      return {
        id: Math.random(),
        title: `${users.length - event.usersBusy.length}/${users.length} available`,
        startDate: event.start,
        endDate: event.end,
        customColor: `rgb(${255 * percentageBusy}, ${128 * (1 - percentageBusy)}, 0)`,
        tooltip: `${event.usersBusy.length < users.length ? `Available (${users.length - event.usersBusy.length}): ${users
          .filter(user => event.usersBusy.indexOf(user.username) < 0).map(user => user.username).join(', ')}<br>` : ''}${
          event.usersBusy.length > 0 ? `Unavailable (${event.usersBusy.length}): ${event.usersBusy.join(', ')}` : ''}`,
    }}))
  }

  const processNextUsersEvents = (usersEvents, weekStart, weekEnd) => {
    setLoadingUserCalendarEvents(true)
    let nextUserToProcessIndex = users.findIndex(user => user?.username === currentlyCalendarProcessingUser?.username) + 1
    setCurrentlyCalendarProcessingUser(null)
    setExposedCalendarApi(null)
    setAreCustomEventsLoaded(false)
    setAreIcsEventsLoaded(false)
    setTimeout(() => {
      if (nextUserToProcessIndex >= users.length) {
        if (usersEvents && Object.keys(usersEvents).length) {
          createMergedSchedule(mergeTimes(usersEvents, weekStart, weekEnd))
        }
        setLoadingUserCalendarEvents(false)
        setUsersEvents({})
      } else {
        setCurrentlyCalendarProcessingUser(users[nextUserToProcessIndex])
      }
    }, 1)
  }

  return (
    <div id="schedule" className="wrapper">
      <h1>Meeting scheduler</h1>
      <Container className="row">
        <Card className="mb-3 border-light">
          <div className="row g-0">
            <Table striped bordered hover>
              <tbody>
              {users.map(({ username, profile_photo, first_name, last_name, email }) => (
                <tr key={username}>
                  <td align="center" width="110px">
                    <img height={100} width={100} src={ profile_photo } className="img-fluid rounded-start" />
                  </td>
                  <td width="40px" align="center" style={{verticalAlign: "middle"}}>
                    {username !== users[0]?.username ? <FontAwesomeIcon
                      icon={faTrash}
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.pathname = window.location.pathname.replace(
                          new RegExp(`/schedule/(.+?)?(${username}-|-${username}|${username})`),
                          "/schedule/$1"
                        )
                      }}
                    /> : null}
                  </td>
                  <td style={{verticalAlign: "middle"}}>
                    { first_name } { last_name } ({email})
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
            <div style={{display: "flex", alignItems: "center", marginBottom: "16px"}}>
              Add a person:
              <Form.Control
                type="text"
                placeholder="username"
                onChange={e => setUsernameToAdd(e.target.value)}
                style={{margin: "0 16px", width: "200px"}}
              />
              <Button
                variant="primary"
                onClick={() => {
                  get(`user/profile/${usernameToAdd}`, result => {
                    if (result?.data?.username === usernameToAdd) {
                      const matched = window.location.pathname.match(/\/schedule\/(.+?)/)
                      if (!matched || matched[1] === '/') {
                        window.location.pathname = window.location.pathname
                          .replace(/\/schedule/, `/schedule/${usernameToAdd}`)
                      } else {
                        window.location.pathname = window.location.pathname
                          .replace(/\/schedule\//, `/schedule/${usernameToAdd}-`)
                      }
                    } else {
                      alert("No such user!")
                    }
                  })
              }}>Submit</Button>
              <Button style={{marginLeft: "auto"}} variant="primary" onClick={processNextUsersEvents}>Find times</Button>
            </div>
          </div>
        </Card>
      </Container>
      <div style={{display: "none"}}>
        {currentlyCalendarProcessingUser && <Calendar
          isPreview={true}
          user={currentlyCalendarProcessingUser}
          setExposedCalendarApi={setExposedCalendarApi}
          setAreCustomEventsLoaded={setAreCustomEventsLoaded}
          setAreIcsEventsLoaded={setAreIcsEventsLoaded}
        />}
      </div>
      {!!mergedCustomEvents?.length && <Calendar
        isPreview={true}
        mergedCustomEvents={mergedCustomEvents}
        usersToScheduleWith={users.map(user => user.username)}
        setNavigatedNextOrPrev={setNavigatedNextOrPrev}
        navigatedNextOrPrev={navigatedNextOrPrev}
      />}
      <div className="full-screen-overlay" style={{display: loadingUserCalendarEvents ? "block" : "none"}}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default Schedule
