import '../styles/App.css'
import {
  Button, Container, Col, Card,
} from 'react-bootstrap'
import React, { Component } from 'react'
import Calendar from './scheduling/Calendar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { get, post } from '../../util/rest'

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        school_affiiation: '',
        major: '',
        bio: '',
        profile_photo: '',
        following: [], 
        followers: [],
      }
    }
  }

  componentDidMount = () => {
    get("user/profile", result => {
      if (result?.data?.length) {
        this.setState({ user: result?.data })
      }
    })
  }

  printAllFollowers = (followers) => {
    followers = this.state.user.followers
    let gridValues = []
    if (Array.isArray(followers)) {
      followers.forEach((i, index) => {
          gridValues.push(this.listFollower(i))
      })
    } else {
        return(<p>none</p>)
    }
    return gridValues
  }

  listFollower = (follower) => {
    return (
      <div><p>{ follower.username }</p></div>
    )
  }

  followUser = () => {
    post('user/followUser', { followUser = this.state.user.username })
    // FIXME: modify for each individual user profile later
  }

  render() {
    return (
      <div id="profile" className="wrapper">
        <Container className="row">
          <Card className="mb-3 border-light">
            <div className="row g-0">
              <div className="col-md-4">
                <img src={ this.state.user.profile_photo } />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                <h1 className="card-title">{ this.state.user.first_name } { this.state.user.last_name }</h1>
                  <h4 className="card-text">
                    <b>{ this.state.user.school }</b>
                    {' '}
                    | { this.state.user.major }
                  </h4>
                  <br />
                  <h5 className="text-muted">{ this.state.user.bio }</h5>
                  <br />
                </div>
              </div>
            </div>
            <div className="card-footer bg-transparent border-light">
              <Button variant="secondary" onClick={ followUser }>Follow</Button>{' '}
              <h5>
                <b>{ this.state.user.followers.length }</b>
                {' '}
                followers
              </h5>
              { this.printAllFollowers(this.state.user.followers) }
            </div>
          </Card>
        </Container>
        <Container className="row">
          <div className="schedule">
            <h2 className="profile-section-text">Schedule</h2>
            <Calendar />
          </div>
        </Container>
        <br />
        <Container className="row">
          <div className="classes-section">
            <h2>Classes</h2>
            <div className="classes">
              <Col className="col">
                <Card>
                  <div className="card-body">
                    <h5 className="card-title">CIS 400</h5>
                    <p className="card-text">CIS 400 is the beginning of a two-course "capstone" to your undergraduate Computer Science education in which you will have the opportunity to identify, plan, design, implement, and evaluate a computing-based solution to a real-world problem.</p>
                    <a href="#" className="btn btn-dark">Course Page</a>
                  </div>
                </Card>
              </Col>
              <Col className="col">
                <Card>
                  <div className="card-body">
                    <h5 className="card-title">CIS 400</h5>
                    <p className="card-text">CIS 400 is the beginning of a two-course "capstone" to your undergraduate Computer Science education in which you will have the opportunity to identify, plan, design, implement, and evaluate a computing-based solution to a real-world problem.</p>
                    <a href="#" className="btn btn-dark">Course Page</a>
                  </div>
                </Card>
              </Col>
              <Col className="col">
                <Card>
                  <div className="card-body">
                    <h5 className="card-title">CIS 400</h5>
                    <p className="card-text">CIS 400 is the beginning of a two-course "capstone" to your undergraduate Computer Science education in which you will have the opportunity to identify, plan, design, implement, and evaluate a computing-based solution to a real-world problem.</p>
                    <a href="#" className="btn btn-dark">Course Page</a>
                  </div>
                </Card>
              </Col>
              <div className="w-100" />
            </div>
          </div>
        </Container>
        <br />
        <Container className="row">
          <div className="groups-section">
            <h2>Groups</h2>
            <div className="groups">
              <Col className="col">
                <Card>
                  <div className="card-body">
                    <h5 className="card-title">Hack4Impact</h5>
                    <p className="card-text">Hack4Impact is a 501 (c)(3) nonprofit organization founded at the University of Pennsylvania in Philadelphia, with chapters at various colleges across the United States. We collaborate with nonprofits and other socially responsible organizations to develop software that meets important social and humanitarian needs.</p>
                    <a href="#" className="btn btn-dark">Course Page</a>
                  </div>
                </Card>
              </Col>
              <Col className="col">
                <Card>
                  <div className="card-body">
                    <h5 className="card-title">Hack4Impact</h5>
                    <p className="card-text">Hack4Impact is a 501 (c)(3) nonprofit organization founded at the University of Pennsylvania in Philadelphia, with chapters at various colleges across the United States. We collaborate with nonprofits and other socially responsible organizations to develop software that meets important social and humanitarian needs.</p>
                    <a href="#" className="btn btn-dark">Course Page</a>
                  </div>
                </Card>
              </Col>
              <Col className="col">
                <Card>
                  <div className="card-body">
                    <h5 className="card-title">Hack4Impact</h5>
                    <p className="card-text">Hack4Impact is a 501 (c)(3) nonprofit organization founded at the University of Pennsylvania in Philadelphia, with chapters at various colleges across the United States. We collaborate with nonprofits and other socially responsible organizations to develop software that meets important social and humanitarian needs.</p>
                    <a href="#" className="btn btn-dark">Course Page</a>
                  </div>
                </Card>
              </Col>
              <div className="w-100" />
            </div>
          </div>
        </Container>
      </div>
    )
  }
  
}

export default Profile
