import React, { useState, useEffect } from "react";
import { createCheckbox } from "../common/commonFuncs";

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
      let res = defaultSymptoms.filter((s) => {
        if (
          s.startsWith(value) ||
          s.startsWith(value.charAt(0).toUpperCase() + value.slice(1))
        )
          return true;
        else return false;
      });
      setSearchRes(res);
    } else setSearchRes([]);
  };

  let results = searchRes.map((symptom) =>
    createCheckbox(symptom, handleCheckbox, data, "symptoms")
  );

  let checkboxes = symptoms.map((symptom) =>
    createCheckbox(symptom, handleCheckbox, data, "symptoms")
  );

  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <h4>Symptoms</h4>
      <p>What are you experiencing?</p>
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="searchSymptoms"
          placeholder="Search Symptoms:"
          value={searchTerm}
          onChange={handleChange}
        />
        <label htmlFor="searchSymptoms">Search Symptoms:</label>
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
