import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function StepInsurance({
  data,
  handleChange,
  changeStep,
  maxDate,
  handleSelect,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // if (complete()) changeStep(0.5);
    changeStep(0.5);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p>
        <span className="text-danger">*</span>{" "}
        <span>Indicates required field</span>
      </p>
      {/* relationship */}
      <div className="row">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Primary Insurance Policy Holder:{" "}
            <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("relationship", val)}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="dropdown-basic"
            >
              {data.relationship ? data.relationship : "Select"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Self"}>Self</Dropdown.Item>
              <Dropdown.Item eventKey={"Spouse"}>Spouse</Dropdown.Item>
              <Dropdown.Item eventKey={"Father"}>Father</Dropdown.Item>
              <Dropdown.Item eventKey={"Family"}>Family</Dropdown.Item>
              <Dropdown.Item eventKey={"Other"}>Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
          value={data.firstName}
          disabled={data.relationship === "Self"}
          onChange={(e) => handleChange(e, true)}
          required
        />
        <label htmlFor="firstName">
          First Name of Primary Insured: <span className="text-danger">*</span>
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
          disabled={data.relationship === "Self"}
          onChange={(e) => handleChange(e, true)}
          required
        />
        <label htmlFor="lastName">
          Last Name of Primary Insured: <span className="text-danger">*</span>
        </label>
      </div>
      {/* Dob */}
      <div className="row">
        <div className="col-6">
          <p className="text-start ms-1 mt-1">
            Birthdate of Primary Insured: <span className="text-danger">*</span>
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
            onChange={(e) => handleChange(e, true)}
            disabled={data.relationship === "Self"}
            required
          />
        </div>
      </div>
      {/* insProvider */}
      <div className="row mt-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Primary Insurance Policy Holder:{" "}
            <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("insProvider", val)}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="dropdown-basic"
            >
              {data.insProvider ? data.insProvider : "Insurance Provider"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Kaiser Permanente"}>
                Kaiser Permanente
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Anthem Blue Cross"}>
                Anthem Blue Cross
              </Dropdown.Item>
              <Dropdown.Item eventKey={"HealthNet"}>HealthNet</Dropdown.Item>
              <Dropdown.Item eventKey={"Blue Shield"}>
                Blue Shield
              </Dropdown.Item>
              <Dropdown.Item eventKey={"LA Care"}>LA Care</Dropdown.Item>
              <Dropdown.Item eventKey={"United HealthCare"}>
                United HealthCare
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Other"}>Other</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* otherInsProvider */}
      {data.insProvider === "Other" ? (
        <>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="otherInsProvider"
              name="otherInsProvider"
              placeholder="Insurance ID"
              value={data.otherInsProvider}
              onChange={(e) => handleChange(e, true)}
            />
            <label htmlFor="otherInsProvider">Insurance Provider:</label>
          </div>
          <hr />
        </>
      ) : null}
      {/* Insurance ID */}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="insuranceId"
          name="insuranceId"
          placeholder="Insurance ID"
          value={data.insuranceId}
          onChange={(e) => handleChange(e, true)}
        />
        <label htmlFor="insuranceId">Insurance ID#:</label>
      </div>
      {/* Group Name */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="groupName"
          name="groupName"
          placeholder="Group Name"
          value={data.groupName}
          onChange={(e) => handleChange(e, true)}
        />
        <label htmlFor="groupName">Group Name:</label>
      </div>
      {/* Group Number */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="groupNumber"
          name="groupNumber"
          placeholder="Group Number"
          value={data.groupNumber}
          onChange={(e) => handleChange(e, true)}
        />
        <label htmlFor="groupNumber">Group Number:</label>
      </div>
      <div className="row">
        <button
          className="btn btn-success mt-3 me-2 form-control col"
          onClick={() => changeStep(-0.5)}
        >
          Previous
        </button>
        <button className="btn btn-success mt-3 form-control col">Next</button>
      </div>{" "}
    </form>
  );
}

export default StepInsurance;
