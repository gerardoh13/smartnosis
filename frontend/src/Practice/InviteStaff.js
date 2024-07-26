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
    // lower step check by one when stripe is added
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
    // lower step check by one when stripe is added
    let emailsCopy = [...emails];
    if (step === 2 && adminRole === "hcp") emailsCopy.pop();
    if (step === 3 && adminRole === "staff") emailsCopy.pop();
    const emailFields = emailsCopy.map((value, i) => {
      let req = step === 2 && i === 0 && adminRole === "staff";
      return (
        <div className="form-floating my-2" key={i}>
          <input
            className="form-control"
            type="email"
            id={`email-${i}`}
            value={value}
            placeholder="email"
            required={req}
            onChange={(e) => handleChange(e, i)}
          />
          <label htmlFor={`email-${i}`}>
            {step === 3 ? "Non-" : ""}HCP Email Address #{i + 1}:{" "}
            {req ? <span className="text-danger">*</span> : null}
          </label>
        </div>
      );
    });
    return emailFields;
  };

  // lower step check by one when stripe is added
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
