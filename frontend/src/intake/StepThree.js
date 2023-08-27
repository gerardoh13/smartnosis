import React, { useState } from "react";

function StepTwo({ data, changeStep, handleCheckbox, submit, setFormData }) {
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
    "Kidney failure",
    "Gout",
    "Arthritis",
    "Parkinson's Disease",
    "Migraine headaches",
  ];

  const [conditions, setConditions] = useState(defaultConditions);
  const [otherCondition, setOtherCondition] = useState("");

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

  let checkboxes = conditions.map((condition) => {
    return (
      <div className="form-check mb-3" key={condition}>
        <input
          className="form-check-input"
          type="checkbox"
          value={condition}
          id={condition}
          onChange={handleCheckbox}
          checked={data.conditions.has(condition)}
          name="conditions"
        />
        <label className="form-check-label" htmlFor={condition}>
          <strong>{condition}</strong>
        </label>
      </div>
    );
  });
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <h4>Medical History</h4>
      <p>
        Have you been diagnosed with any of the following (past or present)?
      </p>
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
        <button className="btn btn-primary" type="button" onClick={addCondition}>
          Add
        </button>
      </div>
      <div className="row">
        <button
          className="btn btn-success mt-3 me-2 form-control col"
          onClick={() => changeStep(-1)}
        >
          Previous
        </button>
        <button
          className="btn btn-success mt-3 form-control col"
          onClick={() => submit(data)}
        >
          Next
        </button>
      </div>{" "}
    </form>
  );
}

export default StepTwo;
