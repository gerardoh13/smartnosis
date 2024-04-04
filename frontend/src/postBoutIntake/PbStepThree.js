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

function PbStepThree({
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
  };

  return (
    <>
    <div>
      <p className="text-center">In the 3 days after your fight, the below questions are to monitor your headache(s) and dizziness.</p>
    </div>
    <hr/>
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
            <div className="col">
              {/* <span className="text-start ms-1 mt-1">
                {intakeQs.headacheExplain[language] + ":"}
                <span className="text-danger">*</span>
              </span> */}
            </div>
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
                {intakeQs.headachePain[language] + ":"}
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
                  name="headachePain"
                  onChange={handleChange}
                />
              </Box>
            </div>
          </div>
        </>
      ) : null}
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
            <div className="col-6">
              <span className="text-start ms-1 mt-1">
                {intakeQs.dizzinessStart[language] + ":"}
                <span className="text-danger">*</span>
              </span>
            </div>
            <div className="col-6">
              <input
                className="form-control"
                type="date"
                name="dizzinessStart"
                id="dizzinessStart"
                max={maxDate}
                value={data.dizzinessStart}
                onChange={handleChange}
                required
              />
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
            title={intakeQs.dizzinessComeAndGo[language]}
            handleChange={handleChange}
            name="dizzinessComeAndGo"
            status={data.dizzinessComeAndGo}
            language={language}
          />
          {/* Dizzyness Change in Vission */}
          <YesNoRadio
            title={intakeQs.dizzyChangeInVission[language]}
            handleChange={handleChange}
            name="dizzyChangeInVission"
            status={data.dizzyChangeInVission}
            language={language}
          />
        </>
      ) : null}
      {/* Forgetfulness */}
      <YesNoRadio
        title={intakeQs.forgetfulness[language]}
        handleChange={handleChange}
        name="forgetfulness"
        status={data.forgetfulness}
        language={language}
        negative={{
          english: "Not more than before fight",
          spanish: "No más que antes de la pelea.",
        }}
      />
      {data.forgetfulness === "Yes" ? (
        <>
          {/* Forget Recent Events */}
          <YesNoRadio
            title={intakeQs.forgetRecentEvents[language]}
            handleChange={handleChange}
            name="forgetRecentEvents"
            status={data.forgetRecentEvents}
            language={language}
          />
          {/* Forget Names */}
          <YesNoRadio
            title={intakeQs.forgetNames[language]}
            handleChange={handleChange}
            name="forgetNames"
            status={data.forgetNames}
            language={language}
          />
          {/* Forget Items */}
          <YesNoRadio
            title={intakeQs.forgetItems[language]}
            handleChange={handleChange}
            name="forgetItems"
            status={data.forgetItems}
            language={language}
          />
          {/* Mood Changes */}
          <YesNoRadio
            title={intakeQs.moodChanges[language]}
            handleChange={handleChange}
            name="moodChanges"
            status={data.moodChanges}
            language={language}
          />
        </>
      ) : null}
      {/* Concentrate */}
      <YesNoRadio
        title={intakeQs.concentrate[language]}
        handleChange={handleChange}
        name="concentrate"
        status={data.concentrate}
        language={language}
        positive={{
          english: "Yes, it is difficult to concentrate",
          spanish: "Sí, es difícil concentrarse.",
        }}
        negative={{
          english: "Not more than before fight",
          spanish: "No más que antes de la pelea.",
        }}
      />
      {/* Concentrate Explain */}
      {data.concentrate === "Yes, it is difficult to concentrate" ? (
        <div className="row mb-3">
          <div className="col">
            {/* <span className="text-start ms-1 mt-1">
            {intakeQs.concentrateExplain[language] + ":"}
            <span className="text-danger">*</span>
          </span> */}
          </div>
          <div className="col text-center">
            <Dropdown
              onSelect={(val) => handleSelect("concentrateExplain", val)}
            >
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="concentrateExplain-dropdown"
              >
                {intakeOptions.concentrateExplain.find(
                  (option) => option.english === data.concentrateExplain
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.concentrateExplain.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ) : null}

      {/* Depression */}
      <YesNoRadio
        title={intakeQs.depression[language]}
        handleChange={handleChange}
        name="depression"
        status={data.depression}
        language={language}
        positive={{
          english: "Yes, I feel depressed",
          spanish: "Si me siento deprimido",
        }}
        negative={{
          english: "Not at all",
          spanish: "Para nada.",
        }}
      />
      {/* Depression Explain */}
      {data.depression === "Yes, I feel depressed" ? (
        <div className="row mb-3">
          <div className="col">
            {/* <span className="text-start ms-1 mt-1">
            {intakeQs.depressionExplain[language] + ":"}
            <span className="text-danger">*</span>
          </span> */}
          </div>
          <div className="col text-center">
            <Dropdown
              onSelect={(val) => handleSelect("depressionExplain", val)}
            >
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="depressionExplain-dropdown"
              >
                {intakeOptions.depressionExplain.find(
                  (option) => option.english === data.depressionExplain
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.depressionExplain.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
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
