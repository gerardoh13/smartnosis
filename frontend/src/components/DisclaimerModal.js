import React from "react";
import Modal from "react-bootstrap/Modal";

function DisclaimerModal({ show, setAgreeDisclaimer }) {
  return (
    <Modal show={show} centered size="lg">
      <Modal.Header>
        <Modal.Title>Disclaimer </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="overflow-auto border" style={{ height: "200px" }}>
          <p>
            This website collects and processes medical data for the purpose of
            facilitating the completion of online intake forms. By providing
            your medical information on this platform, you acknowledge and agree
            to the following:
          </p>
          <ul>
            <li>
              Data Collection: We will collect and store the information you
              provide in the intake form. This may include personal and
              sensitive health-related data.
            </li>
            <li>
              Data Processing: Your data will be processed for the specific
              purpose of completing the online intake form and facilitating the
              requested services. We adhere to industry-standard security
              measures to protect your information.
            </li>
            <li>
              Confidentiality: We prioritize the confidentiality and security of
              your medical data. Access to your information is restricted to
              authorized personnel involved in providing the requested services.
            </li>
            <li>
              Legal Compliance: This platform complies with applicable data
              protection and privacy laws. Your data will not be shared with
              third parties unless required by law or with your explicit
              consent.
            </li>
            <li>
              User Responsibility: You are responsible for providing accurate
              and up-to-date information in the intake form. Inaccurate or
              incomplete information may affect the quality of the services
              provided.
            </li>
            <li>
              Minors: This platform is intended for use by individuals who are
              of legal age to provide their own medical information. If you are
              a minor, parental consent may be required.
            </li>
            <li>
              Contact: For questions or concerns regarding the collection and
              processing of your medical data, please contact Smartnosis, LLC.
            </li>
          </ul>
          <p>
            Please consult with a legal professional to ensure that you fully
            understand your rights and obligations when using this website.
          </p>
        </div>
        <div className="text-center mt-3">
          <button className="btn btn-danger me-3">Decline</button>
          <button
            className="btn btn-success ms-3"
            onClick={() => setAgreeDisclaimer(true)}
          >
            Agree
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default DisclaimerModal;
