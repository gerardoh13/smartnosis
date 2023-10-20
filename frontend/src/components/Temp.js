import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import SmartnosisApi from "../api";

function Temp() {
  const { currProvider } = useContext(ProviderContext);

  const INITIAL_STATE = {
    providerId: currProvider.id,
    firstName: "",
    lastName: "",
    email: "",
    apptAt: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const submit = async () => {
    let data = { ...formData };
    data.provider = { id: currProvider.id, name: currProvider.name };
    data.apptAt = new Date(data.apptAt).getTime() / 1000;
    let newAppt = await SmartnosisApi.addAppt(data);
    if (newAppt.id) {
      setFormData(INITIAL_STATE);
    }
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
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Smartnosis SMS Opt-in Form</h5>
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
        {/* phone */}
        <div className="input-group">
          <span className="input-group-text">
            <i class="bi bi-phone"></i>
          </span>
          <input
            type="tel"
            className="form-control"
            placeholder="Phone number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            maxLength={12}
            name="phone"
            // onChange={handlePhones}
            // onKeyDown={handleKeydown}
          />
        </div>
        <p className="mt-3">Opt-in to receiving SMS messages with a link to complete your intake form prior to your scheduled appointment</p>
        <div className="my-3">
        <input type="checkbox" />
        <span className="ms-2">
          I agree to receive transactional SMS messages from Smartnosis, LLC and
          accept the data privacy statement
        </span>
        </div>
        {/* email */}
        <button className="btn btn-primary mt-3">Submit</button>
      </div>
    </div>
  );
}

export default Temp;
