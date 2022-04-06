import "../styles/App.scss";
import * as colors from "../styles/colors.module.scss";
import React from "react";
import Header from "../components/Header";
import Profile from "./Profile";
import { Button, Container, Col, Card } from "react-bootstrap";
import undrawPeople from "../images/undraw_people.svg";

function Dashboard() {
  return (
    <>
      <Header />
      <Container
        fluid
        className="row gy-3"
        style={{
          padding: "4em",
          backgroundColor: colors.offWhite,
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <div className="col-md-3">
          <a href="profile">
            <div className="dashboard-button">Profile</div>
          </a>
          <a href="profilelist">
            <div className="dashboard-button">Profile List</div>
          </a>
          <a href="grouplist">
            <div className="dashboard-button">Groups</div>
          </a>
          <a href="classes">
            <div className="dashboard-button">Classes</div>
          </a>
          <a href="http://127.0.0.1:8000/">
            <div className="dashboard-button">Exchange Marketplace</div>
          </a>
        </div>
        <div
          className="col-md-9 login-page-register"
          style={{ borderRadius: "5px", padding: "2em", overflow: "hidden" }}
        >
          <h5 style={{ color: "white", fontWeight: "700" }}>
            Welcome to Schoolyard!
          </h5>
          <h6 style={{ color: "white", fontWeight: "400" }}>
            We connect and improve the lives of students by addressing unmet
            needs in university life.
          </h6>
          <h6 style={{ color: "white", fontWeight: "400" }}>
            Explore the sidebar to see what you can do.
          </h6>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            <img src={undrawPeople} height="400px" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Dashboard;
