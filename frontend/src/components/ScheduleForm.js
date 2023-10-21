import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import SmartnosisApi from "../api";

function ScheduleForm() {
  const { currProvider } = useContext(ProviderContext);

  const INITIAL_STATE = {
    providerId: currProvider.id,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apptAt: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [sendBy, setSendBy] = useState("email");

  const submit = async (type) => {
    let data = { ...formData };
    data.provider = { id: currProvider.id, name: currProvider.name };
    data.apptAt = new Date(data.apptAt).getTime() / 1000;
    let newAppt;
    if (type === "email") {
      delete data.phone;
      newAppt = await SmartnosisApi.emailAppt(data);
    } else if (type === "sms") {
      delete data.email;
      console.log(data.phone)
      data.phone = validatePhone(data.phone);
      if (data.phone) newAppt = await SmartnosisApi.textAppt(data);
      else console.log("invalid number");
    }
    console.log(newAppt);
    if (newAppt.id) {
      setFormData(INITIAL_STATE);
    }
  };

  const validatePhone = (phone) => {
    if (phone.lenght > 12) return;
    phone = phone.replaceAll("-", "");
    console.log(phone)
    for (let i = 0; i < phone.length; i++) {
      if (isNaN(phone[i])) return;
    }
    return phone;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck = name === "firstName" || name === "lastName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
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

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Send Intake Form</h5>
        <div className="row my-3">
          <div className="col-4">Appointment:</div>
          <div className="col-8">
            <input
              type="datetime-local"
              className="form-control"
              value={formData.apptAt}
              onChange={handleChange}
              name="apptAt"
            />
          </div>
        </div>
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

        {/* lastName */}
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
        {/* radio btns */}

        <div className="my-3 text-center">
          <input
            type="radio"
            className="btn-check method"
            name="method"
            // autoComplete="off"
            id="emailRadioBtn"
            value="email"
            checked={sendBy === "email"}
            onChange={(e) => setSendBy(e.target.value)}
          />
          <label
            className="btn btn-outline-secondary radioLabel me-2"
            htmlFor="emailRadioBtn"
          >
            Email
          </label>

          <input
            type="radio"
            className="btn-check method"
            name="method"
            id="smsRadioBtn"
            value="sms"
            checked={sendBy === "sms"}
            onChange={(e) => setSendBy(e.target.value)}
          />
          <label
            className="btn btn-outline-secondary radioLabel"
            htmlFor="smsRadioBtn"
          >
            SMS
          </label>
        </div>

        {/* phone */}
        <div className={`input-group ${sendBy === "email" ? "d-none" : ""}`}>
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
            onClick={() => submit("sms")}
          >
            Send
            <i className="bi bi-chat-left-dots-fill ms-2"></i>
          </button>
        </div>
        {/* email */}
        <div className={`input-group ${sendBy === "sms" ? "d-none" : ""}`}>
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
            onClick={() => submit("email")}
          >
            Send
            <i className="bi bi-send ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScheduleForm;
