import React from "react";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Dropdown from "react-bootstrap/Dropdown";

function PbStepEight({
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
          positive={{
            english: "Yes, I suffer from Blurred Vision",
            spanish: "Sí, sufro de visión borrosa",
          }}
        />
        {data.blurredVision === "Yes, I suffer from Blurred Vision" ? (
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
                <input
                  className="form-control"
                  type="date"
                  name="blurredVisionStart"
                  id="blurredVisionStart"
                  max={maxDate}
                  value={data.blurredVisionStart}
                  onChange={handleChange}
                  required
                />
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
          positive={{
            english: "Yes, I suffer from Double Vision",
            spanish: "Sí, sufro de visión doble",
          }}
        />
        {data.doubleVision === "Yes, I suffer from Double Vision" ? (
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
                <input
                  className="form-control"
                  type="date"
                  name="doubleVisionStart"
                  id="doubleVisionStart"
                  max={maxDate}
                  value={data.doubleVisionStart}
                  onChange={handleChange}
                  required
                />
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
            {/* Double Vision One Eye */}
            <YesNoRadio
              title={intakeQs.doubleVisionOneEye[language]}
              handleChange={handleChange}
              name="doubleVisionOneEye"
              status={data.doubleVisionOneEye}
              language={language}
            />
            {/* Double Vision Both Eyes */}
            <YesNoRadio
              title={intakeQs.doubleVisionBothEyes[language]}
              handleChange={handleChange}
              name="doubleVisionBothEyes"
              status={data.doubleVisionBothEyes}
              language={language}
            />
          </>
        ) : null}
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
          positive={{
            english: "Yes, I suffer from Light sensitivity",
            spanish: "Sí, sufro de sensibilidad a la luz.",
          }}
        />
        {data.lightSensitivity === "Yes, I suffer from Light sensitivity" ? (
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
                <input
                  className="form-control"
                  type="date"
                  name="lightSensitivityStart"
                  id="lightSensitivityStart"
                  max={maxDate}
                  value={data.lightSensitivityStart}
                  onChange={handleChange}
                  required
                />
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
            {/* Light Sensitivity Trigger */}
            <YesNoRadio
              title={intakeQs.lightSensitivityTrigger[language]}
              handleChange={handleChange}
              name="lightSensitivityTrigger"
              status={data.lightSensitivityTrigger}
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
                    marks
                    min={1}
                    max={10}
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
