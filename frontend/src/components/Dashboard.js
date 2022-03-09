import '../styles/App.css'
import React from 'react'

function Dashboard() {
  return (
    <div style={{textAlign: "center", padding: "20px", fontFamily: "sans-serif"}}>
      <h1>Schoolyard</h1>
      <ul>
        <li>
          <a href='upload-ics'>Upload ICS</a>
        </li>
        <li>
          <a href='profile'>Profile</a>
        </li>
        <li>
          <a href='register'>Register</a>
        </li>
        <li>
          <a href='login'>Login</a>
        </li>
        <li>
          <a href='http://127.0.0.1:8000/'>Exchanges/Marketplace</a>
          {/* <a href='exchange'>Exchange</a> */}
        </li>
        <li>
          <a href='grouplist'>Group List</a>
        </li>
        <li>
          <a href='new-group'>Create Group</a>
        </li>
        <li>
          <a href='classes'>Classes</a>
        </li>
      </ul>
    </div>
  )
}

export default Dashboard
