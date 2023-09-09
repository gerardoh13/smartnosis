import React from "react";

function StepOne({
  data,
  handleChange,
  changeStep,
  maxDate,
  handlePhones,
  handleKeydown,
  complete,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete() && data.insurance === "No") changeStep(1);
    else if (complete() && data.insurance === "Yes") changeStep(0.5);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>{" "}
        <span>Indicates required field</span>
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
          First Name: <span className="text-danger">*</span>
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
        <label htmlFor="middleName">Middle Name:</label>
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
          Last Name: <span className="text-danger">*</span>
        </label>
      </div>
      {/* Dob */}
      <div className="row">
        <div className="col-6">
          <p className="text-start ms-1 mt-1">
            Date of Birth: <span className="text-danger">*</span>
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
      <div className="mt-3">
        <span className="text-start ms-1 me-3">
          Sex <span className="text-danger">*</span>
        </span>
        <div className="text-center">
          {/* Male */}
          <input
            type="radio"
            className="btn-check ms-3"
            name="sex"
            id="male"
            autoComplete="off"
            onChange={handleChange}
            checked={data.sex === "Male"}
            value="Male"
            required
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="male">
            Male
          </label>
          {/* Female */}
          <input
            type="radio"
            className="btn-check"
            name="sex"
            id="female"
            autoComplete="off"
            onChange={handleChange}
            checked={data.sex === "Female"}
            value="Female"
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="female">
            Female
          </label>
          {/* Other */}
          <input
            type="radio"
            className="btn-check"
            name="sex"
            id="other"
            autoComplete="off"
            onChange={handleChange}
            checked={data.sex === "Other"}
            value="Other"
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="other">
            Other
          </label>
        </div>
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
          Primary Phone: <span className="text-danger">*</span>
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
        <label htmlFor="phone2">Secondary Phone:</label>
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
          Address 1: <span className="text-danger">*</span>
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
        <label htmlFor="address2">Address 2:</label>
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
          City: <span className="text-danger">*</span>
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
            State: <span className="text-danger">*</span>
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
            Zip Code: <span className="text-danger">*</span>
          </label>
        </div>
      </div>
      {/* <div className="row my-2">
        <div className="col-6">
          <br />
          <p className="text-start ms-1">Height</p>
        </div>
        <div className="col-6">
          <div className="row">
            <div className="col pe-1">
              <span>Feet</span>
              <select
                name="feet"
                className="form-select"
                value={data.feet}
                onChange={handleChange}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
            <div className="col ps-1">
              <span>Inches</span>
              <select
                name="inches"
                className="form-select"
                value={data.inches}
                onChange={handleChange}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
              </select>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="row my-3">
        <div className="col-6">
          <p className="text-start ms-1">Weight</p>
        </div>
        <div className="col-6">
          <input
            className="form-control"
            type="number"
            name="weight"
            id="weight"
            value={data.weight}
            onChange={handleChange}
            required
          />
        </div>
      </div> */}
      {/* Insurance */}
      <div className="row mb-2">
        <div className="col-6">
          <p className="text-start ms-1">
            Do you have insurance? <span className="text-danger">*</span>
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
