import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

function PbStepOne({
  data,
  handleChange,
  handleSelect,
  changeStep,
  maxDate,
  complete,
  headers,
  intakeQs,
  intakeOptions,
  language,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (complete()) changeStep(1);
  };
  return (
    <>
      <div>
        <img
          src="boxing-glove-app-icon.png"
          className="rounded mx-auto d-block w60 my-2"
          alt="Boxing Glove"
        />
        <p className="text-center">
          <b>{headers.pgOne[language]}</b>
        </p>
      </div>
      <hr />
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
          {/* Physician's Name */}
        </div>
        <div className="form-floating my-3">
          <input
            type="text"
            className="form-control"
            id="physicianName"
            name="physicianName"
            placeholder="Hhysician's Name"
            value={data.physicianName}
            onChange={handleChange}
            required
          />
          <label htmlFor="physicianName">
            {intakeQs.physicianName[language] + ":"}
            <span className="text-danger">*</span>
          </label>
        </div>
        {/* Dof - Date of Fight */}
        <div className="row">
          <div className="col-6 d-flex align-items-center">
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
        {/* result */}
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-lg-0 mb-2">
            <span className="text-start ms-1 mt-1">
              {intakeQs.result[language] + ":"}
              <span className="text-danger">*</span>
            </span>
          </div>
          <div className="col text-center">
            <Dropdown onSelect={(val) => handleSelect("result", val)}>
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="result-dropdown"
              >
                {intakeOptions.result.find(
                  (option) => option.english === data.result
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.result.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* status */}
        <div className="row mb-3">
          <div className="col-12 col-lg-6 mb-lg-0 mb-2">
            <span className="text-start ms-1 mt-1">
              {intakeQs.status[language] + ":"}
              <span className="text-danger">*</span>
            </span>
          </div>
          <div className="col text-center">
            <Dropdown onSelect={(val) => handleSelect("status", val)}>
              <Dropdown.Toggle
                className="form-control"
                variant="secondary"
                id="status-dropdown"
              >
                {intakeOptions.status.find(
                  (option) => option.english === data.status
                )?.[language] || "Select"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {intakeOptions.status.map((option) => (
                  <Dropdown.Item key={option.english} eventKey={option.english}>
                    {option[language]}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
        {/* transport */}
        {data.status === "Sent to Hospital" ? (
          <div className="row mb-3">
            <div className="col-12 col-lg-6 mb-lg-0 mb-2"></div>
            <div className="col text-center">
              <Dropdown onSelect={(val) => handleSelect("transport", val)}>
                <Dropdown.Toggle
                  className="form-control"
                  variant="secondary"
                  id="transport-dropdown"
                >
                  {intakeOptions.transport.find(
                    (option) => option.english === data.transport
                  )?.[language] || "Select"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {intakeOptions.transport.map((option) => (
                    <Dropdown.Item
                      key={option.english}
                      eventKey={option.english}
                    >
                      {option[language]}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        ) : null}
        {/* hospital name */}
        {data.status === "Sent to Hospital" ? (
          <>
            <div className="form-floating my-3">
              <input
                className="form-control"
                type="text"
                name="hospitalName"
                id="hospitalName"
                placeholder="Hospital Name"
                onChange={handleChange}
                value={data.hospitalName}
                required
              />
              <label htmlFor="hospitalName">
                {intakeQs.hospitalName[language] + ":"}
                <span className="text-danger">*</span>
              </label>
            </div>
            {/* Visit Length */}
            <div className="row mb-3">
              <div className="col-12 col-lg-6 mb-lg-0 mb-2">
                <span className="text-start ms-1 mt-1">
                  {intakeQs.visitLength[language] + ":"}
                  <span className="text-danger">*</span>
                </span>
              </div>
              <div className="col text-center">
                <Dropdown onSelect={(val) => handleSelect("visitLength", val)}>
                  <Dropdown.Toggle
                    className="form-control"
                    variant="secondary"
                    id="visitLength-dropdown"
                  >
                    {data.visitLength ? data.visitLength : "Select"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((option) => (
                      <Dropdown.Item key={option} eventKey={option}>
                        {option}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </>
        ) : null}
        <button className="btn btn-success mt-3 form-control">Next</button>
      </form>
    </>
  );
}

export default PbStepOne;
