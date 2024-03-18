import React, { useState, useEffect } from "react";
import RegisterHcp from "./RegisterHcp";
import RegisterStaff from "./RegisterStaff";
import Alerts from "../common/Alerts";
import Grid from "@mui/material/Grid";
import { decodeToken } from "react-jwt";
import { useQuery } from "../hooks";
import { useNavigate } from "react-router-dom";

function RegisterNewUser({ registerUser }) {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    npi: "",
    title: "",
    role: "",
    email: "",
    password: "",
    confirmPwd: "",
    providerId: ""
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState([]);

  let query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    let queryToken = query.get("token");
    if (queryToken) {
      let { email, role, providerId } = decodeToken(queryToken);
      setFormData((data) => ({
        ...data,
        email: email,
        role: role,
        providerId: providerId
      }));
    }
  }, [query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck = name === "firstName" || name === "lastName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
  };

  const confirmPasswords = () => {
    if (formData.password !== formData.confirmPwd) {
      setErrors(["Passwords do not match"]);
      return false;
    } else {
      setErrors([]);
      return true;
    }
  };

  const formatData = () => {
    let dataCopy = { ...formData };
    for (let key in dataCopy) {
      if (key === "email") {
        dataCopy[key] = dataCopy[key].toLowerCase();
      } else dataCopy[key] = dataCopy[key].trimEnd();
    }
    if (dataCopy.role === "hcp") delete dataCopy.title;
    else delete dataCopy.npi;
    return dataCopy;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmPasswords()) return;
    let userData = formatData();
    console.log(userData);
    try {
      await registerUser(userData);
      navigate("/");
    } catch (error) {
      console.log(errors);
    }
  };

  const adminForm =
    formData.role === "hcp" ? (
      <RegisterHcp data={formData} handleChange={handleChange} />
    ) : (
      <RegisterStaff data={formData} handleChange={handleChange} />
    );
  return (
    <Grid item xs={12} md={7}>
      {errors.length ? <Alerts msgs={errors} /> : null}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Get started with Smartnosis</h5>
          <form onSubmit={handleSubmit}>
            {adminForm}
            <button className="btn btn-primary form-control">Next</button>
          </form>
        </div>
      </div>
    </Grid>
  );
}

export default RegisterNewUser;
