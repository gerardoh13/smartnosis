import React from "react";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Dropdown from "react-bootstrap/Dropdown";

function PbStepFive({
  data,
  handleChange,
  handleSelect,
  changeStep,
  maxDate,
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
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.ringingStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col-6">
                <input
                  className="form-control"
                  type="date"
                  name="ringingStart"
                  id="ringingStart"
                  max={maxDate}
                  value={data.ringingStart}
                  onChange={handleChange}
                  required
                />
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
            {/* Ringing */}
            <YesNoRadio
              title={intakeQs.ringing[language]}
              handleChange={handleChange}
              name="ringing"
              status={data.ringing}
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
            {/* Hissing */}
            <YesNoRadio
              title={intakeQs.hissing[language]}
              handleChange={handleChange}
              name="hissing"
              status={data.hissing}
              language={language}
            />
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
