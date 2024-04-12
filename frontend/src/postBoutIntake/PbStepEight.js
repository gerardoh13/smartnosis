import React from "react";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Dropdown from "react-bootstrap/Dropdown";

const marks = [
  {
    value: 1,
    label: "😐",
  },
  {
    value: 2,
    label: "🙁",
  },
  {
    value: 3,
    label: "😠",
  },
  {
    value: 4,
    label: "😬",
  },
  {
    value: 5,
    label: "😵",
  },
];

function PbStepEight({
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
          src="Vision.png"
          className="rounded mx-auto d-block w60 my-2"
          alt="Vision"
        />
        <p className="text-center">
          <b>{headers.pgEight[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
        {/* Blurred Vision */}
        <YesNoRadio
          title={intakeQs.blurredVision[language]}
          handleChange={handleChange}
          name="blurredVision"
          status={data.blurredVision}
          language={language}
          negative={{
            english: "Not at all",
            spanish: "Para nada",
          }}
        />
        {data.blurredVision === "Yes" ? (
          <>
            {/* Blurred Vision Start */}
            <div className="row mb-3">
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.blurredVisionStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col-6">
                <Dropdown
                  onSelect={(val) => handleSelect("blurredVisionStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="blurredVisionStart-dropdown"
                  >
                    {intakeOptions.daysOneToThree.find(
                      (option) => option.english === data.blurredVisionStart
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.daysOneToThree.map((option) => (
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
            {/* Blurred Vision Constant */}
            <YesNoRadio
              title={intakeQs.blurredVisionConstant[language]}
              handleChange={handleChange}
              name="blurredVisionConstant"
              status={data.blurredVisionConstant}
              language={language}
            />
            {/* Blurred Vision On and Off */}
            <YesNoRadio
              title={intakeQs.blurredVisionOnAndOff[language]}
              handleChange={handleChange}
              name="blurredVisionOnAndOff"
              status={data.blurredVisionOnAndOff}
              language={language}
            />
            {/* Blurred Vision One Eye */}
            <YesNoRadio
              title={intakeQs.blurredVisionOneEye[language]}
              handleChange={handleChange}
              name="blurredVisionOneEye"
              status={data.blurredVisionOneEye}
              language={language}
            />
            {/* Blurred Vision Both Eyes */}
            <YesNoRadio
              title={intakeQs.blurredVisionBothEyes[language]}
              handleChange={handleChange}
              name="blurredVisionBothEyes"
              status={data.blurredVisionBothEyes}
              language={language}
            />
          </>
        ) : null}
        <hr/>
        {/* Double Vision */}
        <YesNoRadio
          title={intakeQs.doubleVision[language]}
          handleChange={handleChange}
          name="doubleVision"
          status={data.doubleVision}
          language={language}
          negative={{
            english: "Not at all",
            spanish: "Para nada",
          }}
        />
        {data.doubleVision === "Yes" ? (
          <>
            {/* Double Vision Start */}
            <div className="row mb-3">
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.doubleVisionStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col-6">
                <Dropdown
                  onSelect={(val) => handleSelect("doubleVisionStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="doubleVisionStart-dropdown"
                  >
                    {intakeOptions.daysOneToThree.find(
                      (option) => option.english === data.doubleVisionStart
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.daysOneToThree.map((option) => (
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
            {/* Double Vision Constant */}
            <YesNoRadio
              title={intakeQs.doubleVisionConstant[language]}
              handleChange={handleChange}
              name="doubleVisionConstant"
              status={data.doubleVisionConstant}
              language={language}
            />
            {/* Double Vision On and Off */}
            <YesNoRadio
              title={intakeQs.doubleVisionOnAndOff[language]}
              handleChange={handleChange}
              name="doubleVisionOnAndOff"
              status={data.doubleVisionOnAndOff}
              language={language}
            />
          </>
        ) : null}
                <hr/>
        {/* Light Sensitivity */}
        <YesNoRadio
          title={intakeQs.lightSensitivity[language]}
          handleChange={handleChange}
          name="lightSensitivity"
          status={data.lightSensitivity}
          language={language}
          negative={{
            english: "Not at all",
            spanish: "Para nada",
          }}
        />
        {data.lightSensitivity === "Yes" ? (
          <>
            {/* Light Sensitivity Start */}
            <div className="row mb-3">
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.lightSensitivityStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col-6">
                <Dropdown
                  onSelect={(val) => handleSelect("lightSensitivityStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="lightSensitivityStart-dropdown"
                  >
                    {intakeOptions.daysOneToThree.find(
                      (option) => option.english === data.lightSensitivityStart
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.daysOneToThree.map((option) => (
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
            {/* Light Sensitivity Constant */}
            <YesNoRadio
              title={intakeQs.lightSensitivityConstant[language]}
              handleChange={handleChange}
              name="lightSensitivityConstant"
              status={data.lightSensitivityConstant}
              language={language}
            />
            {/* Light Sensitivity On and Off */}
            <YesNoRadio
              title={intakeQs.lightSensitivityOnAndOff[language]}
              handleChange={handleChange}
              name="lightSensitivityOnAndOff"
              status={data.lightSensitivityOnAndOff}
              language={language}
            />
            {/* Light Sensitivity Scale */}
            <div className="row mb-3">
              <div className="col-12 col-lg-6 mb-lg-0 mb-2">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.lightSensitivityScale[language] + ":"}
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
                    marks={marks}
                    sx={{
                      "& .MuiSlider-markLabel": {
                        fontSize: "1.5rem",
                      },
                    }}
                    min={1}
                    max={5}
                    name="lightSensitivityScale"
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
    </>
  );
}

export default PbStepEight;
