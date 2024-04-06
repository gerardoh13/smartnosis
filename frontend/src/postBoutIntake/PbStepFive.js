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
  intakeQs,
  intakeOptions,
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete()) changeStep(1);
  };
  return (
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
  );
}

export default PbStepFive;
