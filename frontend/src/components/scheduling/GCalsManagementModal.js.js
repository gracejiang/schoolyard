import React, {useEffect, useState} from 'react'
import {Button, Modal, Table} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UploadIcs from './UploadIcs'
import {get, remove} from '../../util/rest'
import Calendar from './Calendar'
import ImportGCalModal from "./ImportGCalModal";
import AddEventModal from "./AddEventModal";

function GCalsManagementModal({
  show, setShow, customEvents, setCustomEvents, parseCustomEventPayload
}) {
  const [showImportGCalModal, setShowImportGCalModal] = useState(false)
  const [gcals, setGCals] = useState([])

  useEffect(() => {
    if (show) {
      get('calendar/gcals', result => {
        if (result?.data?.length) {
          setGCals(result.data)
        }
      })
    }
  }, [show])

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
            {gcals.map(({ gcalId, gcalName }) => (
              <tr key={gcalId}>
                <td width="40px" align="center">
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      remove(`calendar/gcal/${encodeURIComponent(gcalId)}`, null, () => {
                        setGCals(gcals.filter(gcal => gcal.gcalId !== gcalId))
                        setCustomEvents(customEvents.filter(customEvent => customEvent.gcalId !== gcalId))
                      })
                    }}
                  />
                </td>
                <td>
                  {gcalName}
                </td>
              </tr>
            ))}
            </tbody>
          </Table>
          <Button variant="primary" onClick={() => setShowImportGCalModal(true)}>
            Import new calendar
          </Button>
        </Modal.Body>
      </Modal>
      { showImportGCalModal &&
        <ImportGCalModal
          setShow={setShowImportGCalModal}
          show={showImportGCalModal}
          customEvents={customEvents}
          setCustomEvents={setCustomEvents}
          parseCustomEventPayload={parseCustomEventPayload}
          gcals={gcals}
          setGCals={setGCals}
        /> }
    </>
  )
}

export default GCalsManagementModal
