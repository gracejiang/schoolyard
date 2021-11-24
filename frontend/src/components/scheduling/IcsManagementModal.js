import React, { useRef } from 'react'
import { post } from '../../util/rest'
import { Modal, Button } from "react-bootstrap";
import UploadIcs from "./UploadIcs";

function IcsManagementModal({show, setShow, calendarApi}) {

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>iCal Files Management</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UploadIcs calendarApi={calendarApi}/>
      </Modal.Body>
    </Modal>
  )
}

export default IcsManagementModal