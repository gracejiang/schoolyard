import React, { useState, useEffect } from 'react'
import axios from 'axios'

const COURSES_URL =
  'https://apps.wharton.upenn.edu/reports/1443/data/?&course_dept=all&req_satisfied=all&ccp_flag=all'

export default function Classes() {
  useEffect(() => {
    axios
      .get(COURSES_URL)
      .then((res) => {
        setCourses(res.data.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }, [])

  const [courses, setCourses] = useState([])

  return (
    <div style={{ margin: '5em' }}>
      {courses.map((c) => (
        <div>
          <p>{c.course_dept + ' ' + c.course_number + ': ' + c.course_title}</p>
        </div>
      ))}
    </div>
  )
}
