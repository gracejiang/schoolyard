import React, { useRef } from 'react'
import { post, getServerUrl } from '../../util/rest'
import { Button } from "react-bootstrap";

function UploadIcs({calendarApi}) {
  const inputRef = useRef()

  const handleChange = e => {
    if (!e?.target?.files?.length) {
      return
    }
    const icsFile = e.target.files[0]
    const formData = new FormData()
    formData.append('icsFile', icsFile)
    post('calendar/upload-ics', formData, res => {
      alert(`Uploaded a file with assigned ID: ${res?.data?.s3_ics_id}`)
      if (res?.data?.s3_ics_id && calendarApi) {
        calendarApi.addEventSource({
          url: getServerUrl(`calendar/ics/${res.data.s3_ics_id}?accessToken=${
            encodeURIComponent(localStorage.accessToken)}`),
          format: 'ics',
        })
      }
    }, null, {
      'Content-Type': 'multipart/form-data',
    })
  }

  return (
    <>
      <input accept=".ics" onChange={handleChange} multiple={false} ref={inputRef} type="file" hidden />
      <Button variant="primary" onClick={() => inputRef.current.click()}>
        Upload new iCal
      </Button>
    </>
  )
}

export default UploadIcs
