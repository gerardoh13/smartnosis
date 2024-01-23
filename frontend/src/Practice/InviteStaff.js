import React from "react";

function Invitations({
  emails,
  setEmails,
  changeStep,
  step,
  submit,
  adminRole,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 2) changeStep(1);
    else if (step === 3) submit();
  };

  const handleChange = (e, i) => {
    const emailArr = [...emails];
    emailArr[i] = e.target.value;
    setEmails(emailArr);
  };

  const generateEmailFields = () => {
    let emailsCopy = [...emails];
    if (step === 2 && adminRole === "hcp") emailsCopy.pop();
    if (step === 3 && adminRole === "staff") emailsCopy.pop();
    const emailFields = emailsCopy.map((value, i) => (
      <div className="form-floating my-2" key={i}>
        <input
          className="form-control"
          type="text"
          id={`email-${i}`}
          value={value}
          placeholder="email"
          required={step === 2 && i === 0}
          onChange={(e) => handleChange(e, i)}
        />
        <label htmlFor={`email-${i}`}>
          {step === 3 ? "Non-" : ""}HCP Email Address #{i + 1}:{" "}
          <span className="text-danger">*</span>
        </label>
      </div>
    ));
    return emailFields;
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Invite {step === 3 ? "Non-" : ""}HCPs to Smartnosis</p>
      {generateEmailFields()}
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
          <button className="btn btn-primary form-control">
            {step === 3 ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default Invitations;
