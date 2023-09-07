import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import ProviderContext from "../common/ProviderContext";
// import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import QrCodeModal from "../common/QrCodeModal";

function Navigation({ logout }) {
  const [showQrModal, setShowQrModal] = useState(false);

  const { currProvider } = useContext(ProviderContext);

  const loggedIn = (
    <>
      {currProvider ? (
        <>
          <QrCodeModal
            show={showQrModal}
            setShow={setShowQrModal}
            providerId={currProvider.id}
          />
          <Nav.Link
            to={`/intake?provider=${currProvider.id}`}
            eventKey={1}
            as={NavLink}
          >
            Intake Form
          </Nav.Link>
          <button className="nav-link" onClick={() => setShowQrModal(true)}>
            QR Code
          </button>
          {/* <Nav.Link to="/profile" eventKey={3} as={NavLink}>
              {currChild.firstName}
            </Nav.Link> */}
        </>
      ) : null}
    </>
  );

  return (
    <Navbar collapseOnSelect expand="md" variant="dark">
      <Nav.Link to="/" eventKey={6} as={Link} className="navbar-brand ms-2">
        Smartnosis
      </Nav.Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto" activeKey="/">
          {currProvider ? loggedIn : null}
        </Nav>
        <Nav>
          {currProvider ? (
            <Nav.Link
              to="/"
              onClick={logout}
              eventKey={6}
              as={NavLink}
              className="me-4"
            >
              Logout
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
