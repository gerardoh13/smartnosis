import React from "react";
import PhotoUploader from "../common/PhotoUploader";

function PbStepTen({
  data,
  handleChange,
  handleCheckbox,
  changeStep,
  headers,
  intakeQs,
  language,
}) {
  const symptoms = [
    { english: "Bruising or bleeding", spanish: "Moretones o sangrado" },
    { english: "Shortness of breath", spanish: "Dificultad para respirar" },
    { english: "Chest Pain", spanish: "Dolor en el pecho" },
    { english: "Swelling", spanish: "Hinchazón" },
    { english: "Seizures/Tremors", spanish: "Convulsiones/Temblores" },
    { english: "Nausea/Vomiting", spanish: "Náuseas vómitos" },
  ];

  const createCheckbox = (symptom, data) => {
    return (
      <div className="form-check mb-3" key={symptom.english}>
        <input
          className="form-check-input"
          type="checkbox"
          value={symptom.english}
          id={symptom}
          onChange={handleCheckbox}
          checked={data.symptoms.has(symptom.english)}
          name="symptoms"
        />
        <label className="form-check-label" htmlFor={symptom}>
          <strong>{symptom[language]}</strong>
        </label>
      </div>
    );
  };

  let checkboxes = symptoms.map((symptom) => createCheckbox(symptom, data));

  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  return (
    <>
      <div>
        <img
          src="Symptoms.png"
          className="rounded mx-auto d-block w-25 my-2"
          alt="Symptoms"
        />
        <p className="text-center">
          <b>{headers.pgTen[language]}</b>
        </p>
      </div>
      <hr />
      <form onSubmit={handleSubmit} className="needs-validation">
        <p>{intakeQs.symptoms[language] + ":"}</p>
        <div className="ms-0 ms-lg-3">{checkboxes}</div>
        <hr />
        <p>{intakeQs.comments[language] + ":"}</p>
        <textarea
          className="form-control"
          rows={3}
          id="comments"
          name="comments"
          value={data.comments}
          onChange={handleChange}
        ></textarea>
        <p className="mt-3">{intakeQs.additionalPIds[language] + ":"}</p>
        <PhotoUploader uploadLimit={5} />
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
    </>
  );
}

export default PbStepTen;
