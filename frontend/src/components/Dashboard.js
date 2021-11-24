import '../styles/App.css'
import React from 'react'

function Dashboard() {
  return (
    <div>
      <h1>Schoolyard</h1>
      <ul>
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
          <a href='exchange'>Exchange</a>
        </li>
        <li>
          <a href='classes'>Classes</a>
        </li>
      </ul>
    </div>
  )
}

export default Dashboard
