import React, { useState } from "react";
import Alerts from "../common/Alerts";

function Register({ register }) {
  const INITIAL_STATE = {
    orgName: "",
    npi: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    password: "",
    confirmPwd: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmPasswords()) return;
    let formattedData = formatData();
    let response = await register(formattedData);
    if (response.success) {
      setFormData(INITIAL_STATE);
    } else {
      setErrors(response.errors);
    }
  };

  const formatData = () => {
    let formattedData = {};
    for (let key in formData) {
      if (key === "email") {
        formattedData[key] = formData[key].toLowerCase();
      } else formattedData[key] = formData[key].trimEnd();
    }
    delete formattedData.confirmPwd;
    return formattedData;
  };

  const confirmPasswords = () => {
    if (formData.password !== formData.confirmPwd) {
      setErrors(["Passwords do not match"]);
      return false;
    } else return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck = name === "firstName" || name === "lastName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value.trim(),
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

  return (
    <div className="card col-lg-4 col-md-5 col-sm-6 col-11 my-auto">
      <div className="card-body">
        <h5 className="card-title">Get started with Smartnosis</h5>
        {errors.length ? <Alerts msgs={errors} /> : null}
        <form onSubmit={handleSubmit}>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="orgName"
              id="orgName"
              value={formData.orgName}
              placeholder="orgName"
              required
              onChange={handleChange}
            />
            <label htmlFor="orgName">Organization Name:</label>
          </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="npi"
              id="npi"
              value={formData.npi}
              placeholder="npi"
              required
              onChange={handleChange}
            />
            <label htmlFor="npi">NPI:</label>
          </div>
          <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="address1"
          name="address1"
          placeholder="Address 1"
          value={formData.address1}
          onChange={handleChange}
          required
        />
        <label htmlFor="address1">Address 1:</label>
      </div>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="address2"
          name="address2"
          placeholder="Address 2"
          value={formData.address2}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="address2">Address 2:</label>
      </div>

      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <label htmlFor="city">City:</label>
      </div>

      <div className="row mb-3">
        <div className="form-floating mt-3 col">
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            required
          />
          <label className="ms-2" htmlFor="state">
            State:
          </label>
        </div>
        <div className="form-floating mt-3 col">
          <input
            type="number"
            className="form-control"
            id="zip"
            name="zip"
            placeholder="Zip Code"
            value={formData.zip}
            onChange={handleChange}
            required
          />
          <label className="ms-2" htmlFor="zip">
            Zip Code:
          </label>
        </div>
      </div>
      <div className="form-floating my-3">
        <input
          className="form-control"
          type="tel"
          maxLength={12}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="phone"
          id="phone"
          placeholder="phone"
          onChange={handlePhones}
          onKeyDown={handleKeydown}
          value={formData.phone}
          required
        />
        <label htmlFor="phone">Primary Phone:</label>
      </div>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="email"
              required
              minLength="6"
              onChange={handleChange}
            />
            <label htmlFor="email">Email:</label>
          </div>

          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              value={formData.password}
              placeholder="password"
              autoComplete="current-password"
              required
              minLength="5"
              onChange={handleChange}
            />
            <label htmlFor="password">Password:</label>
          </div>
          <div className="form-floating mb-3">
            <input
              className="form-control"
              type="password"
              name="confirmPwd"
              id="confirmPwd"
              value={formData.confirmPwd}
              placeholder="confirm password"
              autoComplete="confirm-password"
              required
              minLength="5"
              onChange={handleChange}
            />
            <label htmlFor="confirmPwd">Confirm Password:</label>
          </div>
          <button className="btn btn-primary form-control">Next</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
