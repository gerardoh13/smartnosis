import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Invitations from "./InviteStaff";
import RegisterAdmin from "./RegisterAdmin";
import RegisterPractice from "./RegisterPractice";
import SmartnosisApi from "../api";

function Register({ registerUser }) {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    npi: "",
    title: "",
    role: "hcp",
    email: "",
    password: "",
    confirmPwd: "",
    //
    orgName: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    hcpsCount: "",
    staffCount: "",
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [hcpsEmails, setHcpsEmails] = useState([]);
  const [staffEmails, setStaffEmails] = useState([]);
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.staffCount && parseInt(formData.staffCount))
      setStaffEmails(Array(parseInt(formData.staffCount)).fill(""));
  }, [formData.staffCount]);

  useEffect(() => {
    if (formData.hcpsCount && parseInt(formData.hcpsCount))
      setHcpsEmails(Array(parseInt(formData.hcpsCount)).fill(""));
  }, [formData.hcpsCount]);

  const changeStep = (n) => {
    setStep((prev) => prev + n);
  };

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

  const handlePhones = (e) => {
    const { value, name } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove all non-numeric characters
    // Format the value with dashes for a US phone number
    const formattedValue = sanitizedValue.replace(
      /^(\d{0,3})(\d{0,3})(\d{0,4})$/,
      (_, p1, p2, p3) => {
        if (p1 && p2) {
          return `${p1}-${p2}-${p3}`;
        } else if (p1) {
          return `${p1}-${p2}`;
        }
        return p1;
      }
    );
    setFormData((data) => ({
      ...data,
      [name]: formattedValue,
    }));
  };

  const handleKeydown = (e) => {
    let value = formData[e.target.name];
    if (e.keyCode !== 8) return;
    if (value[value.length - 1] !== "-") return;
    value = e.target.value.slice(0, -1);
    setFormData((data) => ({
      ...data,
      [e.target.name]: value,
    }));
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
    const practiceData = Object.fromEntries(
      Object.entries(dataCopy).filter(([key]) =>
        [
          "orgName",
          "email",
          "phone",
          "address1",
          "address2",
          "city",
          "state",
          "zip",
          "hcpsCount",
          "staffCount",
        ].includes(key)
      )
    );
    practiceData.hcpsEmails = formatEmailArr(hcpsEmails);
    practiceData.staffEmails = formatEmailArr(staffEmails);

    let userData = Object.fromEntries(
      Object.entries(dataCopy).filter(([key]) =>
        [
          "firstName",
          "lastName",
          "npi",
          "title",
          "role",
          "email",
          "password",
        ].includes(key)
      )
    );
    return [practiceData, userData];
  };

  const formatEmailArr = (arr) => {
    return arr.filter((str) => str.trim() !== "");
  };
  const handleSubmit = async () => {
    let [practiceData, userData] = formatData();
    try {
      let provider = await SmartnosisApi.registerProvider(practiceData);
      userData.providerId = provider.id;
      await registerUser(userData);
      navigate("/");
    } catch (errors) {
      console.log(errors);
    }
  };

  const isValidEmail = (email) => {
    // Define a regular expression for a basic email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Test the email against the regular expression
    return emailRegex.test(email);
  };

  const noEmptyStrs = (arr) => arr.every((str) => str.trim() !== "");

  const stepOneComplete = () => {
    return [
      formData.orgName,
      formData.phone,
      formData.address1,
      formData.city,
      formData.state,
      formData.zip,
      formData.hcpsCount,
      formData.staffCount,
    ].every(Boolean);
  };

  const stepTwoComplete = () => {
    let fieldsArr = [
      formData.firstName,
      formData.lastName,
      formData.role,
      formData.email,
      formData.password,
      formData.confirmPwd,
    ];
    if (formData.role === "hcp") {
      fieldsArr.push(formData.npi);
      return (
        fieldsArr.every(Boolean) &&
        formData.npi.length === 10 &&
        formData.password === formData.confirmPwd
      );
    } else fieldsArr.push(formData.title);
    return (
      fieldsArr.every(Boolean) && formData.password === formData.confirmPwd
    );
  };
  let currStep;
  switch (step) {
    case 0:
      currStep = (
        <RegisterPractice
          handlePhones={handlePhones}
          handleKeydown={handleKeydown}
          handleChange={handleChange}
          changeStep={changeStep}
          data={formData}
          errors={errors}
        />
      );
      break;
    case 1:
      currStep = (
        <RegisterAdmin
          data={formData}
          changeStep={changeStep}
          handleChange={handleChange}
          errors={errors}
          confirmPasswords={confirmPasswords}
        />
      );
      break;
    case 2:
      currStep = (
        <Invitations
          emails={hcpsEmails}
          setEmails={setHcpsEmails}
          changeStep={changeStep}
          step={step}
          adminRole={formData.role}
        />
      );
      break;
    case 3:
      currStep = (
        <Invitations
          emails={staffEmails}
          setEmails={setStaffEmails}
          changeStep={changeStep}
          step={step}
          adminRole={formData.role}
          submit={handleSubmit}
        />
      );
      break;
    default:
  }

  return (
    <Grid item xs={12} md={8}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Get started with Smartnosis</h5>
          {currStep}
          <div className="row">
            <div className="mt-2 text-center">
              <span
                className={`step ${stepOneComplete() ? "finish" : ""} ${
                  step === 0 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${stepTwoComplete() ? "finish" : ""} ${
                  step === 1 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${
                  formData.hcpsCount && noEmptyStrs(hcpsEmails) ? "finish" : ""
                } ${step === 2 ? "active" : ""}`}
              ></span>
              <span
                className={`step ${
                  formData.staffCount && noEmptyStrs(staffEmails)
                    ? "finish"
                    : ""
                } ${step === 3 ? "active" : ""}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

export default Register;
