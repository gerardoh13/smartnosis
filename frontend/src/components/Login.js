import React, { useState } from "react";
import Alerts from "../common/Alerts";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

function Login({ login }) {
  const INITIAL_STATE = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let data = { ...formData };
    data.email = data.email.toLowerCase();
    let response = await login(formData);
    if (response.valid) {
      setFormData(INITIAL_STATE);
    } else setErrors(response.errors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value.trim(),
    }));
  };

  return (
    <Grid item xs={12} md={8} lg={6}>
      <div className="card">
        <img
          src="smartnosis-logo.jpg"
          className="rounded mx-auto w60 mt-2"
          alt="smartnosis logo"
        />
        <div className="card-body">
          <h5 className="card-title">Welcome Back!</h5>
          {errors.length ? <Alerts msgs={errors} /> : null}
          <form onSubmit={handleSubmit}>
            <div className="form-floating my-4">
              <input
                className="form-control"
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="email"
                required
                autoComplete="email"
                onChange={handleChange}
              />
              <label htmlFor="email">Email:</label>
            </div>
            <div className="form-floating mb-4">
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="password"
                required
                autoComplete="current-password"
                onChange={handleChange}
              />
              <label htmlFor="password">Password:</label>
            </div>
            <button className="btn btn-primary form-control mb-3">
              Submit
            </button>
          </form>
          <p className="text-center mt-2">
            Forgot password?
            <span className="ms-1">
              <Link to="/reset">Reset password</Link>
            </span>
          </p>
          <p className="text-center mt-2">
            New to Smartnosis?
            <span className="ms-1">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </Grid>
  );
}

export default Login;
