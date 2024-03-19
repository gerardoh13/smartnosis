import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function PbStepFour({
  data,
  handleChange,
  handleSelect,
  changeStep,
  maxDate,
  complete,
  intakeQs,
  intakeOptions,
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
    // if (complete()) changeStep(1);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>
        <span>Indicates required field</span>
      </p>
      {/* Irritable */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.irritable[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("irritable", val)}>
            <Dropdown.Toggle
              className="form-control text-wrap"
              variant="secondary"
              id="irritable-dropdown"
            >
              {intakeOptions.irritable.find(
                (option) => option.english === data.irritable
              )?.[language] || "Select"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.irritable.map((option) => (
                <Dropdown.Item
                  key={option.english}
                  eventKey={option.english}
                  className="text-wrap"
                >
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
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
          {/* Whistling */}
          <YesNoRadio
            title={intakeQs.hissing[language]}
            handleChange={handleChange}
            name="hissing"
            status={data.hissing}
            language={language}
          />
        </>
      ) : null}
      {/* Sleeping */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
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
      {/* Noise Sensitivity */}
      <YesNoRadio
        title={intakeQs.noiseSensitivity[language]}
        handleChange={handleChange}
        name="noiseSensitivity"
        status={data.noiseSensitivity}
        language={language}
        negative={{
          english: "Not at all",
          spanish: "Para nada.",
        }}
        positive={{
          english: "Yes, I suffer from Noise sensitivity",
          spanish: "Sí, sufro de sensibilidad al ruido.",
        }}
      />
      {data.noiseSensitivity === "Yes, I suffer from Noise sensitivity" ? (
        <>
          {/* Noise Sensitivity Start */}
          <div className="row mb-3">
            <div className="col-6">
              <span className="text-start ms-1 mt-1">
                {intakeQs.noiseSensitivityStart[language] + ":"}
                <span className="text-danger">*</span>
              </span>
            </div>
            <div className="col-6">
              <input
                className="form-control"
                type="date"
                name="noiseSensitivityStart"
                id="noiseSensitivityStart"
                value={data.noiseSensitivityStart}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Noise Sensitivity Trigger */}
          <YesNoRadio
            title={intakeQs.noiseSensitivityTrigger[language]}
            handleChange={handleChange}
            name="noiseSensitivityTrigger"
            status={data.noiseSensitivityTrigger}
            language={language}
          />
          {/* Noise Sensitivity Pain */}
          <YesNoRadio
            title={intakeQs.noiseSensitivityPain[language]}
            handleChange={handleChange}
            name="noiseSensitivityPain"
            status={data.noiseSensitivityPain}
            language={language}
          />
          {/* Noise Sensitivity Dizziness */}
          <YesNoRadio
            title={intakeQs.noiseSensitivityDizziness[language]}
            handleChange={handleChange}
            name="noiseSensitivityDizziness"
            status={data.noiseSensitivityDizziness}
            language={language}
          />
          {/* Noise Sensitivity Scale */}
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-lg-0 mb-2">
              <span className="text-start ms-1 mt-1">
                {intakeQs.noiseSensitivityScale[language] + ":"}
                <span className="text-danger">*</span>
              </span>
            </div>
            <div className="col text-center">
              <Box sx={{ width: "90%", marginX: "auto", marginTop: 4 }}>
                <Slider
                  aria-label="Noise Sensitivity Scale"
                  defaultValue={1}
                  valueLabelDisplay="on"
                  step={1}
                  marks
                  min={1}
                  max={10}
                  name="noiseSensitivityScale"
                  onChange={handleChange}
                />
              </Box>
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
  );
}

export default PbStepFour;
