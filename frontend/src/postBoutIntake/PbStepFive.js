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
        <img
          src="Hearing.png"
          className="rounded mx-auto d-block w60 my-2"
          alt="Hearing"
        />
        <p className="text-center">
          <b>{headers.pgFive[language]}</b>
        </p>
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
            {/* Ringing Both Ears */}
            <YesNoRadio
              title={intakeQs.ringingBothEars[language]}
              handleChange={handleChange}
              name="ringingBothEars"
              status={data.ringingBothEars}
              language={language}
            />
            {data.ringingBothEars === "No" ? (
              <YesNoRadio
                title={intakeQs.leftRightEar[language]}
                handleChange={handleChange}
                name="leftRightEar"
                status={data.leftRightEar}
                language={language}
                negative={{
                  english: "Right only",
                  spanish: "Solo derecho",
                }}
                positive={{
                  english: "Left only",
                  spanish: "Solo izquierdo",
                }}
              />
            ) : null}
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
