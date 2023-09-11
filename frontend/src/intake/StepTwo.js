import React, { useState, useEffect } from "react";

function StepThree({ data, handleCheckbox, changeStep, setFormData }) {
  const defaultSymptoms = [
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

  const [symptoms, setSymptoms] = useState(defaultSymptoms);
  const [otherSymptom, setOtherSymptom] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchRes, setSearchRes] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const handlePrevStep = () => {
    if (data.insurance === "No") changeStep(-1);
    else if (data.insurance === "Yes") changeStep(-0.5);
  };

  const addSymptom = () => {
    setSymptoms((prev) => [...prev, otherSymptom]);
    setOtherSymptom("");
    let copy = new Set([...data.symptoms, otherSymptom]);
    setFormData((data) => ({
      ...data,
      symptoms: copy,
    }));
  };

  const handleChange = (e) => {
    let { value } = e.target;
    setSearchTerm(value);
    if (value.length) {
      let res = defaultSymptoms.filter((s) => s.startsWith(value));
      setSearchRes(res);
    } else setSearchRes([]);
  };
  let results = searchRes.map((s) => {
    return <li key={s}>{s}</li>;
  });

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
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="insFirstName"
          name="insFirstName"
          placeholder="First Name"
          value={searchTerm}
          onChange={handleChange}
        />
        <label htmlFor="insFirstName">Search Symptoms:</label>
      </div>
      <ul>{searchRes.length ? results : null}</ul>
      {checkboxes}
      <hr />
      <p>
        <b>Any Symptoms not listed?</b>
      </p>
      <div className="input-group my-3">
        <input
          type="text"
          className="form-control"
          placeholder="Symptom:"
          value={otherSymptom}
          onChange={(e) => setOtherSymptom(e.target.value)}
        />
        <button className="btn btn-primary" type="button" onClick={addSymptom}>
          Add
        </button>
      </div>
      <div className="row">
        <button
          className="btn btn-success mt-3 me-2 form-control col"
          onClick={handlePrevStep}
        >
          Previous
        </button>
        <button className="btn btn-success mt-3 form-control col">Next</button>
      </div>{" "}
    </form>
  );
}

export default StepThree;
