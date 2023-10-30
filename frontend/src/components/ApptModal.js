import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import UndoIcon from "@mui/icons-material/Undo";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import SmartnosisApi from "../api";
import { validatePhone } from "../intake/commonFuncs";

function ApptModal({ show, clearModal, appt, provider }) {
  const INITIAL_STATE = {
    apptId: "",
    providerId: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apptAt: "",
  };
  const [editing, setEditing] = useState(false);
  const [newDateTime, setNewDateTime] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    setFormData({
      apptId: appt.id,
      providerId: provider.id,
      firstName: appt.firstName,
      lastName: appt.lastName,
      email: appt.email || "",
      phone: appt.phone || "",
      apptAt: new Date(appt.apptAt * 1000)
        .toLocaleString("sv")
        .replace(" ", "T")
        .slice(0, -3),
    });
  }, [appt.apptAt, show]);

  const submit = async (type) => {
    let data = { ...formData };
    data.provider = { id: provider.id, name: provider.name };
    data.apptAt = new Date(data.apptAt).getTime() / 1000;
    let newAppt;
    if (type === "email") {
      data.email = data.email.toLowerCase();
      newAppt = await SmartnosisApi.emailAppt(data);
    } else if (type === "sms") {
      delete data.email;
      data.phone = validatePhone(data.phone);
      if (data.phone) newAppt = await SmartnosisApi.textAppt(data);
      else console.log("invalid number");
    }
    if (newAppt.id) {
      setFormData(INITIAL_STATE);
    }
  };

  const dismiss = () => {
    setEditing(false);
    clearModal();
  };

  const handleKeydown = (e) => {
    let value = formData[e.target.name];
    if (e.keyCode !== 8) return;
    if (value[value.length - 1] !== "-") return;
    value = e.target.value.slice(0, -1);
    setFormData((data) => ({
      ...data,
      [e.target.name]: value,
    }));
  };

  const handlePhones = (e) => {
    const { value, name } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove all non-numeric characters
    // Format the value with dashes for a US phone number
    const formattedValue = sanitizedValue.replace(
      /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
      (_, p1, p2, p3) => {
        if (p1 && p2) {
          return `${p1}-${p2}-${p3}`;
        } else if (p1) {
          return `${p1}-${p2}`;
        }
        return p1;
      }
    );
    setFormData((data) => ({
      ...data,
      [name]: formattedValue,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck = name === "firstName" || name === "lastName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
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
          onClick={dismiss}
        ></button>
      </Modal.Header>
      <Modal.Body className="text-center">
        {editing ? (
          <form className="text-start">
            {/* firstName */}
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <label htmlFor="firstName">
                First Name: <span className="text-danger">*</span>
              </label>
            </div>
            <div className="form-floating my-3">
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <label htmlFor="lastName">
                Last Name: <span className="text-danger">*</span>
              </label>
            </div>
            <label htmlFor="dateTime">
                Date and Time: <span className="text-danger">*</span>
              </label>
            <input
              className="form-control"
              id="dateTime"
              type="datetime-local"
              value={formData.apptAt}
              onChange={handleChange}
              />
            <div className="my-3 row">
              <div className="col">
                <button
                  className="btn btn-success form-control"
                  onClick={() => setEditing(true)}
                >
                  Save Changes
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => setEditing(false)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </form>
        ) : (
          <>
            <div className="row">
              <div className="col-8 text-start text-nowrap">
                <p>
                  <b>Date and Time: </b>
                  {new Date(appt.apptAt * 1000).toLocaleString()}
                </p>
              </div>
              <div className="col-4">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </div>
            </div>
            {/* phone */}
            <div className="input-group my-3">
              <span className="input-group-text">
                <i className="bi bi-phone"></i>
              </span>
              <input
                className="form-control"
                type="tel"
                maxLength={12}
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                name="phone"
                placeholder="Patient's phone"
                onChange={handlePhones}
                onKeyDown={handleKeydown}
                value={formData.phone}
              />
              <button
                className="btn btn-primary input-group-text"
                type="button"
                onClick={() => submit("sms")}
              >
                Send
                <i className="bi bi-chat-left-dots-fill ms-2"></i>
              </button>
            </div>
            {/* email */}
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Patient's email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <button
                className="btn btn-primary input-group-text"
                type="button"
                onClick={() => submit("email")}
              >
                Send
                <i className="bi bi-send ms-2"></i>
              </button>
            </div>
            <button className="btn btn-danger my-3">Cancel Appointment</button>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}
export default ApptModal;
