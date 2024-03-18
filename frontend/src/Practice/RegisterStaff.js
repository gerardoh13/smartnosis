import React from "react";

function RegisterStaff({ data, handleChange }) {
  return (
    <>
      <div className="form-floating my-3">
        <input
          className="form-control"
          type="text"
          name="firstName"
          id="firstName"
          value={data.firstName}
          placeholder="firstName"
          required
          onChange={handleChange}
        />
        <label htmlFor="firstName">
          First Name: <span className="text-danger">*</span>
        </label>
      </div>
      <div className="form-floating my-3">
        <input
          className="form-control"
          type="text"
          name="lastName"
          id="lastName"
          value={data.lastName}
          placeholder="lastName"
          required
          onChange={handleChange}
        />
        <label htmlFor="lastName">
          Last Name: <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="text"
          name="title"
          id="title"
          value={data.title}
          placeholder="title"
          required
          onChange={handleChange}
        />
        <label htmlFor="title">
          Role/Title: <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating my-3">
        <input
          className="form-control"
          type="email"
          name="email"
          id="email"
          value={data.email}
          placeholder="email"
          required
          minLength="6"
          onChange={handleChange}
          autoComplete="username"
        />
        <label htmlFor="email">
          Email: <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="password"
          name="password"
          id="password"
          value={data.password}
          placeholder="password"
          autoComplete="current-password"
          required
          minLength="5"
          onChange={handleChange}
        />
        <label htmlFor="password">
          Password: <span className="text-danger">*</span>
        </label>
      </div>

      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="password"
          name="confirmPwd"
          id="confirmPwd"
          value={data.confirmPwd}
          placeholder="confirm password"
          autoComplete="confirm-password"
          required
          minLength="5"
          onChange={handleChange}
        />
        <label htmlFor="confirmPwd">
          Confirm Password: <span className="text-danger">*</span>
        </label>
      </div>
    </>
  );
}

export default RegisterStaff;
