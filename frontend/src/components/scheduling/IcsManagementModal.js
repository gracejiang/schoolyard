import React, { useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import UploadIcs from './UploadIcs'
import { remove } from '../../util/rest'
import Calendar from './Calendar'

function IcsManagementModal({
  show, setShow, icsFiles, setIcsFiles,
}) {
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const [previewIcsFiles, setPreviewIcsFiles] = useState([])
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>iCal Files Management</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          iCal files in your calendar (
          {icsFiles.length}
          /10):
          <Table striped bordered hover>
            <tbody>
              {icsFiles.map(({ icsName, s3IcsId }) => (
                <tr key={s3IcsId}>
                  <td width="40px" align="center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
              remove(`calendar/ics/${s3IcsId}`, null, () => {
                setIcsFiles(icsFiles.filter(icsFile => icsFile.s3IcsId !== s3IcsId))
              })
            }}
                    />
                  </td>
                  <td
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setPreviewIcsFiles([{ icsName, s3IcsId }])
                      setShowPreviewModal(true)
                    }}
                  >
                    {icsName}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <UploadIcs icsFiles={icsFiles} setIcsFiles={setIcsFiles} />
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={showPreviewModal} onHide={() => setShowPreviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>iCal File Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Calendar isPreview previewIcsFiles={previewIcsFiles} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default IcsManagementModal
