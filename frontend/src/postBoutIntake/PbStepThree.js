import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { getEmojiMarks } from "../common/commonFuncs";

function PbStepThree({
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
          src="Dizziness.png"
          className="rounded mx-auto d-block w-25 my-2"
          alt="Dizziness"
        />
        <p className="text-center">
          <b>{headers.pgThree[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
        {/* Headache */}
        <YesNoRadio
          title={intakeQs.headache[language]}
          handleChange={handleChange}
          name="headache"
          status={data.headache}
          language={language}
          negative={{
            english: "Not more than before fight",
            spanish: "No más que antes de la pelea.",
          }}
        />
        {data.headache === "Yes" ? (
          <>
            {/* Headache Explain*/}
            <div className="row mb-3">
              <div className="col"></div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("headacheExplain", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="headacheExplain-dropdown"
                  >
                    {intakeOptions.headacheExplain.find(
                      (option) => option.english === data.headacheExplain
                    )?.[language] || "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {intakeOptions.headacheExplain.map((option) => (
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
            {/* Headache Pain */}
            <div className="row mb-3">
              <div className="col-12 col-lg-6 mb-lg-0 mb-2">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.headachePainScale[language] + ":"}
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
                    marks={getEmojiMarks()}
                    min={1}
                    max={5}
                    name="headachePainScale"
                    onChange={handleChange}
                  />
                </Box>
              </div>
            </div>
          </>
        ) : null}
        <hr />
        {/* Dizziness */}
        <YesNoRadio
          title={intakeQs.dizziness[language]}
          handleChange={handleChange}
          name="dizziness"
          status={data.dizziness}
          language={language}
          negative={{
            english: "Not more than before fight",
            spanish: "No más que antes de la pelea.",
          }}
        />
        {data.dizziness === "Yes" ? (
          <>
            {/* Dizziness Start */}
            <div className="row mb-3">
              <div className="col-6 d-flex align-items-center">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.dizzinessStart[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("dizzinessStart", val)}
                >
                  <Dropdown.Toggle
                    className="form-control text-wrap"
                    variant="secondary"
                    id="dizzinessStart-dropdown"
                  >
                    {intakeOptions.daysOneToThree.find(
                      (option) => option.english === data.dizzinessStart
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
            {/* Dizzy Lying Down*/}
            <YesNoRadio
              title={intakeQs.dizzyLying[language]}
              handleChange={handleChange}
              name="dizzyLying"
              status={data.dizzyLying}
              language={language}
            />
            {/* Dizzy Sitting Down */}
            <YesNoRadio
              title={intakeQs.dizzySitting[language]}
              handleChange={handleChange}
              name="dizzySitting"
              status={data.dizzySitting}
              language={language}
            />
            {/* Dizzy Standing */}
            <YesNoRadio
              title={intakeQs.dizzyStanding[language]}
              handleChange={handleChange}
              name="dizzyStanding"
              status={data.dizzyStanding}
              language={language}
            />
            {/* Dizziness Come and Go */}
            <YesNoRadio
              title={intakeQs.lightheaded[language]}
              handleChange={handleChange}
              name="lightheaded"
              status={data.lightheaded}
              language={language}
            />
            {data.lightheaded === "Yes" ? (
              <>
                <div className="row mb-3">
                  <div className="col-6 d-flex align-items-center">
                    <span className="text-start ms-1 mt-1">
                      {intakeQs.dizzinessStart[language] + ":"}
                      <span className="text-danger">*</span>
                    </span>
                  </div>
                  <div className="col text-center">
                    <Dropdown
                      onSelect={(val) => handleSelect("lightHeadedStart", val)}
                    >
                      <Dropdown.Toggle
                        className="form-control text-wrap"
                        variant="secondary"
                        id="lightHeadedStart-dropdown"
                      >
                        {intakeOptions.daysOneToThree.find(
                          (option) => option.english === data.lightHeadedStart
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
                <hr />
              </>
            ) : null}
            {/* Dizzyness Change in Vission */}
            <YesNoRadio
              title={intakeQs.headSpinning[language]}
              handleChange={handleChange}
              name="headSpinning"
              status={data.headSpinning}
              language={language}
            />
            {data.headSpinning === "Yes" ? (
              <div className="row mb-3">
                <div className="col-6 d-flex align-items-center">
                  <span className="text-start ms-1 mt-1">
                    {intakeQs.dizzinessStart[language] + ":"}
                    <span className="text-danger">*</span>
                  </span>
                </div>
                <div className="col text-center">
                  <Dropdown
                    onSelect={(val) => handleSelect("headSpinningStart", val)}
                  >
                    <Dropdown.Toggle
                      className="form-control text-wrap"
                      variant="secondary"
                      id="headSpinningStart-dropdown"
                    >
                      {intakeOptions.daysOneToThree.find(
                        (option) => option.english === data.headSpinningStart
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

export default PbStepThree;
