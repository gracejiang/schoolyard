import React, { useRef } from 'react'
import { post, getServerUrl } from '../util/rest'

function UploadIcs() {
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
    }, null, {
      'Content-Type': 'multipart/form-data',
    })
  }

  return (
    <>
      <input accept=".ics" onChange={handleChange} multiple={false} ref={inputRef} type="file" hidden />
      <button onClick={() => inputRef.current.click()}>
        Custom File Input Button
      </button>
    </>
  )
}

export default UploadIcs
