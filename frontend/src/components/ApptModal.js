import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function ApptModal({ show, clearModal, appt }) {
  const [rescheduling, setRescheduling] = useState(false);

  const dismiss = () => {
    setRescheduling(false);
    clearModal();
  };
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>
          Appointment for {appt.firstName}, {appt.lastName}
        </Modal.Title>
        <button
          className="btn-close"
          aria-label="Close"
          onClick={clearModal}
        ></button>
      </Modal.Header>
      <Modal.Body className="text-center">
        {rescheduling ? (
          <div className="row">
            <div className="col-7">
              <input type="datetime-local"/>
            </div>
            <div className="col-5">
            <button
                className="btn btn-success me-1"
                onClick={() => setRescheduling(true)}
              >
                <CheckCircleOutlineIcon/>
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setRescheduling(false)}
              >
                <UndoIcon/>
              </button>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-8">
              <p>
                <b>Date and Time: </b>
                {new Date(appt.apptAt * 1000).toLocaleString()}
              </p>
            </div>
            <div className="col-4">
              <button
                className="btn btn-danger"
                onClick={() => setRescheduling(true)}
              >
                Reschedule
              </button>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default ApptModal;
