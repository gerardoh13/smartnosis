import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
// import PhotoUploader from "../common/PhotoUploader";

function StepFour({
  data,
  handleChange,
  changeStep,
  complete,
  submit,
  handleSelect,
  handleCheckbox,
  intakeQs,
  intakeOptions,
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete()) submit();
  };

  const createCheckbox = (condition, type) => {
    return (
      <div
        className="form-check col-6 col-sm-4 mb-4 mb-sm-0"
        key={condition.english}
      >
        <input
          className="form-check-input"
          type="checkbox"
          value={condition.english}
          id={`${type}-${condition.english}`}
          onChange={handleCheckbox}
          checked={data[type].has(condition.english)}
          name={type}
        />
        <label
          className="form-check-label"
          htmlFor={`${type}-${condition.english}`}
        >
          <strong>{condition[language]}</strong>
        </label>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>
        <span>{intakeQs.required[language] + ":"}</span>
      </p>
      {/* tobaccoUse */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.tobaccoUse[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown
            onSelect={(val) => handleSelect("tobaccoUse", val, "medHistory")}
          >
            <Dropdown.Toggle
              className="form-control text-wrap"
              variant="secondary"
              id="tobacco-dropdown"
            >
              {intakeOptions.tobaccoUse.find(
                (option) => option.english === data.tobaccoUse
              )?.[language] || intakeQs.select[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.tobaccoUse.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* cigsPerDay */}
      {data.tobaccoUse === "Cigarettes" ? (
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-lg-0 mb-2">
            <span className="text-start ms-1 mt-1">
              {intakeQs.cigsPerDay[language] + ":"}
              <span className="text-danger">*</span>
            </span>
          </div>
          <div className="col text-center">
            <Dropdown
              onSelect={(val) => handleSelect("cigsPerDay", val, "medHistory")}
            >
              <Dropdown.Toggle
                className="form-control text-wrap"
                variant="secondary"
                id="cigsPerDay-dropdown"
              >
                {intakeOptions.cigsPerDay.find(
                  (option) => option.english === data.cigsPerDay
                )?.[language] || intakeQs.select[language]}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.cigsPerDay.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      ) : null}
      {/* alcoholUse */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.alcoholUse[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown
            onSelect={(val) => handleSelect("alcoholUse", val, "medHistory")}
          >
            <Dropdown.Toggle
              className="form-control text-wrap"
              variant="secondary"
              id="alcohol-dropdown"
            >
              {intakeOptions.alcoholUse.find(
                (option) => option.english === data.alcoholUse
              )?.[language] || intakeQs.select[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.alcoholUse.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* drugUse */}
      <div className="row mb-3">
        <div className="col-12 col-lg-6 mb-lg-0 mb-2">
          <span className="text-start ms-1 mt-1">
            {intakeQs.drugUse[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col text-center">
          <Dropdown
            onSelect={(val) => handleSelect("drugUse", val, "medHistory")}
          >
            <Dropdown.Toggle
              className="form-control"
              variant="secondary"
              id="druguse-dropdown"
            >
              {intakeOptions.yesNo.find(
                (option) => option.english === data.drugUse
              )?.[language] || intakeQs.select[language]}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {intakeOptions.yesNo.map((option) => (
                <Dropdown.Item key={option.english} eventKey={option.english}>
                  {option[language]}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* otherDrugUse */}
      {data.drugUse === "Yes" ? (
        <div className="form-floating my-3">
          <input
            type="text"
            className="form-control"
            id="otherDrugUse"
            name="otherDrugUse"
            placeholder="If so, explain:"
            value={data.otherDrugUse}
            onChange={(e) => handleChange(e, "medHistory")}
            required
          />
          <label htmlFor="otherDrugUse">
            {intakeQs.otherDrugUse[language] + ":"}
          </label>
        </div>
      ) : null}
      {/* Family History */}
      <b>{intakeQs.familyHistory[language] + ":"}</b>
      <hr />
      <div className="row ms-2">
        <b>{intakeQs.mother[language] + ":"}</b>
        {intakeOptions.familyHistory.map((condition) =>
          createCheckbox(condition, "motherHistory")
        )}
      </div>
      <hr />
      <div className="row ms-2">
        <b>{intakeQs.father[language] + ":"}</b>
        {intakeOptions.familyHistory.map((condition) =>
          createCheckbox(condition, "fatherHistory")
        )}
      </div>
      <hr />
      <div className="row ms-2">
        <b>{intakeQs.grandparents[language] + ":"}</b>
        {intakeOptions.familyHistory.map((condition) =>
          createCheckbox(condition, "grandparentsHistory")
        )}
      </div>
      <hr />
      <div className="row ms-2">
        <b>{intakeQs.siblings[language] + ":"}</b>
        {intakeOptions.familyHistory.map((condition) =>
          createCheckbox(condition, "siblingHistory")
        )}
      </div>
      <hr />
      {/* Comments */}
      <div className="mt-3">
        <label htmlFor="comments" className="fw-bold ms-1">
          {intakeQs.comments[language] + ":"}
        </label>
        <textarea
          className="form-control"
          placeholder={intakeQs.commentsLabel[language]}
          rows={3}
          maxLength={500}
          onChange={(e) => handleChange(e, "medHistory")}
          value={data.comments}
          name="comments"
          id="comments"
        />
      </div>
      {/* <PhotoUploader /> */}
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
          <button className="btn btn-success form-control">Sumbit</button>
        </div>
      </div>
    </form>
  );
}

export default StepFour;
