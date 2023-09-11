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
      <p className="text-center">
        <span className="text-danger">*</span>{" "}
        <span>Indicates required field</span>
      </p>
      {/* insRelationship */}
      <div className="row mb-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Relationship to Policy Holder:{" "}
            <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("insRelationship", val)}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="dropdown-basic"
            >
              {data.insRelationship ? data.insRelationship : "Select"}
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
      {/* insFirstName */}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="insFirstName"
          name="insFirstName"
          placeholder="First Name"
          value={data.insFirstName}
          disabled={data.insRelationship === "Self"}
          onChange={(e) => handleChange(e, true)}
          required
        />
        <label htmlFor="insFirstName">
          First Name of Policy Holder: <span className="text-danger">*</span>
        </label>
      </div>
      {/* insLastName */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="insLastName"
          name="insLastName"
          placeholder="Last Name"
          value={data.insLastName}
          disabled={data.insRelationship === "Self"}
          onChange={(e) => handleChange(e, true)}
          required
        />
        <label htmlFor="lastName">
          Last Name of Policy Holder: <span className="text-danger">*</span>
        </label>
      </div>
      {/* insDob */}
      <div className="row">
        <div className="col-6">
          <p className="text-start ms-1 mt-1">
            Birthdate of Policy Holder: <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col-6">
          <input
            className="form-control"
            type="date"
            name="insDob"
            id="insDob"
            max={maxDate}
            value={data.insDob}
            onChange={(e) => handleChange(e, true)}
            disabled={data.insRelationship === "Self"}
            required
          />
        </div>
      </div>
      {/* insProvider */}
      <div className="row my-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Insurance Provider: <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("insProvider", val)}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="dropdown-basic"
            >
              {data.insProvider ? data.insProvider : "Select Provider"}
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
      {/* insOtherInsProvider */}
      {data.insProvider === "Other" ? (
        <>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="insOtherInsProvider"
              name="insOtherInsProvider"
              placeholder="Insurance ID"
              required={data.insProvider === "Other"}
              value={data.insOtherInsProvider}
              onChange={(e) => handleChange(e, true)}
            />
            <label htmlFor="insOtherInsProvider">
              Insurance Provider: <span className="text-danger">*</span>
            </label>
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
      {/* insGroupNamee */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="insGroupName"
          name="insGroupName"
          placeholder="Group Name"
          value={data.insGroupName}
          onChange={(e) => handleChange(e, true)}
        />
        <label htmlFor="insGroupName">Group Name:</label>
      </div>
      {/* insGroupNumber */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="insGroupNumber"
          name="insGroupNumber"
          placeholder="Group Number"
          value={data.insGroupNumber}
          onChange={(e) => handleChange(e, true)}
        />
        <label htmlFor="insGroupNumber">Group Number:</label>
      </div>
      <input type="file" />
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
