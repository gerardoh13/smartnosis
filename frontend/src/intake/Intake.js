import React, { useState, useEffect } from "react";

import StepOne from "./StepOne";
import StepInsurance from "./StepInsurance";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import SmartnosisApi from "../api";
import { useQuery } from "../hooks";
import "./Intake.css";
// import UserContext from "../users/UserContext";
// import { useNavigate } from "react-router-dom";
// format http://localhost:3000/intake?provider=y9fi2jvh189n9j1y2ma7

function Intake() {
  const INITIAL_STATE = {
    providerId: "",
    firstName: "Gerardo",
    lastName: "Huerta",
    middleName: "",
    // feet: "",
    // inches: "0",
    // weight: "",
    dob: "1992-08-13",
    sex: "",
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

  const INITIAL_INSURANCE_STATE = {
    relationship: "",
    firstName: "",
    lastName: "",
    insProvider: "",
    otherInsProvider: "",
    insuranceId: "",
    groupName: "",
    groupNumber: "",
    dob: "",
  };

  const [insuranceData, setInsuranceData] = useState(INITIAL_INSURANCE_STATE);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [maxDate, setMaxDate] = useState("");

  let query = useQuery();
  //   const navigate = useNavigate();

  useEffect(() => {
    let max = new Date().toISOString().slice(0, -14);
    setMaxDate(max);
  }, [setMaxDate]);

  useEffect(() => {
    let queryProvider = query.get("provider");
    if (queryProvider) {
      setFormData((data) => ({
        ...data,
        providerId: queryProvider,
      }));
    }
  }, [query]);

  useEffect(() => {
    if (insuranceData.relationship === "Self") {
      setInsuranceData((data) => ({
        ...data,
        firstName: formData.firstName,
        lastName: formData.lastName,
        dob: formData.dob,
      }));
    } else {
      setInsuranceData((data) => ({
        ...data,
        firstName: "",
        lastName: "",
        dob: "",
      }));
    }
  }, [insuranceData.relationship]);

  const changeStep = (n) => {
    setStep((prev) => prev + n);
  };

  const getSubmittedEpoch = () => {
    let now = new Date();
    now.setMinutes(now.getMinutes());
    now.setMilliseconds(null);
    now.setSeconds(null);
    return now.getTime() / 1000;
  };

  const formatData = () => {
    let dataCopy = { ...formData };
    dataCopy.submittedAt = getSubmittedEpoch();
    dataCopy.symptoms = Array.from(dataCopy.symptoms);
    dataCopy.conditions = Array.from(dataCopy.conditions);
    let dobArr = dataCopy.dob.split("-").map((e) => +e.toString());
    dobArr.push(dobArr.shift());
    dataCopy.dob = dobArr.join("/");
    if (!dataCopy.middleName) delete dataCopy.middleName;
    if (!dataCopy.address2) delete dataCopy.address2;
    return dataCopy;
  };

  const submit = async () => {
    let formattedData = formatData();
    console.log(formattedData);
    let response = await SmartnosisApi.addIntake(formattedData);
    console.log(response);
    setStep(0);
  };

  const handleChange = (e, insurance = false) => {
    const { name, value } = e.target;
    const trimCheck =
      name === "firstName" || name === "lastName" || name === "middleName";
    if (insurance) {
      setInsuranceData((data) => ({
        ...data,
        [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
      }));
    } else {
      setFormData((data) => ({
        ...data,
        [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
      }));
    }
  };

  const handleSelect = (name, value) => {
    setInsuranceData((data) => ({
      ...data,
      [name]: value,
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

  const stepOneComplete = () => {
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

  const stepInsuranceComplete = () => {
    return [
      insuranceData.firstName,
      insuranceData.lastName,
      insuranceData.dob,
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
    case 0.5:
      currStep = (
        <StepInsurance
          data={insuranceData}
          handleChange={handleChange}
          changeStep={changeStep}
          maxDate={maxDate}
          handleSelect={handleSelect}
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

              {formData.insurance === "Yes" ? (
                <span
                  className={`step ${stepInsuranceComplete() ? "finish" : ""} ${
                    step === 0.5 ? "active" : ""
                  }`}
                ></span>
              ) : null}

              <span
                className={`step ${step > 0.5 ? "finish" : ""} ${
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
