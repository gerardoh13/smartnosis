import React, { useState, useEffect } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import SmartnosisApi from "../api";
// import UserContext from "../users/UserContext";
// import { useNavigate } from "react-router-dom";
import "./Intake.css";

function Intake() {
  const INITIAL_STATE = {
    firstName: "Gerardo",
    lastName: "Huerta",
    middleName: "",
    // feet: "",
    // inches: "0",
    // weight: "",
    dob: "1992-08-13",
    address1: "1570 W. 1st St.",
    address2: "Unit 16",
    city: "Santa Ana",
    state: "CA",
    zip: "92703",
    insurance: "",
    phone: "559-797-5961",
    phone2: "",
    symptoms: new Set(),
    conditions: new Set(),
  };

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_STATE);
  //   const { registerInfant } = useContext(UserContext);
  const [maxDate, setMaxDate] = useState("");
  // const [minDate, setMinDate] = useState("");
  //   const navigate = useNavigate();

  useEffect(() => {
    let max = new Date().toISOString().slice(0, -14);
    setMaxDate(max);
  }, [setMaxDate]);

  const changeStep = (n) => {
    setStep((prev) => prev + n);
  };

  const submit = async (data) => {
    let dataCopy = { ...data };
    dataCopy.dateSubmitted = new Date().toLocaleDateString()
    dataCopy.symptoms = Array.from(data.symptoms);
    dataCopy.conditions = Array.from(data.conditions);
    let dobArr = dataCopy.dob.split("-").map((e) => +e.toString())
    dobArr.push(dobArr.shift())
    dataCopy.dob = dobArr.join("/")
    let res = await SmartnosisApi.generatePDF(dataCopy);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setStep(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck =
      name === "firstName" || name === "lastName" || name === "middleName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
  };

  const handleCheckbox = (e) => {
    const { checked, value, name } = e.target;
    let copy = new Set([...formData[name]]);
    if (checked) {
      if (!copy.has(value)) copy.add(value);
    } else {
      if (copy.has(value)) copy.delete(value);
    }
    setFormData((data) => ({
      ...data,
      [name]: copy,
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

  let stepOneComplete = () => {
    return [
      formData.firstName,
      formData.lastName,
      formData.dob,
      formData.sex,
      formData.phone,
      formData.address1,
      formData.city,
      formData.state,
      formData.zip,
      formData.insurance,
    ].every(Boolean);
  };

  let currStep;
  switch (step) {
    case 0:
      currStep = (
        <StepOne
          data={formData}
          handleChange={handleChange}
          changeStep={changeStep}
          maxDate={maxDate}
          handlePhones={handlePhones}
          handleKeydown={handleKeydown}
          complete={stepOneComplete}
        />
      );
      break;
    case 1:
      currStep = (
        <StepTwo
          data={formData}
          handleChange={handleChange}
          changeStep={changeStep}
          handleCheckbox={handleCheckbox}
          setFormData={setFormData}
        />
      );
      break;
    case 2:
      currStep = (
        <StepThree
          data={formData}
          setFormData={setFormData}
          changeStep={changeStep}
          handleCheckbox={handleCheckbox}
          submit={submit}
        />
      );
      break;
    case 3:
      //   currStep = (
      //     <StepThree
      //       data={formData}
      //       setFormData={setFormData}
      //       changeStep={changeStep}
      //     />
      //   );
      <h1>Step 3</h1>;
      break;
    default:
  }

  return (
    <>
      <div className="card my-4 col-lg-6 col-md-5 col-sm-10 col-11">
        <img
          src="smartnosis-logo.jpg"
          className="rounded mx-auto w60 mt-2"
          alt="smartnosis logo"
        />
        <h2 className="my-3 text-center">Patient Intake Form</h2>
      </div>

      <div className="card col-lg-6 col-md-5 col-sm-10 col-11">
        <div className="card-body">
          {currStep}
          <div className="row">
            <div className="mt-2 text-center">
              <span
                className={`step ${stepOneComplete() ? "finish" : ""} ${
                  step === 0 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${step > 0 ? "finish" : ""} ${
                  step === 1 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${step === 2 ? "active finish" : ""}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intake;
