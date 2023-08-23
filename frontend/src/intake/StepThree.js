import React from "react";

function StepTwo({ data, changeStep, handleCheckbox, submit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const conditions = [
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
