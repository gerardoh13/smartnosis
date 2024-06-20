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
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete()) submit();
  };
  const familyHistory = [
    "Cancer",
    "Diabetes",
    "High Cholesterol",
    "Heart Attack",
    "High Blood Pressure",
    "Mental Illness",
  ];

  const createCheckbox = (condition, type) => {
    return (
      <div className="form-check col-6 col-sm-4 mb-4 mb-sm-0" key={condition}>
        <input
          className="form-check-input"
          type="checkbox"
          value={condition}
          id={`${type}-${condition}`}
          onChange={handleCheckbox}
          checked={data[type].has(condition)
          }
          name={type}
        />
        <label className="form-check-label" htmlFor={`${type}-${condition}`}>
          <strong>{condition}</strong>
        </label>
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>{" "}
        <span>Indicates required field</span>
      </p>
      {/* tobaccoUse */}
      <div className="row mb-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Tobacco Use: <span className="text-danger">*</span>
          </p>
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
              {data.tobaccoUse ? data.tobaccoUse : "Select"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Never smoked"}>
                Never smoked
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Former smoker"}>
                Former smoker
              </Dropdown.Item>
              <Dropdown.Item eventKey={"Cigars"}>Cigars</Dropdown.Item>
              <Dropdown.Item eventKey={"Vapes"}>Vapes</Dropdown.Item>
              <Dropdown.Item eventKey={"Chewing tobacco"}>
                Chewing tobacco
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* alcoholUse */}
      <div className="row mb-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Alcohol Use: <span className="text-danger">*</span>
          </p>
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
              {data.alcoholUse ? data.alcoholUse : "Select"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey={"None"}>None</Dropdown.Item>
              <Dropdown.Item eventKey={"Less than one drink per day"}>
                Less than one drink per day
              </Dropdown.Item>
              <Dropdown.Item eventKey={"1-2 drinks per day"}>
                1-2 drinks per day
              </Dropdown.Item>
              <Dropdown.Item eventKey={"3 or more drinks per day"}>
                3 or more drinks per day
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* drugUse */}
      <div className="row mb-3">
        <div className="col">
          <p className="text-start ms-1 mt-1">
            Drug Use: <span className="text-danger">*</span>
          </p>
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
              {data.drugUse ? data.drugUse : "Select"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item eventKey={"Yes"}>Yes</Dropdown.Item>
              <Dropdown.Item eventKey={"No"}>No</Dropdown.Item>
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
            (Drug Use) If so, Explain: <span className="text-danger">*</span>
          </label>
        </div>
      ) : null}
      {/* Family History */}
      <b>Family History</b>
      <hr />
      <div className="row ms-2">
        <b>Mother:</b>
        {familyHistory.map(condition => createCheckbox(condition, "motherHistory"))}
      </div>
      <hr />
      <div className="row ms-2">
        <b>Father:</b>
        {familyHistory.map(condition => createCheckbox(condition, "fatherHistory"))}
      </div>
      <hr />
      <div className="row ms-2">
        <b>Grand Parents:</b>
        {familyHistory.map(condition => createCheckbox(condition, "grandParentsHistory"))}
      </div>
      <hr />
      <div className="row ms-2">
        <b>Aunts:</b>
        {familyHistory.map(condition => createCheckbox(condition, "auntsHistory"))}
      </div>
      <hr />
      <div className="row ms-2">
        <b>Uncles:</b>
        {familyHistory.map(condition => createCheckbox(condition, "unclesHistory"))}
      </div>
      <hr />
      {/* Comments */}
      <div className="mt-3">
        <label htmlFor="comments" className="fw-bold ms-1">
          Comments:
        </label>
        <textarea
          className="form-control"
          placeholder="Additional Comments (Optional)"
          rows={3}
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