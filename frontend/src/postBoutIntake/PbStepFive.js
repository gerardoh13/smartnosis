import React from "react";
import YesNoRadio from "../common/YesNoRadio";
import Dropdown from "react-bootstrap/Dropdown";

function PbStepFive({
  data,
  handleChange,
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
        <p className="text-center">{headers.pgFive[language]}</p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
        {/* Ringing Ears */}
        <YesNoRadio
          title={intakeQs.ringingEars[language]}
          handleChange={handleChange}
          name="ringingEars"
          status={data.ringingEars}
          language={language}
          negative={{
            english: "Not at all",
            spanish: "Para nada",
          }}
        />
        {data.ringingEars === "Yes" ? (
          <>
            {/* Ringing Start */}
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.ringingStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col">
                <Dropdown onSelect={(val) => handleSelect("ringingStart", val)}>
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="ringingStart-dropdown"
                  >
                    {intakeOptions.ringingStart.find(
                      (option) => option.english === data.ringingStart
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.ringingStart.map((option) => (
                      <Dropdown.Item
                        key={option.english}
                        eventKey={option.english}
                      >
                        {option[language]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* Buzzing */}
            <YesNoRadio
              title={intakeQs.buzzing[language]}
              handleChange={handleChange}
              name="buzzing"
              status={data.buzzing}
              language={language}
            />
            {/* Whistling */}
            <YesNoRadio
              title={intakeQs.whistling[language]}
              handleChange={handleChange}
              name="whistling"
              status={data.whistling}
              language={language}
            />
            {/* Ringing Constant */}
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.ringingConstant[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col">
                <Dropdown
                  onSelect={(val) => handleSelect("ringingConstant", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="ringingConstant-dropdown"
                  >
                    {intakeOptions.ringingConstant.find(
                      (option) => option.english === data.ringingConstant
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.ringingConstant.map((option) => (
                      <Dropdown.Item
                        key={option.english}
                        eventKey={option.english}
                      >
                        {option[language]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* Ringing Both Ears */}
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.ringingBothEars[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col">
                <Dropdown
                  onSelect={(val) => handleSelect("ringingBothEars", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="ringingBothEars-dropdown"
                  >
                    {intakeOptions.ringingBothEars.find(
                      (option) => option.english === data.ringingBothEars
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.ringingBothEars.map((option) => (
                      <Dropdown.Item
                        key={option.english}
                        eventKey={option.english}
                      >
                        {option[language]}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </>
        ) : null}
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

export default PbStepFive;
