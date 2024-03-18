import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import YesNoRadio from "../common/YesNoRadio";

function PbStepTwo({
  data,
  handleChange,
  handleSelect,
  changeStep,
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
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>
        <span>Indicates required field</span>
      </p>
      {/* result */}
      <div className="row mb-3">
      <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.result[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("result", val)}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="result-dropdown"
            >
              {intakeOptions.result.find(
                (option) => option.english === data.result
              )?.[language] || "Select"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.result.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* status */}
      <div className="row mb-3">
      <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.status[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown onSelect={(val) => handleSelect("status", val)}>
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="status-dropdown"
            >
              {intakeOptions.status.find(
                (option) => option.english === data.status
              )?.[language] || "Select"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.status.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* transport */}
      {data.status === "Sent to Hospital" ? (
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-lg-0 mb-2">
            {/* <span className="text-start ms-1 mt-1">
            {intakeQs.transport[language] + ":"}
            <span className="text-danger">*</span>
          </span> */}
          </div>
          <div className="col text-center">
            <Dropdown onSelect={(val) => handleSelect("transport", val)}>
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="transport-dropdown"
              >
                {intakeOptions.transport.find(
                  (option) => option.english === data.transport
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.transport.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ) : null}
      {/* hospital name */}
      {data.status === "Sent to Hospital" ? (
        <>
          <div className="form-floating my-3">
            <input
              className="form-control"
              type="text"
              name="hospitalName"
              id="hospitalName"
              placeholder="Hospital Name"
              onChange={handleChange}
              value={data.hospitalName}
              required
            />
            <label htmlFor="hospitalName">
              {intakeQs.hospitalName[language] + ":"}
              <span className="text-danger">*</span>
            </label>
          </div>
          {/* Visit Length */}
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-lg-0 mb-2">
              <span className="text-start ms-1 mt-1">
                {intakeQs.visitLength[language] + ":"}
                <span className="text-danger">*</span>
              </span>
            </div>
            <div className="col text-center">
              <Dropdown onSelect={(val) => handleSelect("visitLength", val)}>
                <Dropdown.Toggle
                  className="form-control"
                  variant="secondary"
                  id="visitLength-dropdown"
                >
                  {data.visitLength ? data.visitLength : "Select"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((option) => (
                    <Dropdown.Item key={option} eventKey={option}>
                      {option}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </>
      ) : null}
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
            <div className="col">
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
                  {data.alertnessLossRound ? data.alertnessLossRound : "Select"}
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
          <div className="row mb-3">
            <div className="col">
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

export default PbStepTwo;
