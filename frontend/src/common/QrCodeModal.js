import React from "react";
import Modal from "react-bootstrap/Modal";
import { QRCodeSVG } from "qrcode.react";

function QRCode({ show, setShow, providerId }) {
  const BASE_URL =
    process.env.REACT_APP_BASE_URL ||
    // "http://" + window.location.hostname + ":3000";
    "http://10.0.0.18:3000";

  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Modal.Title>QR Code</Modal.Title>
        <button
          className="btn-close"
          aria-label="Close"
          onClick={() => setShow(false)}
        ></button>
      </Modal.Header>
      <Modal.Body className="text-center">
        <QRCodeSVG
          value={`${BASE_URL}/intake?provider=${providerId}`}
          size={250}
        />
        ;
      </Modal.Body>
    </Modal>
  );
}

export default QRCode;
