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

function PbStepNine({
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
          src="Neck-Back-Pain.png"
          className="rounded mx-auto d-block w60 my-2"
          alt="Boxing Glove"
        />
        <p className="text-center">
          <b>{headers.pgNine[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
        {/* Neck Pain */}
        <YesNoRadio
          title={intakeQs.neckPain[language]}
          handleChange={handleChange}
          name="neckPain"
          status={data.neckPain}
          language={language}
          negative={{
            english: "Not more than before fight",
            spanish: "No más que antes de la pelea.",
          }}
        />
        {data.neckPain === "Yes" ? (
          <>
            {/* Neck Pain Start */}
            <div className="row mb-3">
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.neckPainStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("neckPainStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="neckPainStart-dropdown"
                  >
                    {intakeOptions.daysOneToThree.find(
                      (option) => option.english === data.neckPainStart
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
            {/* Neck Pain Scale */}
            <div className="row mb-3">
              <div className="col-12 col-lg-6 mb-lg-0 mb-2">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.neckPainScale[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Box sx={{ width: "90%", marginX: "auto", marginTop: 4 }}>
                  <Slider
                    aria-label="Headache Pain"
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
                    name="neckPainScale"
                    onChange={handleChange}
                  />
                </Box>
              </div>
            </div>
          </>
        ) : null}
        <hr/>
        {/* Lower Back Pain */}
        <YesNoRadio
          title={intakeQs.lowerBackPain[language]}
          handleChange={handleChange}
          name="lowerBackPain"
          status={data.lowerBackPain}
          language={language}
          negative={{
            english: "Not more than before fight",
            spanish: "No más que antes de la pelea.",
          }}
        />
        {data.lowerBackPain === "Yes" ? (
          <>
            {/* Lower Back Pain Start */}
            <div className="row mb-3">
              <div className="col-6">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.lowerBackPainStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("lowerBackPainStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="lowerBackPainStart-dropdown"
                  >
                    {intakeOptions.daysOneToThree.find(
                      (option) => option.english === data.lowerBackPainStart
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
            {/* Lower Back Pain Scale */}
            <div className="row mb-3">
              <div className="col-12 col-lg-6 mb-lg-0 mb-2">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.lowerBackPainScale[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Box sx={{ width: "90%", marginX: "auto", marginTop: 4 }}>
                  <Slider
                    aria-label="Headache Pain"
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
                    name="lowerBackPainScale"
                    onChange={handleChange}
                  />
                </Box>
              </div>
            </div>
          </>
        ) : null}
        <hr/>
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

export default PbStepNine;
