import React, { useContext, useState, useEffect } from "react";

import StepOne from "./StepOne";
import StepInsurance from "./StepInsurance";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import SmartnosisApi from "../api";
import { useQuery } from "../hooks";
import "./Intake.css";
import { useNavigate } from "react-router-dom";
import ProviderContext from "../common/ProviderContext";
import Grid from "@mui/material/Grid";
import { deleteNulls } from "../common/commonFuncs";
import DisclaimerModal from "../components/DisclaimerModal";
import LangToggle from "../common/LangToggle";
import { intakeOptions, intakeQs } from "../common/translations";

function Intake({ setCurrView }) {
  const INITIAL_STATE = {
    providerId: "",
    firstName: "",
    lastName: "",
    middleName: "",
    dob: "",
    sex: "",
    sexOrientation: "",
    ethnicity: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    insurance: "",
    phone: "",
    phone2: "",
    email: "",
  };

  const INITIAL_INSURANCE_STATE = {
    insRelationship: "",
    insFirstName: "",
    insLastName: "",
    insDob: "",
    insProvider: "",
    insOtherProvider: "",
    insuranceId: "",
    insGroupName: "",
    insGroupNumber: "",
    insFrontPId: "",
    insBackPId: "",
  };

  const INITIAL_MED_HISTORY = {
    tobaccoUse: "",
    cigsPerDay: "",
    alcoholUse: "",
    drugUse: "",
    otherDrugUse: "",
    symptoms: new Set(),
    conditions: new Set(),
    motherHistory: new Set(),
    fatherHistory: new Set(),
    grandparentsHistory: new Set(),
    siblingHistory: new Set(),
    comments: "",
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [insuranceData, setInsuranceData] = useState(INITIAL_INSURANCE_STATE);
  const [medHistory, setMedHistory] = useState(INITIAL_MED_HISTORY);
  const [step, setStep] = useState(0);
  const [maxDate, setMaxDate] = useState("");
  const [apptAt, setApptAt] = useState("");
  const [providerName, setProviderName] = useState("");
  const [complete, setComplete] = useState(false);
  const [apptCancelled, setApptCancelled] = useState(false);
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
      if (typeof appt === "string") {
        setApptCancelled(true);
        return;
      }
      setApptAt(appt.apptAt);
      setProviderName(appt.providerName);
      setComplete(appt.complete);
      setFormData((data) => ({
        ...data,
        firstName: appt.firstName,
        lastName: appt.lastName,
        phone: appt.phone
          ? `${appt.phone.slice(0, 3)}-${appt.phone.slice(
              3,
              6
            )}-${appt.phone.slice(6)}`
          : "",
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
  }, [
    insuranceData.insRelationship,
    formData.firstName,
    formData.lastName,
    formData.dob,
  ]);

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

  const formatInsData = () => {
    let insDataCopy = { ...insuranceData };
    insDataCopy.insDob = formatDob(insDataCopy.insDob);
    if (insDataCopy.insProvider === "Other") {
      insDataCopy.insProvider = insDataCopy.insOtherProvider;
      delete insDataCopy.insOtherProvider;
    }
    return insDataCopy;
  };

  const formatMedHistory = () => {
    let medHistoryCopy = { ...medHistory };
    medHistoryCopy.symptoms = Array.from(medHistoryCopy.symptoms);
    medHistoryCopy.conditions = Array.from(medHistoryCopy.conditions);
    medHistoryCopy.motherHistory = Array.from(medHistoryCopy.motherHistory);
    medHistoryCopy.fatherHistory = Array.from(medHistoryCopy.fatherHistory);
    medHistoryCopy.grandparentsHistory = Array.from(
      medHistoryCopy.grandparentsHistory
    );
    medHistoryCopy.siblingHistory = Array.from(medHistoryCopy.siblingHistory);

    if (medHistoryCopy.drugUse === "Other")
      medHistoryCopy.drugUse = medHistoryCopy.otherDrugUse;
    return medHistoryCopy;
  };
  const formatData = () => {
    let dataCopy = { ...formData };
    dataCopy.submittedAt = getSubmittedEpoch();
    dataCopy.dob = formatDob(dataCopy.dob);
    dataCopy = { ...dataCopy, ...formatMedHistory(dataCopy) };
    if (dataCopy.insurance === "Yes")
      dataCopy = { ...dataCopy, ...formatInsData(dataCopy) };
    deleteNulls(dataCopy);
    if (query.get("appointment")) dataCopy.apptId = query.get("appointment");
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
    console.log(formattedData);
    setFormData(INITIAL_STATE);
    setMedHistory(INITIAL_MED_HISTORY);
    setInsuranceData(INITIAL_INSURANCE_STATE);
    if (currUser) setCurrView("Intakes");
    else changeStep(1);
  };

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    const trimCheck =
      name === "firstName" || name === "lastName" || name === "middleName";
    //
    const func =
      type === "insurance"
        ? setInsuranceData
        : type === "medHistory"
        ? setMedHistory
        : setFormData;
    func((data) => ({
      ...data,
      [name]: trimCheck ? value.trimStart().replace(/\s+/g, " ") : value,
    }));
  };

  const handleSelect = (name, value, type) => {
    const func =
      type === "medHistory"
        ? setMedHistory
        : type === "formData"
        ? setFormData
        : setInsuranceData;
    func((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleCheckbox = (e) => {
    const { checked, value, name } = e.target;
    let copy = new Set([...medHistory[name]]);
    if (checked) {
      if (!copy.has(value)) copy.add(value);
    } else {
      if (copy.has(value)) copy.delete(value);
    }
    setMedHistory((data) => ({
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
      formData.email,
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
      insuranceData.insProvider,
    ].every(Boolean);
  };

  const stepFourComplete = () => {
    let fields = [
      medHistory.alcoholUse,
      medHistory.drugUse,
      medHistory.tobaccoUse,
    ];
    if (medHistory.drugUse === "Yes") fields.push(medHistory.otherDrugUse);
    if (medHistory.tobaccoUse === "Cigarettes")
      fields.push(medHistory.cigsPerDay);
    return fields.every(Boolean);
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
          handleSelect={handleSelect}
          complete={stepOneComplete}
          intakeQs={intakeQs}
          intakeOptions={intakeOptions}
          language={language}
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
          intakeQs={intakeQs}
          language={language}
        />
      );
      break;
    case 1:
      currStep = (
        <StepTwo
          data={medHistory}
          handleChange={handleChange}
          changeStep={changeStep}
          handleCheckbox={handleCheckbox}
          setFormData={setFormData}
          hasInsurnace={formData.insurance === "Yes"}
          intakeQs={intakeQs}
          language={language}
        />
      );
      break;
    case 2:
      currStep = (
        <StepThree
          data={medHistory}
          setFormData={setFormData}
          changeStep={changeStep}
          handleCheckbox={handleCheckbox}
          intakeQs={intakeQs}
          language={language}
        />
      );
      break;
    case 3:
      currStep = (
        <StepFour
          data={medHistory}
          handleChange={handleChange}
          changeStep={changeStep}
          complete={stepFourComplete}
          handleSelect={handleSelect}
          handleCheckbox={handleCheckbox}
          submit={submit}
          intakeQs={intakeQs}
          intakeOptions={intakeOptions}
          language={language}
        />
      );
      break;
    case 4:
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
            src="BW-Smartnosis-Logo.png"
            className="rounded mx-auto d-block w60 mt-2"
            alt="smartnosis logo"
          />
          <h2 className="my-3 text-center">Patient Intake Form</h2>

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
          ) : apptCancelled ? (
            <div className="text-center">
              <p>This link has expired.</p>
              <p>Please contact your health care provider.</p>
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
                onClick={() => setStep(0)}
              ></span>
              {formData.insurance === "Yes" ? (
                <span
                  className={`step ${stepInsuranceComplete() ? "finish" : ""} ${
                    step === 0.5 ? "active" : ""
                  }`}
                  onClick={() => setStep(0.5)}
                ></span>
              ) : null}
              <span
                className={`step ${step > 0.5 || complete ? "finish" : ""} ${
                  step === 1 ? "active" : ""
                }`}
                onClick={() => setStep(1)}
              ></span>
              <span
                className={`step ${step > 1 || complete ? "finish" : ""} ${
                  step === 2 ? "active" : ""
                }`}
                onClick={() => setStep(2)}
              ></span>
              <span
                className={`step ${
                  stepFourComplete() || complete ? "finish" : ""
                } ${step === 3 ? "active" : ""}`}
                onClick={() => setStep(3)}
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

export default Intake;
