import "../styles/App.css";
import React from "react";
import { Button, Card, Form, Alert, Modal } from "react-bootstrap";

function Dashboard() {
  return (
    <div>
      <div className="dashboard-header">
        <h1 style={{ paddingLeft: "20px" }}>Schoolyard</h1>
        <div className="dashboard-navbar">
          <a href="register">
            <Button>Register</Button>
          </a>
          <a href="login">
            <Button>Login</Button>
          </a>
        </div>
      </div>
      <div className="dashboard-content">
        <br />
        <div className="dashboard-buttons">
          <a href="profile">
            <div className="dashboard-button">Profile</div>
          </a>
          <a href="http://127.0.0.1:8000/">
            <div className="dashboard-button">Exchanges/Marketplace</div>
          </a>
          <a href="grouplist">
            <div className="dashboard-button">Groups</div>
          </a>
          <a href="classes">
            <div className="dashboard-button">Classes</div>
          </a>
          <a href="upload-ics">
            <div className="dashboard-button">Upload ICS</div>
          </a>
          <a href="new-group">
            <div className="dashboard-button">Create Group</div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
