import React, { useContext, useState, useEffect } from "react";

import PbStepOne from "./PbStepOne";
import PbStepTwo from "./PbStepTwo";
import PbStepThree from "./PbStepThree";
import PbStepFour from "./PbStepFour";
import PbStepFive from "./PbStepFive";
import SmartnosisApi from "../api";
import { useQuery } from "../hooks";
import "../intake/Intake.css";
import { useNavigate } from "react-router-dom";
import ProviderContext from "../common/ProviderContext";
import Grid from "@mui/material/Grid";
// import { deleteNulls } from "../common/commonFuncs";
import DisclaimerModal from "../components/DisclaimerModal";
import LangToggle from "../common/LangToggle";
import { pBintakeQs, PbIntakeOptions } from "../common/translations";

function PbIntake({ setCurrView }) {
  const INITIAL_STATE = {
    providerId: "",
    firstName: "",
    lastName: "",
    promoter: "",
    physicianName: "",
    idPid: "",
    dof: "",
    location: "",
    result: "",
    status: "",
    transport: "",
    hospitalName: "",
    visitLength: "",
    concussion: "",
    concussionNum: "",
    alertnessLoss: "",
    alertnessLossRound: "",
    alertnessLossLength: "",
    headache: "",
    headacheExplain: "",
    headachePain: "",
    dizziness: "",
    dizzinessStart: "",
    spinning: "",
    lightHead: "",
    unsteady: "",
    dizzinessComeAndGo: "",
    dizzyChangeInVission: "",
    forgetfulness: "",
    forgetRecentEvents: "",
    forgetNames: "",
    forgetItems: "",
    moodChanges: "",
    //-------------------------------------
    sleep: "",
    //-------------------------------------
    concentrate: "",
    concentrateExplain: "",
    depression: "",
    depressionExplain: "",
    irritable: "",
    ringingEars: "",
    ringingStart: "",
    buzzing: "",
    ringing: "",
    whistling: "",
    hissing: "",
    ringingConstant: "",
    ringingBothEars: "",
    sleeping: "",
    noiseSensitivity: "",
    noiseSensitivityStart: "",
    noiseSensitivityTrigger: "",
    noiseSensitivityDizziness: "",
    noiseSensitivityPain: "",
    noiseSensitivityScale: "",

    blurredVision: "",
    blurredVisionStart: "",
    blurredVisionConstant: "",
    blurredVisionOnAndOff: "",
    blurredVisionOneEye: "",
    blurredVisionBothEyes: "",

    doubleVision: "",
    doubleVisionStart: "",
    doubleVisionConstant: "",
    doubleVisionOnAndOff: "",
    doubleVisionOneEye: "",
    doubleVisionBothEyes: "",

    lightSensitivity: "",
    lightSensitivityStart: "",
    lightSensitivityConstant: "",
    lightSensitivityOnAndOff: "",
    lightSensitivityTrigger: "",
    lightSensitivityScale: "",

    symptoms: new Set(),
    comments: "",
    additionalPId: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [step, setStep] = useState(4);
  const [maxDate, setMaxDate] = useState("");
  const [apptAt, setApptAt] = useState("");
  const [providerName, setProviderName] = useState("");
  const [complete, setComplete] = useState(false);
  const [agreeDisclaimer, setAgreeDisclaimer] = useState(false);
  const [language, setLanguage] = useState("english");

  const navigate = useNavigate();
  let query = useQuery();
  const { currUser } = useContext(ProviderContext);

  useEffect(() => {
    let queryProvider = query.get("provider");
    let queryAppt = query.get("appointment");
    if (!queryProvider && !currUser) navigate("/404");
    if (queryProvider && currUser) navigate("/");
    if (!queryProvider && currUser) setAgreeDisclaimer(true);

    let max = new Date().toISOString().slice(0, -14);
    setMaxDate(max);
    async function getAppt() {
      let appt = await SmartnosisApi.getAppt(queryProvider, queryAppt);
      setApptAt(appt.apptAt);
      setProviderName(appt.providerName);
      setComplete(appt.complete);
      setFormData((data) => ({
        ...data,
        firstName: appt.firstName,
        lastName: appt.lastName,
      }));
    }
    setFormData((data) => ({
      ...data,
      providerId: currUser ? currUser.providerId : queryProvider,
    }));

    if (queryAppt) {
      getAppt();
    }
  }, [query, currUser, navigate, setMaxDate]);

  const changeStep = (n) => {
    setStep((prev) => prev + n);
  };

  // const getSubmittedEpoch = () => {
  //   let now = new Date();
  //   now.setMinutes(now.getMinutes());
  //   now.setMilliseconds(null);
  //   now.setSeconds(null);
  //   return now.getTime() / 1000;
  // };

  // const formatData = () => {
  //   let dataCopy = { ...formData };
  //   dataCopy.submittedAt = getSubmittedEpoch();
  //   deleteNulls(dataCopy);
  //   //
  //   delete dataCopy.tobaccoUse;
  //   delete dataCopy.alcoholUse;
  //   delete dataCopy.drugUse;
  //   //
  //   if (query.get("appointment")) dataCopy.apptId = query.get("appointment");
  //   return dataCopy;
  // };

  // const submit = async () => {
  //   let formattedData = formatData();
  //   console.log(formattedData);
  //   // await SmartnosisApi.addIntake(formattedData);
  //   setFormData(INITIAL_STATE);
  //   if (currUser) setCurrView("Intakes");
  //   else changeStep(1);
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimCheck =
      name === "firstName" || name === "lastName" || name === "middleName";
    //
    setFormData((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
  };

  const handleSelect = (name, value) => {
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // const handleCheckbox = (e) => {
  //   const { checked, value, name } = e.target;
  //   let copy = new Set([...formData[name]]);
  //   if (checked) {
  //     if (!copy.has(value)) copy.add(value);
  //   } else {
  //     if (copy.has(value)) copy.delete(value);
  //   }
  //   setFormData((data) => ({
  //     ...data,
  //     [name]: copy,
  //   }));
  // };

  const stepOneComplete = () => {
    return [
      formData.firstName,
      formData.lastName,
      formData.dob,
      formData.sex,
      formData.email,
      formData.phone,
      formData.address1,
      formData.city,
      formData.state,
      formData.zip,
      formData.insurance,
    ].every(Boolean);
  };

  const stepFourComplete = () => {
    return false;

    // let fields = [
    //   medHistory.alcoholUse,
    //   medHistory.drugUse,
    //   medHistory.tobaccoUse,
    // ];
    // if (medHistory.drugUse === "Other") fields.push(medHistory.otherDrugUse);
    // return fields.every(Boolean);
  };

  let currStep;
  switch (step) {
    case 0:
      currStep = (
        <PbStepOne
          data={formData}
          handleChange={handleChange}
          changeStep={changeStep}
          maxDate={maxDate}
          complete={stepOneComplete}
          intakeQs={pBintakeQs}
          language={language}
        />
      );
      break;
    case 1:
      currStep = (
        <PbStepTwo
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepOneComplete}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 2:
      currStep = (
        <PbStepThree
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepOneComplete}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 3:
      currStep = (
        <PbStepFour
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepOneComplete}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 4:
      currStep = (
        <PbStepFive
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepOneComplete}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 5:
      currStep = (
        <>
          <div className="text-center">
            <p>Your intake form has been submitted!</p>
            <p>You can now close this window</p>
          </div>
        </>
      );
      break;
    default:
  }

  const content = (
    <>
      <div className="card">
        <div className="card-body">
          <img
            src="smartnosis-logo.jpg"
            className="rounded mx-auto d-block w60 mt-2"
            alt="smartnosis logo"
          />
          <h2 className="my-3 text-center">Post-Bout Assesment</h2>

          {apptAt ? (
            <>
              <hr />
              <p className="text-center">
                <span>Appointment on </span>
                <span>
                  {new Date(apptAt * 1000).toLocaleDateString()} {" at "}
                </span>
                <span>{new Date(apptAt * 1000).toLocaleTimeString()}</span>
                <span>
                  {" with "}
                  {providerName}
                </span>
              </p>
            </>
          ) : null}
          <div className="float-end">
            <div className="col-12 col-lg-4">
              <button
                className="btn btn-primary"
                onClick={() => console.log(formData)}
              >
                Console
              </button>
              <LangToggle
                language={language}
                setLanguage={setLanguage}
                langOptions={["spanish"]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-3">
        <div className="card-body">
          {complete ? (
            <div className="text-center">
              <p>Your intake form has already been submitted!</p>
              <p>
                If you need to make changes, contact your health care provider.
              </p>
            </div>
          ) : (
            currStep
          )}
          <div className="row">
            <div className="mt-2 text-center">
              <span
                className={`step ${
                  stepOneComplete() || complete ? "finish" : ""
                } ${step === 0 ? "active" : ""}`}
              ></span>
              <span
                className={`step ${step > 0.5 || complete ? "finish" : ""} ${
                  step === 1 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${step > 1 || complete ? "finish" : ""} ${
                  step === 2 ? "active" : ""
                }`}
              ></span>
              <span
                className={`step ${
                  stepFourComplete() || complete ? "finish" : ""
                } ${step === 3 ? "active" : ""}`}
              ></span>
            </div>
          </div>
        </div>
      </div>
      <br />
    </>
  );

  return (
    <Grid item xs={12} md={8} lg={10}>
      <DisclaimerModal
        show={!agreeDisclaimer}
        setAgreeDisclaimer={setAgreeDisclaimer}
      />
      {agreeDisclaimer ? content : null}
    </Grid>
  );
}

export default PbIntake;
