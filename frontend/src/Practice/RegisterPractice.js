import React from "react";
import Alerts from "../common/Alerts";

function RegisterPractice({
  handlePhones,
  handleKeydown,
  changeStep,
  data,
  handleChange,
  errors,
  adminRole,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    changeStep(1);
  };

  return (
    <>
      {errors.length ? <Alerts msgs={errors} /> : null}
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="form-floating my-3">
          <input
            className="form-control"
            type="text"
            name="orgName"
            id="orgName"
            value={data.orgName}
            placeholder="orgName"
            required
            onChange={handleChange}
          />
          <label htmlFor="orgName">
            Practice Legal Name: <span className="text-danger">*</span>
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="address1"
            name="address1"
            placeholder="Address 1"
            value={data.address1}
            onChange={handleChange}
            required
          />
          <label htmlFor="address1">
            Address Line 1:<span className="text-danger">*</span>
          </label>
        </div>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="address2"
            name="address2"
            placeholder="Address 2"
            value={data.address2}
            onChange={handleChange}
          />
          <label htmlFor="address2">Address Line 2:</label>
        </div>

        <div className="form-floating mt-3">
          <input
            type="text"
            className="form-control"
            id="city"
            name="city"
            placeholder="City"
            value={data.city}
            onChange={handleChange}
            required
          />
          <label htmlFor="city">
            City:<span className="text-danger">*</span>
          </label>
        </div>

        <div className="row mb-3">
          <div className="form-floating mt-3 col">
            <input
              type="text"
              className="form-control"
              id="state"
              name="state"
              placeholder="State"
              maxLength={2}
              value={data.state}
              onChange={handleChange}
              required
            />
            <label className="ms-2" htmlFor="state">
              State:<span className="text-danger">*</span>
            </label>
          </div>
          <div className="form-floating mt-3 col">
            <input
              type="tel"
              className="form-control"
              id="zip"
              name="zip"
              maxLength={5}
              minLength={5}
              placeholder="Zip Code"
              value={data.zip}
              onChange={handleChange}
              required
            />
            <label className="ms-2" htmlFor="zip">
              Zip Code: <span className="text-danger">*</span>
            </label>
          </div>
        </div>
        <div className="form-floating my-3">
          <input
            className="form-control"
            type="tel"
            maxLength={12}
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="phone"
            id="phone"
            placeholder="phone"
            onChange={handlePhones}
            onKeyDown={handleKeydown}
            value={data.phone}
            required
          />
          <label htmlFor="phone">
            Phone: <span className="text-danger">*</span>
          </label>
        </div>

        <div className="row mb-3">
          <div className="form-floating col">
            <input
              type="number"
              className="form-control"
              id="hcpsCount"
              name="hcpsCount"
              placeholder="hcpsCount"
              min={1}
              maxLength={3}
              value={data.hcpsCount}
              onChange={handleChange}
              required
            />
            <label className="ms-2" htmlFor="hcpsCount">
              Number of HCPs:<span className="text-danger">*</span>
            </label>
          </div>
          <div className="form-floating col">
            <input
              type="number"
              className="form-control"
              id="staffCount"
              name="staffCount"
              maxLength={3}
              min={adminRole === "staff" ? 1 : 0}
              placeholder="staffCount"
              value={data.staffCount}
              onChange={handleChange}
              required
            />
            <label className="ms-2" htmlFor="staffCount">
              Number of Non-HCPs:<span className="text-danger">*</span>
            </label>
          </div>
        </div>
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

export default RegisterPractice;
