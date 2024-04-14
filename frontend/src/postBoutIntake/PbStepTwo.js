import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";

function PbStepTwo({
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
          src="Head-Injury.png"
          className="rounded mx-auto d-block w-25 my-2"
          alt="Head Injury"
        />
        <p className="text-center">
          <b>{headers.pgTwo[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p className="text-center">
          <span className="text-danger">*</span>
          <span>Indicates required field</span>
        </p>
        {/* Concussion */}
        <YesNoRadio
          title={intakeQs.concussion[language]}
          handleChange={handleChange}
          name="concussion"
          status={data.concussion}
          language={language}
          className="text-start justify-content-center d-none"
        />
        {data.concussion === "Yes" ? (
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-lg-0 mb-2">
              <span className="text-start ms-1 mt-1">
                {intakeQs.concussionNum[language] + ":"}
                <span className="text-danger">*</span>
              </span>
            </div>
            <div className="col text-center">
              <Dropdown onSelect={(val) => handleSelect("concussionNum", val)}>
                <Dropdown.Toggle
                  className="form-control"
                  variant="secondary"
                  id="concussionNum-dropdown"
                >
                  {data.concussionNum ? data.concussionNum : "Select"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
                    <Dropdown.Item key={option} eventKey={option}>
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ) : null}
        <hr />
        {/* Alertness Loss */}
        <YesNoRadio
          title={intakeQs.alertnessLoss[language]}
          handleChange={handleChange}
          name="alertnessLoss"
          status={data.alertnessLoss}
          language={language}
        />
        {data.alertnessLoss === "Yes" ? (
          <>
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.alertnessLossRound[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("alertnessLossRound", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="alertnessLossRound-dropdown"
                  >
                    {data.alertnessLossRound
                      ? data.alertnessLossRound
                      : "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[
                      "1",
                      "2",
                      "3",
                      "4",
                      "5",
                      "6",
                      "7",
                      "8",
                      "9",
                      "10",
                      "11",
                      "12",
                    ].map((option) => (
                      <Dropdown.Item key={option} eventKey={option}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            {/* Alertness Loss Length */}
            <div className="row mb-3">
              <div className="col d-flex align-items-center">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.alertnessLossLength[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown
                  onSelect={(val) => handleSelect("alertnessLossLength", val)}
                >
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="alertnessLossLength-dropdown"
                  >
                    {data.alertnessLossLength
                      ? data.alertnessLossLength
                      : "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey={"1-10"}>1-10</Dropdown.Item>
                    <Dropdown.Item eventKey={"10+"}>10+</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </>
        ) : null}
        <hr />
        {/* Drugs Or Alcohol */}
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-lg-0 mb-2">
            <span className="text-start ms-1 mt-1">
              {intakeQs.drugsOrAlcohol[language] + ":"}
              <span className="text-danger">*</span>
            </span>
          </div>
          <div className="col text-center">
            <Dropdown onSelect={(val) => handleSelect("drugsOrAlcohol", val)}>
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="drugsOrAlcohol-dropdown"
              >
                {intakeOptions.drugsOrAlcohol.find(
                  (option) => option.english === data.drugsOrAlcohol
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.drugsOrAlcohol.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
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

export default PbStepTwo;
