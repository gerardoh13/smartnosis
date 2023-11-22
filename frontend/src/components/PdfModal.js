import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Modal from "react-bootstrap/Modal";
import PDF from "./Pdf";
import Spinner from "../common/Spinner";
function PdfModal({ show, intake, dismiss }) {
  return (
    <Modal show={show} centered size="xl">
      <Modal.Header>
        <button
          className="btn-close"
          aria-label="Close"
          onClick={dismiss}
        ></button>
      </Modal.Header>
      <Modal.Body style={{ height: "85vh" }}>
        {intake ? (
          <PDFViewer width={"100%"} height={"100%"}>
            <PDF intake={intake} />
          </PDFViewer>
        ) : (
          <Spinner />
        )}
      </Modal.Body>
    </Modal>
  );
}
export default PdfModal;
