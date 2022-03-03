import '../../styles/App.css'
import {
  Button, Container, Col, Card, Table,
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

  useEffect(() => {
    if (forceRecreateKey !== usernamesString) {
      setForceRecreateKey(usernamesString)
      return
    }

    const newUsers = []
    const usernames = usernamesString?.split('-')

    get(`user/profile`, result => {
      if (result?.data?.username) {
        newUsers.push(result.data)
        if (!usernames?.length) {
          setUsers(newUsers)
          return
        }

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
          })
        }
        loadUser()
      } else {
        window.location.pathname = '/'
      }
    })
    if (!usernamesString) {
      return
    }
    for (const username of usernames) {

    }
  }, [usernamesString])

  return (
    <div id="profile" className="wrapper">
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
                  <td width="40px" align="center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.pathname = window.location.pathname.replace(new RegExp(`(-${username}|${username})`), "")
                      }}
                    />
                  </td>
                  <td>
                    { first_name } { last_name } {email}
                  </td>
                </tr>
              ))}
              </tbody>
            </Table>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default Schedule
