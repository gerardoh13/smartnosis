import React from "react";

function StepTwo({ data, handleChange, changeStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const conditions = [
    "Pneumonia",
    "Bronchitis",
    "Cancer",
    "Stomach/intestinal ulcers",
    "Kidney Stones",
    "Mental illness",
    "Blood Clots/phlebitis",
    "Hernias",
    "Diabetes",
    "Heart attack",
    "Gall stones",
    "Seizures",
    "Cataracts",
    "High cholesterol",
    "Strokes",
    "Glaucoma",
    "Sexually transmitted Diseases",
    "Asthma/emphysema",
    "High blood pressure",
    "Kidney failure",
    "Gout",
    "Arthritis",
    "Parkinson's disease",
    "Migraine headaches",
  ];

  let checkboxes = conditions.map((condition) => {
    return (
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          value={condition}
          id={condition}
        />
        <label className="form-check-label" htmlFor={condition}>
            <strong>
            {condition}
            </strong>
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
        <button className="btn btn-success mt-3 form-control col">
          Next
        </button>
      </div>    </form>
  );
}

export default StepTwo;
