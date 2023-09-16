import React, { useContext, useState, useEffect } from "react";

import StepOne from "./StepOne";
import StepInsurance from "./StepInsurance";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import SmartnosisApi from "../api";
import { useQuery } from "../hooks";
import "./Intake.css";
import { useNavigate } from "react-router-dom";
import ProviderContext from "../common/ProviderContext";
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
    dob: "",
    sex: "Male",
    address1: "1570 W. 1st St.",
    address2: "Unit 16",
    city: "Santa Ana",
    state: "CA",
    zip: "92703",
    insurance: "Yes",
    phone: "559-797-5961",
    phone2: "",
    symptoms: new Set(),
    conditions: new Set(),
  };

  const INITIAL_INSURANCE_STATE = {
    insRelationship: "",
    insFirstName: "",
    insLastName: "",
    insDob: "",
    insProvider: "",
    insOtherInsProvider: "",
    insuranceId: "",
    insGroupName: "",
    insGroupNumber: "",
    insFrontPId: "",
    insBackPId: ""
  };

  const [insuranceData, setInsuranceData] = useState(INITIAL_INSURANCE_STATE);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [maxDate, setMaxDate] = useState("");
  const navigate = useNavigate();
  let query = useQuery();
  const { currProvider } = useContext(ProviderContext);

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
    if (insuranceData.insRelationship === "Self") {
      setInsuranceData((data) => ({
        ...data,
        insFirstName: formData.firstName,
        insLastName: formData.lastName,
        insDob: formData.dob,
      }));
    } else {
      setInsuranceData((data) => ({
        ...data,
        insFirstName: "",
        insLastName: "",
        insDob: "",
      }));
    }
  }, [insuranceData.insRelationship]);

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
    dataCopy.dob = formatDob(dataCopy.dob);
    if (dataCopy.insurance === "Yes") {
      let insDataCopy = { ...insuranceData };
      insDataCopy.insDob = formatDob(insDataCopy.insDob);
      if (insDataCopy.insProvider === "Other") {
        insDataCopy.insProvider = insDataCopy.insOtherInsProvider
        delete insDataCopy.insOtherInsProvider
       } 
      dataCopy = { ...dataCopy, ...insDataCopy };
    }
    for (let key in dataCopy) {
      // if (key === "email") dataCopy[key] = dataCopy[key].toLowerCase();
      if (!dataCopy[key]) delete dataCopy[key];
      // else dataCopy[key] = dataCopy[key].trimEnd();
    }
    return dataCopy;
  };

  const formatDob = (dob) => {
    let dobArr = dob.split("-").map((e) => +e.toString());
    dobArr.push(dobArr.shift());
    return dobArr.join("/");
  };

  const submit = async () => {
    let formattedData = formatData();
    await SmartnosisApi.addIntake(formattedData);
    if (currProvider) navigate("/");
    else changeStep(1);
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
      insuranceData.insFirstName,
      insuranceData.insLastName,
      insuranceData.insDob,
      insuranceData.insProvider
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
          setData={setInsuranceData}
          handleChange={handleChange}
          changeStep={changeStep}
          maxDate={maxDate}
          handleSelect={handleSelect}
          complete={stepInsuranceComplete}
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
      currStep = (
        <>
          <p className="text-center">Your intake form has been submitted!</p>
          <p className="text-center">You can now close this tab</p>
        </>
      );
      <h1>Step 3</h1>;
      break;
    default:
  }

  return (
    <>
      {/* <div className="card my-4 col-lg-6 col-md-8 col-sm-10 col-11"> */}
      <div className="card">
        <img
          src="smartnosis-logo.jpg"
          className="rounded mx-auto w60 mt-2"
          alt="smartnosis logo"
        />
        <h2 className="my-3 text-center">Patient Intake Form</h2>
      </div>

      {/* <div className="card col-lg-6 col-md-8 col-sm-10 col-11"> */}
      <div className="card mt-3">
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
                className={`step ${step > 1 ? "finish" : ""} ${
                  step === 2 ? "active" : ""
                }`}
              ></span>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );
}

export default Intake;
