// import React, { useState, useContext, useEffect } from "react";
import React, { useState } from "react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
// import UserContext from "../users/UserContext";
// import { useNavigate } from "react-router-dom";
import "./Questionaire.css";

function Questionaire({ additionalChild }) {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    feet: "",
    inches: "",
    weight: "",
    dob: "",
  };

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_STATE);
  //   const { registerInfant } = useContext(UserContext);
  //   const [maxDate, setMaxDate] = useState("");
  //   const [minDate, setMinDate] = useState("");
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     let max = new Date().toISOString().slice(0, -14);
  //     let event = new Date();
  //     let twoYearsAgo = parseInt(event.getFullYear()) - 2;
  //     event.setFullYear(twoYearsAgo);
  //     let min = event.toISOString().slice(0, -14);
  //     setMaxDate(max);
  //     setMinDate(min);
  //   }, [setMaxDate, setMinDate]);

  const changeStep = (n) => {
    setStep((prev) => prev + n);
  };

  //   const submit = async () => {
  //     await registerInfant({
  //       firstName: formData.firstName,
  //       gender: formData.firstName,
  //       dob: formData.dob,
  //       publicId: formData.publicId,
  //     });
  //     navigate("/");
  //     console.log(formData);
  //   };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck = name === "firstName";
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
  };

  let currStep;
  switch (step) {
    case 0:
      currStep = (
        <StepOne
          data={formData}
          handleChange={handleChange}
          changeStep={changeStep}
        />
      );
      break;
    case 1:
      currStep = (
        <StepTwo
          data={formData}
          handleChange={handleChange}
          changeStep={changeStep}
        />
      );
      break;
    case 2:
        currStep = (
          <StepThree
            data={formData}
            setFormData={setFormData}
            changeStep={changeStep}
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
                className={`step ${
                  formData.firstName && formData.lastName ? "finish" : ""
                } ${step === 0 ? "active" : ""}`}
              ></span>
              <span
                className={`step ${formData.dob ? "finish" : ""} ${
                  step === 1 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${step === 2 ? "active finish" : ""}`}
              ></span>

              {additionalChild ? null : (
                <span className={`step ${step === 3 ? "active" : ""}`}></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Questionaire;
