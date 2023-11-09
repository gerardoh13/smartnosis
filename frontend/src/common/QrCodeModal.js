import React from "react";
import Modal from "react-bootstrap/Modal";
import { QRCodeSVG } from "qrcode.react";

function QRCode({ show, setShow, providerId }) {
  const BASE_URL =
    window.location.hostname === "localhost"
      ? "http://" + "10.0.0.10" + ":3000"
      : "https://" + window.location.hostname;
  // window.location.hostname === "localhost" ? "http://" + window.location.hostname + ":3000" : "https://" + window.location.hostname
  //   const BASE_URL = "https://" + window.location.hostname;

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
