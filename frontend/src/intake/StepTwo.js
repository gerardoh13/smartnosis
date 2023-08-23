import React from "react";

function StepThree({ data, handleCheckbox, changeStep }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const symptoms = [
    "Abnormal Pain",
    "Anxiety",
    "Asthma",
    "Back Pain",
    "Covid-19 Symptoms",
    "Depression",
    "Dizziness",
    "Erectile Dysfunction",
    "Fever",
    "Headache(s)",
    "Irritable Bowel",
    "Rash",
    "Seasonal Allergies",
    "Seizure",
    "Stroke",
    "Urinary Pain",
  ];

  let checkboxes = symptoms.map((symptom) => {
    return (
      <div className="form-check mb-3" key={symptom}>
        <input
          className="form-check-input"
          type="checkbox"
          value={symptom}
          id={symptom}
          onChange={handleCheckbox}
          checked={data.symptoms.has(symptom)}
          name="symptoms"
        />
        <label className="form-check-label" htmlFor={symptom}>
          <strong>{symptom}</strong>
        </label>
      </div>
    );
  });
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <h4>Symptoms</h4>
      <p>What are you experiencing?</p>
      {checkboxes}
      <div className="row">
        <button
          className="btn btn-success mt-3 me-2 form-control col"
          onClick={() => changeStep(-1)}
        >
          Previous
        </button>
        <button className="btn btn-success mt-3 form-control col">Next</button>
      </div>{" "}
    </form>
  );
}

export default StepThree;
