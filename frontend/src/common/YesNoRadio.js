import React from "react";

function YesNoRadio({
  title,
  handleChange,
  name,
  status,
  language,
  negative = { english: "No", spanish: "No" },
  positive = { english: "Yes", spanish: "Si" },
}) {
  const negativeLabel = negative[language] || negative.english; // Get the translation for the negative option
  const positiveLabel = positive[language] || positive.english;
  return (
    <div className="row mb-3">
      <div className="col-12 col-lg-6 mb-lg-0 mb-2 d-flex align-items-center">
        <span className="ms-1">
          {title + ":"}
          <span className="text-danger">*</span>
        </span>
      </div>
      <div className="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <input
          type="radio"
          className="btn-check"
          name={name}
          id={"yes-" + name}
          autoComplete="off"
          onChange={handleChange}
          checked={status === positive.english}
          value={positive.english}
          required
        />
        <label
          className="btn btn-outline-secondary btn-sm me-2 text-wrap h-100 w-50 d-flex align-items-center justify-content-center"
          htmlFor={"yes-" + name}
        >
          {positiveLabel}
        </label>
        <input
          type="radio"
          className="btn-check"
          name={name}
          id={"no-" + name}
          autoComplete="off"
          onChange={handleChange}
          checked={status === negative.english}
          value={negative.english}
        />
        <label
          className="btn btn-outline-secondary btn-sm text-wrap h-100 w-50 d-flex align-items-center justify-content-center"
          htmlFor={"no-" + name}
        >
          {negativeLabel}
        </label>
      </div>
    </div>
  );
}

export default YesNoRadio;
