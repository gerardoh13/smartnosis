import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

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
        <p className="text-center">{headers.pgNine[language]}</p>
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
          positive={{
            english: "Yes, I have Neck Pain(s)",
            spanish: "Si, tengo dolor de cuello",
          }}
        />
        {data.neckPain === "Yes, I have Neck Pain(s)" ? (
          <>
            {/* Neck Pain Explain */}
            <div className="row mb-3">
              <div className="col"></div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("neckPainExplain", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="neckPainExplain-dropdown"
                  >
                    {intakeOptions.neckPainExplain.find(
                      (option) => option.english === data.neckPainExplain
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.neckPainExplain.map((option) => (
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
                    marks
                    min={1}
                    max={10}
                    name="neckPainScale"
                    onChange={handleChange}
                  />
                </Box>
              </div>
            </div>
          </>
        ) : null}
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
          positive={{
            english: "Yes, I have Lower Back Pain(s)",
            spanish: "Sí, tengo dolor lumbar.",
          }}
        />
        {data.lowerBackPain === "Yes, I have Lower Back Pain(s)" ? (
          <>
            {/* Lower Back Pain Explain */}
            <div className="row mb-3">
              <div className="col"></div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("lowerBackPainExplain", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="lowerBackPainExplain-dropdown"
                  >
                    {intakeOptions.lowerBackPainExplain.find(
                      (option) => option.english === data.lowerBackPainExplain
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.lowerBackPainExplain.map((option) => (
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
                    marks
                    min={1}
                    max={10}
                    name="lowerBackPainScale"
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

export default PbStepNine;
