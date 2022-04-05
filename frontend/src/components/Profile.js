import '../styles/App.css'
import {
  Container, Card
} from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import {useParams} from "react-router-dom";
import Calendar from './scheduling/Calendar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {get, post} from '../util/rest'

function Profile() {
  const { username } = useParams()
  const [user, setUser] = useState({})

  useEffect(() => {
    get(`user/profile${username ? `/${username}` : ''}`, result => {
      if (result?.data?.username) {
        setUser(result.data)
      } else {
        window.location.pathname = '/'
      }
    }, err => {
      if (err && err.response) {
        if (err.response.data.message) {
          alert(err.response.data.message)
        } else {
          alert(err.response.data)
        }
      }
      window.location.pathname = '/'
    })
  }, [username])

  return (
    <div id="profile" className="wrapper">

      <Container className="row">
        <Card className="mb-3 border-light">
          <div className="row g-0">
            <div className="col-md-4">
              <img src={ user.profile_photo } className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">{ user.first_name } { user.last_name }</h1>
                <h4 className="card-text">
                  <b>{ user.school_affiliation } { user.grad_year }</b>
                  {' '}
                  | { user.major }
                </h4>
                <br />
                <h5 className="text-muted">{ user.bio }</h5>
                <br />
              </div>
            </div>
          </div>
          <div className="card-footer bg-transparent border-light">
            <h5>
              <b>22</b>
              {' '}
              Following
            </h5>
          </div>
        </Card>
      </Container>
      <Container className="row">
        <div className="schedule">
          <h2 className="profile-section-text">Schedule</h2>
          { user?.username && <Calendar isPreview={!!username} user={user} setUser={setUser} />}
        </div>
      </Container>
    </div>
  )
}

export default Profile
