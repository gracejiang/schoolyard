import '../styles/App.css'
import {
  Button, Container, Col, Card,
} from 'react-bootstrap'
import React from 'react'
import Calendar from './scheduling/Calendar.js'
import 'bootstrap/dist/css/bootstrap.min.css'

function Profile() {
  return (
    <div id="profile" className="wrapper">
      <Container className="row">
        <Card className="mb-3 border-light">
          <div className="row g-0">
            <div className="col-md-4">
              <img src="https://i.scdn.co/image/ab67616d0000b2733555342d852cf4e8bd20933f" className="img-fluid rounded-start" />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h1 className="card-title">Carol Li</h1>
                <h4 className="card-text">
                  <b>SEAS '22</b>
                  {' '}
                  | Computer and Information Science
                </h4>
                <br />
                <h5 className="text-muted">this is my bio : )</h5>
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

export default Profile
