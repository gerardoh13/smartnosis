import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";

function ScheduleForm() {
    const { currProvider } = useContext(ProviderContext);

    const INITIAL_STATE = {
        providerId: currProvider.id,
        firstName: "",
        lastName: "",
        middleName: "",
        phone: "",
      };
      const [formData, setFormData] = useState(INITIAL_STATE);

  return (
    <div className="card">
    <div className="card-body">
      <h5 className="card-title">Send Intake Form</h5>
      <div className="row my-3">
        <div className="col-4">Appointment:</div>
        <div className="col-8">
          <input type="datetime-local" className="form-control" />
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
          // value={formData.firstName}
          // onChange={handleChange}
          required
        />
        <label htmlFor="firstName">
          First Name: <span className="text-danger">*</span>
        </label>
      </div>
      {/* middleName */}
      {/* <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="middleName"
          name="middleName"
          placeholder="First Name"
          value={formData.middleName}
          onChange={handleChange}
        />
        <label htmlFor="middleName">Middle Name:</label>
      </div> */}
      {/* lastName */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          // value={formData.lastName}
          // onChange={handleChange}
          required
        />
        <label htmlFor="lastName">
          Last Name: <span className="text-danger">*</span>
        </label>
      </div>
      {/* phone */}
      {/* <div className="input-group">
        <span className="input-group-text">
          <i class="bi bi-envelope"></i>
        </span>
        <input
          type="tel"
          className="form-control"
          placeholder="Patient phone"
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          maxLength={12}
          name="phone"
          onChange={handlePhones}
          onKeyDown={handleKeydown}
        />
        <button className="btn btn-primary input-group-text">
          Send
          <i className="bi bi-chat-left-dots-fill ms-2"></i>
        </button>
      </div> */}
      {/* email */}
      <div className="input-group my-3">
        <span className="input-group-text">
          <i className="bi bi-envelope"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Patient email"
        />
        <button className="btn btn-primary input-group-text">
          Send
          <i className="bi bi-send ms-2"></i>
        </button>
      </div>
    </div>
  </div>
  )
}

export default ScheduleForm;
