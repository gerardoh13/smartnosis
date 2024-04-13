import React, { useContext, useState, useEffect } from "react";

import PbStepOne from "./PbStepOne";
import PbStepTwo from "./PbStepTwo";
import PbStepThree from "./PbStepThree";
import PbStepFour from "./PbStepFour";
import PbStepFive from "./PbStepFive";
import PbStepSix from "./PbStepSix";
import PbStepSeven from "./PbStepSeven";
import PbStepEight from "./PbStepEight";
import PbStepNine from "./PbStepNine";
import PbStepTen from "./PbStepTen";
import SmartnosisApi from "../api";
import { useQuery } from "../hooks";
import "../intake/Intake.css";
import { useNavigate } from "react-router-dom";
import ProviderContext from "../common/ProviderContext";
import Grid from "@mui/material/Grid";
// import { deleteNulls } from "../common/commonFuncs";
import DisclaimerModal from "../components/DisclaimerModal";
import LangToggle from "../common/LangToggle";
import { pBintakeQs, PbIntakeOptions, pbHeaders } from "../common/translations";

function PbIntake({ setCurrView }) {
  const INITIAL_STATE = {
    // page 1
    providerId: "",
    firstName: "",
    lastName: "",
    promoter: "",
    physicianName: "",
    // idPid: "",
    dof: "",
    location: "",
    result: "",
    status: "",
    transport: "",
    hospitalName: "",
    visitLength: "",
    // page 2
    concussion: "",
    concussionNum: "",
    alertnessLoss: "",
    alertnessLossRound: "",
    alertnessLossLength: "",
    drugsOrAlcohol: "",
    // page 3
    headache: "",
    headacheExplain: "",
    headachePainScale: "1",
    dizziness: "",
    dizzinessStart: "",
    dizzyLying: "",
    dizzySitting: "",
    dizzyStanding: "",
    lightheaded: "",
    lightHeadedStart: "",
    headSpinning: "",
    headSpinningStart: "",
    // page 4
    forgetfulness: "",
    forgetRecentEvents: "",
    forgetNames: "",
    forgetItems: "",
    moodChanges: "",
    concentrate: "",
    concentrateExplain: "",
    depression: "",
    depressionExplain: "",
    irritable: "",
    // page 5
    ringingEars: "",
    ringingStart: "",
    hearingBothEars: "",
    leftRightEar: "",
    // page 6
    sleeping: "",
    // page 7
    noiseSensitivity: "",
    noiseSensitivityStart: "",
    noiseSensitivityScale: "1",
    // page 8
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
    lightSensitivity: "",
    lightSensitivityStart: "",
    lightSensitivityConstant: "",
    lightSensitivityOnAndOff: "",
    lightSensitivityScale: "1",
    // page 9
    neckPain: "",
    neckPainStart: "",
    neckPainScale: "1",
    lowerBackPain: "",
    lowerBackPainStart: "",
    lowerBackPainScale: "1",
    // page 10
    symptoms: new Set(),
    comments: "",
    additionalPIds: [],
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [step, setStep] = useState(0);
  const [maxDate, setMaxDate] = useState("");
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

  const stepOneComplete = () => {
    let req = [
      formData.firstName,
      formData.lastName,
      formData.promoter,
      formData.physicianName,
      formData.dof,
      formData.location,
      formData.result,
      formData.status,
    ];
    if (formData.status === "Sent to Hospital") {
      req.push(formData.transport);
      req.push(formData.hospitalName);
      req.push(formData.visitLength);
    }
    return req.every(Boolean);
  };

  const stepTwoComplete = () => {
    let req = [
      formData.concussion,
      formData.alertnessLoss,
      formData.drugsOrAlcohol,
    ];
    if (formData.concussion === "Yes") req.push(formData.concussionNum);
    if (formData.alertnessLoss === "Yes") {
      req.push(formData.alertnessLossRound);
      req.push(formData.alertnessLossLength);
    }
    return req.every(Boolean);
  };

  const stepThreeComplete = () => {
    let req = [formData.headache, formData.dizziness];
    if (formData.headache === "Yes") {
      req.push(formData.headacheExplain);
      req.push(formData.headachePainScale);
    }
    if (formData.dizziness === "Yes") {
      req.push(formData.dizzinessStart);
      req.push(formData.dizzyLying);
      req.push(formData.dizzySitting);
      req.push(formData.dizzyStanding);
      req.push(formData.lightheaded);
      req.push(formData.headSpinning);
    }
    if (formData.lightHeadedStart === "Yes")
      req.push(formData.lightHeadedStart);
    if (formData.headSpinning === "Yes") req.push(formData.headSpinningStart);

    return req.every(Boolean);
  };

  const stepFourComplete = () => {
    let req = [
      formData.forgetfulness,
      formData.concentrate,
      formData.irritable,
    ];
    if (formData.forgetfulness === "Yes") {
      req.push(formData.forgetRecentEvents);
      req.push(formData.forgetNames);
      req.push(formData.forgetItems);
      req.push(formData.moodChanges);
    }
    if (formData.concentrate === "Yes") req.push(formData.concentrateExplain);
    if (formData.depression === "Yes") req.push(formData.depressionExplain);

    return req.every(Boolean);
  };

  const stepFiveComplete = () => {
    let req = [formData.ringingEars];
    if (formData.ringingEars === "Yes") {
      req.push(formData.ringingStart);
      req.push(formData.hearingBothEars);
    }
    return req.every(Boolean);
  };

  const stepSixComplete = () => {
    if (formData.sleeping) return true;
  };

  const stepSevenComplete = () => {
    let req = [formData.noiseSensitivity];
    if (formData.noiseSensitivity === "Yes") {
      req.push(formData.noiseSensitivityStart);
      req.push(formData.noiseSensitivityScale);
    }
    return req.every(Boolean);
  };
  const stepEightComplete = () => {
    let req = [
      formData.blurredVision,
      formData.doubleVision,
      formData.lightSensitivity,
    ];
    if (formData.blurredVision === "Yes") {
      req.push(formData.blurredVisionStart);
      req.push(formData.blurredVisionConstant);
      req.push(formData.blurredVisionOnAndOff);
      req.push(formData.blurredVisionOneEye);
      req.push(formData.blurredVisionBothEyes);
    }
    if (formData.doubleVision === "Yes") {
      req.push(formData.doubleVisionStart);
      req.push(formData.doubleVisionConstant);
      req.push(formData.doubleVisionOnAndOff);
    }
    if (formData.lightSensitivity === "Yes") {
      req.push(formData.lightSensitivityStart);
      req.push(formData.lightSensitivityConstant);
      req.push(formData.lightSensitivityOnAndOff);
      req.push(formData.lightSensitivityScale);
    }
    return req.every(Boolean);
  };
  const stepNineComplete = () => {
    let req = [formData.neckPain, formData.lowerBackPain];
    if (formData.neckPain === "Yes") {
      req.push(formData.neckPainStart);
      req.push(formData.neckPainScale);
    }
    if (formData.lowerBackPain === "Yes") {
      req.push(formData.lowerBackPainStart);
      req.push(formData.lowerBackPainScale);
    }
    return req.every(Boolean);
  };

  let currStep;
  switch (step) {
    case 0:
      currStep = (
        <PbStepOne
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          maxDate={maxDate}
          complete={stepOneComplete}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
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
          complete={stepTwoComplete}
          headers={pbHeaders}
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
          maxDate={maxDate}
          complete={stepThreeComplete}
          headers={pbHeaders}
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
          complete={stepFourComplete}
          headers={pbHeaders}
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
          complete={stepFiveComplete}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 5:
      currStep = (
        <PbStepSix
          data={formData}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepSixComplete}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    //
    case 6:
      currStep = (
        <PbStepSeven
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepSevenComplete}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 7:
      currStep = (
        <PbStepEight
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepEightComplete}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 8:
      currStep = (
        <PbStepNine
          data={formData}
          handleChange={handleChange}
          handleSelect={handleSelect}
          changeStep={changeStep}
          complete={stepNineComplete}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          intakeOptions={PbIntakeOptions}
          language={language}
        />
      );
      break;
    case 9:
      currStep = (
        <PbStepTen
          data={formData}
          handleChange={handleChange}
          handleCheckbox={handleCheckbox}
          changeStep={changeStep}
          headers={pbHeaders}
          intakeQs={pBintakeQs}
          language={language}
        />
      );
      break;
    case 10:
      console.log(formData);
      currStep = (
        <div className="text-center">
          <p>Your Assesment has been submitted!</p>
          <p>You can now close this window</p>
        </div>
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
          <div className="float-end">
            <div className="col-12 col-lg-4">
              <LangToggle
                language={language}
                setLanguage={setLanguage}
                langOptions={["spanish"]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-3 bg-light-blue">
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
            <div className="mt-3 text-center">
              <span
                className={`step ${
                  stepOneComplete() || complete ? "finish" : ""
                } ${step === 0 ? "active" : ""}`}
                onClick={() => setStep(0)}
              ></span>
              <span
                className={`step ${
                  stepTwoComplete() || complete ? "finish" : ""
                } ${step === 1 ? "active" : ""}`}
                onClick={() => setStep(1)}
              ></span>
              <span
                className={`step ${
                  stepThreeComplete() || complete ? "finish" : ""
                } ${step === 2 ? "active" : ""}`}
                onClick={() => setStep(2)}
              ></span>
              <span
                className={`step ${
                  stepFourComplete() || complete ? "finish" : ""
                } ${step === 3 ? "active" : ""}`}
                onClick={() => setStep(3)}
              ></span>
              <span
                className={`step ${
                  stepFiveComplete() || complete ? "finish" : ""
                } ${step === 4 ? "active" : ""}`}
                onClick={() => setStep(4)}
              ></span>
              <span
                className={`step ${
                  stepSixComplete() || complete ? "finish" : ""
                } ${step === 5 ? "active" : ""}`}
                onClick={() => setStep(5)}
              ></span>
              <span
                className={`step ${
                  stepSevenComplete() || complete ? "finish" : ""
                } ${step === 6 ? "active" : ""}`}
                onClick={() => setStep(6)}
              ></span>
              <span
                className={`step ${
                  stepEightComplete() || complete ? "finish" : ""
                } ${step === 7 ? "active" : ""}`}
                onClick={() => setStep(7)}
              ></span>
              <span
                className={`step ${
                  stepNineComplete() || complete ? "finish" : ""
                } ${step === 8 ? "active" : ""}`}
                onClick={() => setStep(8)}
              ></span>
              <span
                className={`step ${step === 9 ? "finish" : ""} ${
                  step === 9 ? "active" : ""
                }`}
                onClick={() => setStep(9)}
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
