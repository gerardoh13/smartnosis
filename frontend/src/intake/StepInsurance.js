import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import ImageUpload from "../common/ImageUpload";
import "./Intake.css";

function StepInsurance({
  data,
  setData,
  handleChange,
  changeStep,
  maxDate,
  handleSelect,
  complete,
  intakeQs,
  language,
}) {
  const [insFront, setInsFront] = useState("");
  const [insBack, setInsBack] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete()) changeStep(0.5);
  };

  const uploadSuccess = (error, result, setUrl, formKey) => {
    if (!error && result && result.event === "success") {
      setUrl(result.info.secure_url);
      setData((data) => ({
        ...data,
        [formKey]: result.info.public_id,
      }));
    } else console.log(error);
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>
        <span>{intakeQs.required[language] + ":"}</span>
      </p>
      {/* insRelationship */}
      <div className="row mb-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            {intakeQs.insRelationship[language] + ":"}
            <span className="text-danger">*</span>
          </p>
        </div>
        <div className="col text-center">
          <Dropdown
            onSelect={(val) =>
              handleSelect("insRelationship", val, "insurance")
            }
          >
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
              <Dropdown.Item eventKey={"Parent"}>Father</Dropdown.Item>
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
          onChange={(e) => handleChange(e, "insurance")}
          required
        />
        <label htmlFor="insFirstName">
          {intakeQs.insFirstName[language] + ":"}
          <span className="text-danger">*</span>
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
          onChange={(e) => handleChange(e, "insurance")}
          required
        />
        <label htmlFor="insLastName">
          {intakeQs.insLastName[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* insDob */}
      <div className="row">
        <div className="col-6">
          <p className="text-start ms-1 mt-1">
            {intakeQs.insDob[language] + ":"}
            <span className="text-danger">*</span>
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
            onChange={(e) => handleChange(e, "insurance")}
            disabled={data.insRelationship === "Self"}
            required
          />
        </div>
      </div>
      {/* insProvider */}
      <div className="row my-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            {intakeQs.insProvider[language] + ":"}
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
      {/* insOtherProvider */}
      {data.insProvider === "Other" ? (
        <>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="insOtherProvider"
              name="insOtherProvider"
              placeholder="Insurance ID"
              required={data.insProvider === "Other"}
              value={data.insOtherProvider}
              onChange={(e) => handleChange(e, "insurance")}
            />
            <label htmlFor="insOtherProvider">
              Insurance Provider:
              <span className="text-danger">*</span>
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
          onChange={(e) => handleChange(e, "insurance")}
        />
        <label htmlFor="insuranceId">
        {intakeQs.insuranceId[language] + ":"}
        </label>
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
          onChange={(e) => handleChange(e, "insurance")}
        />
        <label htmlFor="insGroupName">
        {intakeQs.insGroupName[language] + ":"}
        </label>
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
          onChange={(e) => handleChange(e, "insurance")}
        />
        <label htmlFor="insGroupNumber">
        {intakeQs.insGroupNumber[language] + ":"}
        </label>
      </div>
      <div>
        <hr />
        {insFront ? (
          <div className="text-center mb-3">
            <img
              className="img75"
              src={insFront}
              alt="front of insurance card"
            />
          </div>
        ) : null}
        <span className="me-3">
        {intakeQs.insPhotoFront[language] + ":"}
        </span>
        <ImageUpload
          uploadSuccess={uploadSuccess}
          setUrl={setInsFront}
          formKey="insFrontPId"
        />
      </div>
      <div className="my-3">
        <hr />
        {insBack ? (
          <div className="text-center mb-3">
            <img
              className="img75"
              src={insBack}
              alt="front of insurance card"
            />
          </div>
        ) : null}
        <span className="me-3">
        {intakeQs.insPhotoBack[language] + ":"}
        </span>
        <ImageUpload
          uploadSuccess={uploadSuccess}
          setUrl={setInsBack}
          formKey="insBackPId"
        />
      </div>
      <div className="row">
        <button
          className="btn btn-success mt-3 me-2 form-control col"
          onClick={() => changeStep(-0.5)}
        >
          Previous
        </button>
        <button className="btn btn-success mt-3 form-control col">Next</button>
      </div>
    </form>
  );
}

export default StepInsurance;
