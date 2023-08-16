import React from "react";

function StepOne({ data, handleChange, changeStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.firstName && data.lastName && data.dob) changeStep(1);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <h4 className="my-4">Patient Intake Form</h4>
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
        <label htmlFor="firstName">First Name</label>
        <div className="invalid-feedback">Please enter your first name.</div>
      </div>
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
        <label htmlFor="lastName">Last Name</label>
      </div>
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
            // max={maxDate}
            // min={minDate}
            value={data.dob}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="row my-2">
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
      </div>
      <div className="row my-3">
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
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <p className="text-start ms-1">Do you have insurance?</p>
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
      </div>
      <button className="btn btn-success mt-3 form-control">Next</button>
    </form>
  );
}

export default StepOne;
