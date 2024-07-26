import React from "react";
import RegisterHcp from "./RegisterHcp";
import RegisterStaff from "./RegisterStaff";
import Alerts from "../common/Alerts";

function RegisterAdmin({
  data,
  handleChange,
  changeStep,
  confirmPasswords,
  setErrors,
  errors,
  checkDupe,
}) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    let validPassword = confirmPasswords();
    let validEmail = await checkDupe();
    if (!validPassword.valid || !validEmail.valid) {
      let errors = [];
      if (validPassword.err) errors.push(validPassword.err);
      if (validEmail.err) errors.push(validEmail.err);
      setErrors(errors);
      return;
    }
    changeStep(1);
  };

  const adminForm =
    data.role === "hcp" ? (
      <RegisterHcp data={data} handleChange={handleChange} />
    ) : (
      <RegisterStaff data={data} handleChange={handleChange} />
    );
  return (
    <>
      {errors.length ? <Alerts msgs={errors} /> : null}
      <div className="mt-3">
        <span className="text-start ms-1 me-3">
          Your Role <span className="text-danger">*</span>
        </span>
        <div className="text-center">
          {/* Hcp */}
          <input
            type="radio"
            className="btn-check ms-3"
            name="role"
            id="hcp"
            autoComplete="off"
            onChange={handleChange}
            checked={data.role === "hcp"}
            value="hcp"
            required
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="hcp">
            HCP
          </label>
          {/* Non-HCP */}
          <input
            type="radio"
            className="btn-check"
            name="role"
            id="staff"
            autoComplete="off"
            onChange={handleChange}
            checked={data.role === "staff"}
            value="staff"
          />
          <label className="btn btn-outline-secondary me-2" htmlFor="staff">
            Non-HCP
          </label>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        {adminForm}
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
    </>
  );
}

export default RegisterAdmin;
