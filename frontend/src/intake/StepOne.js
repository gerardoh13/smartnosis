import React from "react";

function StepOne({
  data,
  handleChange,
  changeStep,
  maxDate,
  handlePhones,
  handleKeydown,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
    // if (data.firstName && data.lastName && data.dob && data.weight && data.feet) changeStep(1);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      {/* firstname */}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="firstName">First Name</label>
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
          //   required
        />
        <label htmlFor="middleName">Middle Name</label>
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
          //   required
        />
        <label htmlFor="lastName">Last Name</label>
      </div>
      {/* Dob */}
      <div className="row">
        <div className="col-6">
          <p className="text-start ms-1 mt-1">Date of Birth</p>
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
            // required
          />
        </div>
        {/* Sex */}
      </div>

      <div className="mt-3">
        <span className="text-start ms-1 me-3">Sex:</span>
        <div className="text-center">
          <input
            type="radio"
            className="btn-check ms-3"
            name="sex"
            id="male"
            autoComplete="off"
            onChange={handleChange}
            value="male"
            // required
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="male">
            Male
          </label>
          <input
            type="radio"
            className="btn-check"
            name="sex"
            id="female"
            autoComplete="off"
            onChange={handleChange}
            value="female"
            // required
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="female">
            Female
          </label>
          <input
            type="radio"
            className="btn-check"
            name="sex"
            id="other"
            autoComplete="off"
            onChange={handleChange}
            value="other"
            // required
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="other">
            Other
          </label>
        </div>
      </div>

      <div className="my-3">
        <span>Phone</span>
        <input
          className="form-control"
          type="tel"
          maxLength={12}
          pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
          name="phone"
          onChange={handlePhones}
          onKeyDown={handleKeydown}
          value={data.phone}
          // required
        />
      </div>

      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="address1"
          name="address1"
          placeholder="Address 1"
          value={data.address1}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="address1">Address 1</label>
      </div>

      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="address2"
          name="address2"
          placeholder="Address 2"
          value={data.address2}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="address2">Address 2</label>
      </div>

      <div className="form-floating mt-3">
        <input
          type="text"
          className="form-control"
          id="city"
          name="city"
          placeholder="City"
          value={data.city}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="city">City</label>
      </div>

      <div className="row mb-3">
      <div className="form-floating mt-3 col">
        <input
          type="text"
          className="form-control"
          id="state"
          name="state"
          placeholder="State"
          value={data.state}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="state">State</label>
      </div>
      <div className="form-floating mt-3 col">
        <input
          type="number"
          className="form-control"
          id="zip"
          name="zip"
          placeholder="Zip Code"
          value={data.zip}
          onChange={handleChange}
          //   required
        />
        <label htmlFor="zip">Zip Code</label>
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

      <div className="row mb-2">
        <div className="col-6">
          <p className="text-start ms-1">Do you have insurance?</p>
        </div>
        <div className="col-6 text-center">
          <input
            type="radio"
            className="btn-check"
            name="insurance"
            id="yes-insurance"
            autoComplete="off"
            onChange={handleChange}
            value="Yes"
            // required
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
