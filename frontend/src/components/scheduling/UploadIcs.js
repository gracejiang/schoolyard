import React, { useRef } from 'react'
import { Button } from 'react-bootstrap'
import { post, getServerUrl } from '../../util/rest'

function UploadIcs({ icsFiles, setIcsFiles }) {
  const inputRef = useRef()

  const handleChange = e => {
    if (!e?.target?.files?.length) {
      return
    }
    const icsFile = e.target.files[0]
    const formData = new FormData()
    formData.append('icsFile', icsFile)
    post('calendar/upload-ics', formData, res => {
      if (res?.data?.s3_ics_id) {
        setIcsFiles([...icsFiles, { s3IcsId: res.data.s3_ics_id, icsName: res.data.ics_name }])
      }
    }, null, {
      'Content-Type': 'multipart/form-data',
    })
  }

  return (
    <>
      <input accept=".ics" onChange={handleChange} multiple={false} ref={inputRef} type="file" hidden />
      <Button disabled={icsFiles.length >= 10} variant="primary" onClick={() => inputRef.current.click()}>
        Upload new iCal
      </Button>
    </>
  )
}

export default UploadIcs
