import React, { useState } from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UploadIcs from './UploadIcs'
import { remove } from '../../util/rest'
import Calendar from './Calendar'
import ImportGCalModal from "./ImportGCalModal";

function GCalsManagementModal({
  show, setShow
}) {
  const [showImportGCalModal, setShowImportGCalModal] = useState(false)
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Google Calendars Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Imported Google Calendars:
          <Table striped bordered hover>
            <tbody>
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => setShowImportGCalModal(true)}>
            Import new calendar
          </Button>
        </Modal.Body>
      </Modal>
      { showImportGCalModal && <ImportGCalModal setShow={setShowImportGCalModal} show={showImportGCalModal}/> }
    </>
  )
}

export default GCalsManagementModal
