import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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

function PbStepSeven({
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
          src="Noise.png"
          className="rounded mx-auto d-block w60 my-2"
          alt="Noise"
        />
        <p className="text-center">
          <b>{headers.pgSeven[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
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
        />
        {data.noiseSensitivity === "Yes" ? (
          <>
            {/* Noise Sensitivity Start */}
            <div className="row mb-3">
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.noiseSensitivityStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("noiseSensitivityStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="noiseSensitivityStart-dropdown"
                  >
                    {intakeOptions.noiseSensitivityStart.find(
                      (option) => option.english === data.noiseSensitivityStart
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.noiseSensitivityStart.map((option) => (
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
                    marks={marks}
                    sx={{
                      "& .MuiSlider-markLabel": {
                        fontSize: "1.5rem",
                      },
                    }}
                    min={1}
                    max={5}
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
    </>
  );
}

export default PbStepSeven;
