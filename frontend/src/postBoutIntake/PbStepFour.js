import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";

function PbStepFour({
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
        <p className="text-center">{headers.pgFour[language]}</p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
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
          negative={{
            english: "Not more than before fight",
            spanish: "No más que antes de la pelea.",
          }}
        />
        {/* Concentrate Explain */}
        {data.concentrate === "Yes" ? (
          <div className="row mb-3">
            <div className="col"></div>
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
        ) : null}
        {/* Depression */}
        <YesNoRadio
          title={intakeQs.depression[language]}
          handleChange={handleChange}
          name="depression"
          status={data.depression}
          language={language}
          negative={{
            english: "Not at all",
            spanish: "Para nada.",
          }}
        />
        {/* Depression Explain */}
        {data.depression === "Yes" ? (
          <div className="row mb-3">
            <div className="col d-flex align-items-center">
            <span className="text-start ms-1 mt-1">
                  {intakeQs.depressionExplain[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
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
        ) : null}
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

export default PbStepFour;
