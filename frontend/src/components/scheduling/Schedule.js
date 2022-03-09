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

  const [currentlyCalendarProcessingUser, setCurrentlyCalendarProcessingUser] = useState()
  const [exposedCalendarApi, setExposedCalendarApi] = useState()
  const [areCustomEventsLoaded, setAreCustomEventsLoaded] = useState(false)
  const [areIcsEventsLoaded, setAreIcsEventsLoaded] = useState(false)

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
      setTimeout(() => {
        processNextUsersEvents()
        const weekStart = exposedCalendarApi.view?.activeStart || new Date()
        const weekEnd = exposedCalendarApi.view?.activeEnd || new Date()
        const calendarWeekEvents = exposedCalendarApi.getEvents().filter(ev =>
          ev?.end?.getTime() >= weekStart.getTime() && ev?.start?.getTime() <= weekEnd.getTime())
        console.log(calendarWeekEvents)
      }, 1)
    }
  }, [currentlyCalendarProcessingUser, exposedCalendarApi, areIcsEventsLoaded, areCustomEventsLoaded])

  const processNextUsersEvents = () => {
    let nextUserToProcessIndex = users.findIndex(user => user?.username === currentlyCalendarProcessingUser?.username) + 1
    setCurrentlyCalendarProcessingUser(null)
    setExposedCalendarApi(null)
    setAreCustomEventsLoaded(false)
    setAreIcsEventsLoaded(false)
    setTimeout(() => {
      if (nextUserToProcessIndex >= users.length) {

      } else {
        setCurrentlyCalendarProcessingUser(users[nextUserToProcessIndex])
      }
    }, 1)
  }

  return (
    <div id="schedule" className="wrapper">
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
    </div>
  )
}

export default Schedule
