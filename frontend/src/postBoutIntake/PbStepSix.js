import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function PbStepSix({
  data,
  handleSelect,
  changeStep,
  complete,
  headers,
  intakeQs,
  intakeOptions,
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete()) changeStep(1);
  };

  return (
    <>
      <div>
        <img
          src="Sleep.png"
          className="rounded mx-auto d-block w-25 my-2"
          alt="Sleep"
        />
        <p className="text-center">
          <b>{headers.pgSix[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
        {/* Sleeping */}
        <div className="row mb-3">
          <div className="col">
            <span className="text-start ms-1 mt-1">
              {intakeQs.sleeping[language] + ":"}
              <span className="text-danger">*</span>
            </span>
          </div>
          <div className="col text-center">
            <Dropdown onSelect={(val) => handleSelect("sleeping", val)}>
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="sleeping-dropdown"
              >
                {intakeOptions.sleeping.find(
                  (option) => option.english === data.sleeping
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.sleeping.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <button
              className="btn btn-success form-control"
              onClick={() => changeStep(-1)}
            >
              Previous
            </button>
          </div>
          <div className="col">
            <button className="btn btn-success form-control">Next</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default PbStepSix;
