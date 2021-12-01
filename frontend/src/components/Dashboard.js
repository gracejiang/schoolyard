import "../styles/App.css";
import React from "react";

function Dashboard() {
  return (
    <div>
      <h1>Schoolyard</h1>
      <ul>
        <li><a href="upload-ics">Upload ICS</a></li>
        <li><a href="profile">Profile</a></li>
        <li><a href="register">Register</a></li>
        <li><a href="login">Login</a></li>
        <li><a href="exchange">Exchange</a></li>
        <li><a href="group">Group</a></li>
      </ul>
    </div>
  );
}

export default Dashboard;
