import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function StepOne({
  data,
  handleChange,
  changeStep,
  maxDate,
  handlePhones,
  handleKeydown,
  handleSelect,
  complete,
  intakeQs,
  intakeOptions,
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete() && data.insurance === "No") changeStep(1);
    else if (complete() && data.insurance === "Yes") changeStep(0.5);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>
        <span>{intakeQs.required[language] + ":"}</span>
      </p>
      {/* firstName */}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="firstName">
          {intakeQs.firstName[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* middleName */}
      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="middleName"
          name="middleName"
          placeholder="First Name"
          value={data.middleName}
          onChange={handleChange}
        />
        <label htmlFor="middleName">
          {intakeQs.middleName[language] + ":"}
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
          value={data.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">
          {intakeQs.lastName[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* Dob */}
      <div className="row mb-3">
        <div className="col-6">
          <p className="text-start ms-1 mt-1">
            {intakeQs.dob[language] + ":"}
            <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col-6">
          <input
            className="form-control"
            type="date"
            name="dob"
            id="dob"
            max={maxDate}
            value={data.dob}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      {/* Sex */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.sex[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("sex", val, "formData")}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="sex-dropdown"
            >
              {intakeOptions.sex.find(
                (option) => option.english === data.sex
              )?.[language] || intakeQs.select[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.sex.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* Sexual Orientation */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.sexOrientation[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown
            onSelect={(val) => handleSelect("sexOrientation", val, "formData")}
          >
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="sexOrientation-dropdown"
            >
              {intakeOptions.sexOrientation.find(
                (option) => option.english === data.sexOrientation
              )?.[language] || intakeQs.select[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.sexOrientation.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* Ethnicity */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.ethnicity[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown
            onSelect={(val) => handleSelect("ethnicity", val, "formData")}
          >
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="ethnicity-dropdown"
            >
              {intakeOptions.ethnicity.find(
                (option) => option.english === data.ethnicity
              )?.[language] || intakeQs.select[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.ethnicity.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* Email */}
      <div className="form-floating my-3">
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          placeholder="email"
          onChange={handleChange}
          value={data.email}
          required
        />
        <label htmlFor="email">
          {intakeQs.email[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* Phone1 */}
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
          value={data.phone}
          required
        />
        <label htmlFor="phone">
          {intakeQs.phone1[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* Phone2 */}
      <div className="form-floating my-3">
        <input
          className="form-control"
          type="tel"
          maxLength={12}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="phone2"
          id="phone2"
          onChange={handlePhones}
          onKeyDown={handleKeydown}
          value={data.phone2}
          placeholder="phone"
        />
        <label htmlFor="phone2">{intakeQs.phone2[language] + ":"}</label>
      </div>
      {/* Address1 */}
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="address1"
          name="address1"
          placeholder="Address 1"
          value={data.address1}
          onChange={handleChange}
          required
        />
        <label htmlFor="address1">
          {intakeQs.address1[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* Address2 */}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="address2"
          name="address2"
          placeholder="Address 2"
          value={data.address2}
          onChange={handleChange}
        />
        <label htmlFor="address2">{intakeQs.address2[language] + ":"}</label>
      </div>
      {/* City */}
      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          required
        />
        <label htmlFor="city">
          {intakeQs.city[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* State */}
      <div className="row mb-3">
        <div className="form-floating mt-3 col">
          <input
            type="text"
            className="form-control"
            id="state"
            name="state"
            maxLength={2}
            placeholder="State"
            value={data.state}
            onChange={handleChange}
            required
          />
          <label className="ms-2" htmlFor="state">
            {intakeQs.state[language] + ":"}
            <span className="text-danger">*</span>
          </label>
        </div>
        {/* Zip */}
        <div className="form-floating mt-3 col">
          <input
            type="tel"
            className="form-control"
            id="zip"
            name="zip"
            placeholder="Zip Code"
            maxLength={5}
            minLength={5}
            value={data.zip}
            onChange={handleChange}
            required
          />
          <label className="ms-2" htmlFor="zip">
            {intakeQs.zip[language] + ":"}
            <span className="text-danger">*</span>
          </label>
        </div>
      </div>
      {/* Insurance */}
      <div className="row mb-2">
        <div className="col-6">
          <p className="text-start ms-1">
            {intakeQs.insurance[language] + ":"}
            <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col-6 text-center">
          <input
            type="radio"
            className="btn-check"
            name="insurance"
            id="yes-insurance"
            autoComplete="off"
            onChange={handleChange}
            checked={data.insurance === "Yes"}
            value="Yes"
            required
          />
          <label
            className="btn btn-outline-secondary me-2"
            htmlFor="yes-insurance"
          >
            Yes
          </label>
          <input
            type="radio"
            className="btn-check"
            name="insurance"
            id="no-insurance"
            autoComplete="off"
            onChange={handleChange}
            checked={data.insurance === "No"}
            value="No"
          />
          <label className="btn btn-outline-secondary" htmlFor="no-insurance">
            No
          </label>
        </div>
      </div>
      <button className="btn btn-success mt-3 form-control">Next</button>
    </form>
  );
}

export default StepOne;
