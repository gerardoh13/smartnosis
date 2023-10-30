import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function IntakeSentToast({ show, setShow, recipient, setRecipient }) {
  const dismiss = () => {
    setShow(false);
    setRecipient({ name: "", sentTo: "" });
  };
  return (
    <ToastContainer
      className="p-3 mt-5"
      position="top-end"
      style={{ zIndex: 1 }}
    >
      <Toast onClose={dismiss} show={show} delay={4000} autohide>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Smartnosis</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>
          Intake was sent to {recipient.name}
          <br />@ {recipient.sentTo}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default IntakeSentToast;
