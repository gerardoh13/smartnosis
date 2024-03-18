import React from "react";

function PbStepOne({
  data,
  handleChange,
  changeStep,
  maxDate,
  complete,
  intakeQs,
  language,
}) {

  const handleSubmit = (e) => {
    changeStep(1);
    // if (complete()) changeStep(1);
  };
  return (
    <form onSubmit={handleSubmit} className="needs-validation">
      <p className="text-center">
        <span className="text-danger">*</span>
        <span>Indicates required field</span>
      </p>
      {/* firstName */}
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={data.firstName}
          onChange={handleChange}
          required
        />
        <label htmlFor="firstName">
          {intakeQs.firstName[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* lastName */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={data.lastName}
          onChange={handleChange}
          required
        />
        <label htmlFor="lastName">
          {intakeQs.lastName[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* promoter */}
      <div className="form-floating my-3">
        <input
          type="text"
          className="form-control"
          id="promoter"
          name="promoter"
          placeholder="Promoter"
          value={data.promoter}
          onChange={handleChange}
          required
        />
        <label htmlFor="promoter">
          {intakeQs.promoter[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      {/* Dof - Date of Fight */}
      <div className="row">
        <div className="col-6">
          <span className="text-start ms-1 mt-1">
            {intakeQs.dof[language] + ":"}
            <span className="text-danger">*</span>
          </span>
        </div>
        <div className="col-6">
          <input
            className="form-control"
            type="date"
            name="dof"
            id="dof"
            max={maxDate}
            value={data.dof}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      {/* Location */}
      <div className="form-floating my-3">
        <input
          className="form-control"
          type="text"
          name="location"
          id="location"
          placeholder="location"
          onChange={handleChange}
          value={data.location}
          required
        />
        <label htmlFor="location">
          {intakeQs.location[language] + ":"}
          <span className="text-danger">*</span>
        </label>
      </div>
      <button className="btn btn-success mt-3 form-control">Next</button>
    </form>
  );
}

export default PbStepOne;
