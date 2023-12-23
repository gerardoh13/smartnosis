import React from "react";

function Invitations({ emails, setEmails, changeStep, step }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  const handleChange = (e, i) => {
    const emailArr = [...emails];
    emailArr[i] = e.target.value;
    setEmails(emailArr);
  };

  const emailFields = emails.map((value, i) => (
    <div className="form-floating my-2" key={i}>
      <input
        className="form-control"
        type="text"
        id={`email-${i}`}
        value={value}
        placeholder="email"
        required={step === 1 && i === 0}
        onChange={(e) => handleChange(e, i)}
      />
      <label htmlFor={`email-${i}`}>
        {step > 1 ? "Non-" : ""}HCP Email Address #{i + 1}:{" "}
        <span className="text-danger">*</span>
      </label>
    </div>
  ));

  return (
    <form onSubmit={handleSubmit}>
      <p>Invite {step > 1 ? "Non-" : ""}HCPs to Smartnosis</p>
      {emailFields}
      <div className="row mt-4">
        <div className="col">
          <button
          type="button"
            className="btn btn-primary form-control"
            onClick={() => changeStep(-1)}
          >
            Previous
          </button>
        </div>
        <div className="col">
          <button className="btn btn-primary form-control">Next</button>
        </div>
      </div>
    </form>
  );
}

export default Invitations;
