import React, { useState, useEffect } from "react";
import { createCheckbox } from "../common/commonFuncs";

function StepTwo({
  data,
  changeStep,
  handleCheckbox,
  setFormData,
  intakeQs,
  language,
}) {
  const defaultConditions = [
    "Pneumonia",
    "Bronchitis",
    "Cancer",
    "Stomach/Intestinal Ulcers",
    "Kidney Stones",
    "Mental Illness",
    "Blood Clots/Phlebitis",
    "Hernias",
    "Diabetes",
    "Heart Attack",
    "Gall Stones",
    "Seizures",
    "Cataracts",
    "High Cholesterol",
    "Strokes",
    "Glaucoma",
    "Sexually Transmitted Diseases",
    "Asthma/Emphysema",
    "High Blood Pressure",
    "Kidney Failure",
    "Gout",
    "Arthritis",
    "Parkinson's Disease",
    "Migraine headaches",
  ];

  const [conditions, setConditions] = useState(defaultConditions);
  const [otherCondition, setOtherCondition] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const addCondition = () => {
    setConditions((prev) => [...prev, otherCondition]);
    setOtherCondition("");
    let copy = new Set([...data.conditions, otherCondition]);
    setFormData((data) => ({
      ...data,
      conditions: copy,
    }));
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
    if (value.length) {
      let res = defaultConditions.filter((c) => {
        if (
          c.startsWith(value) ||
          c.startsWith(value.charAt(0).toUpperCase() + value.slice(1))
        )
          return true;
        else return false;
      });
      setSearchRes(res);
    } else setSearchRes([]);
  };

  let results = searchRes.map((symptom) =>
    createCheckbox(symptom, handleCheckbox, data, "conditions")
  );

  let checkboxes = conditions.map((symptom) =>
    createCheckbox(symptom, handleCheckbox, data, "conditions")
  );

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <h4>Medical History</h4>
      <p>
        Have you been diagnosed with any of the following (past or present)?
      </p>
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="searchConditions"
          placeholder="Search Conditions:"
          value={searchTerm}
          onChange={handleChange}
        />
        <label htmlFor="searchConditions">Search Conditions:</label>
      </div>
      <ul>
        {searchRes.length ? (
          <>
            {results}
            <hr />
          </>
        ) : null}
      </ul>
      {checkboxes}
      <hr />
      <p>
        <b>Any Conditions not listed?</b>
      </p>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Condition:"
          value={otherCondition}
          onChange={(e) => setOtherCondition(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={addCondition}
        >
          Add
        </button>
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
  );
}

export default StepTwo;
