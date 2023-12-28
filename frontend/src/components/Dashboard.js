import React, { useContext, useState } from "react";
import SmartnosisApi from "../api";
import Grid from "@mui/material/Grid";
import ScheduleForm from "./ScheduleForm";
import ApptModal from "./ApptModal";
import IntakesByDate from "./IntakesByDate";
import ApptsByDate from "./ApptsByDate";
import AdminDash from "./AdminDash";
import ProviderContext from "../common/ProviderContext";
import { getMidnights } from "../common/commonFuncs";
import SearchBar from "../common/SearchBar";
import Intake from "../intake/Intake";
import Results from "./Results";
import PdfModal from "./PdfModal";
import PDF from "./Pdf";
import { pdf } from "@react-pdf/renderer";

function Dashboard({ currView, setCurrView }) {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apptAt: "",
  };
  const { currUser, isXsScreen } = useContext(ProviderContext);
  const [showApptModal, setShowModal] = useState(false);
  const [currAppt, setCurrAppt] = useState(INITIAL_STATE);
  const [currDate, setCurrDate] = useState(new Date());
  const [reload, setReload] = useState(false);
  const [searchRes, setSearchRes] = useState({});
  const [query, setQuery] = useState("");
  const [lastView, setLastView] = useState("");
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [intakeData, setIntakeData] = useState("");

  const generatePdf = async (intakeId) => {
    let res = await SmartnosisApi.getIntake(currUser.providerId, intakeId);
    if (isXsScreen) {
      const MyDoc = <PDF intake={res} />;
      const blob = await pdf(MyDoc).toBlob();
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    } else {
      setIntakeData(res);
      setShowPdfModal(true);
    }
  };

  const dismissPdfModal = () => {
    setShowPdfModal(false);
    setIntakeData(null);
  };

  const getActivity = async (type) => {
    const { lastMidnight, nextMidnight } = getMidnights(currDate);
    const res = await SmartnosisApi.getByDate(
      currUser.providerId,
      lastMidnight,
      nextMidnight,
      type
    );
    return res.data;
  };

  const clearModal = () => {
    setShowModal(false);
    setCurrAppt(INITIAL_STATE);
  };
  const featured =
    currView === "Intakes" ? (
      <IntakesByDate
        generatePdf={generatePdf}
        getActivity={getActivity}
        currDate={currDate}
        setCurrDate={setCurrDate}
      />
    ) : currView === "Appts" ? (
      <ApptsByDate
        generatePdf={generatePdf}
        getActivity={getActivity}
        setShow={setShowModal}
        setCurrAppt={setCurrAppt}
        currDate={currDate}
        setCurrDate={setCurrDate}
        setReload={setReload}
        reload={reload}
      />
    ) : currView === "Results" ? (
      <Results
        searchRes={searchRes}
        generatePdf={generatePdf}
        setShow={setShowModal}
        setCurrAppt={setCurrAppt}
        setCurrView={setCurrView}
        setQuery={setQuery}
        lastView={lastView}
      />
    ) : currView === "Admin" ? (
      <AdminDash/>
    ) : null;

  return (
    <>
      <PdfModal
        show={showPdfModal}
        intake={intakeData}
        dismiss={dismissPdfModal}
      />
      {currView === "Form" ? (
        <Intake setCurrView={setCurrView} />
      ) : (
        <>
          <Grid item xs={12} md={8} lg={7}>
            <SearchBar
              setCurrView={setCurrView}
              setSearchRes={setSearchRes}
              query={query}
              setQuery={setQuery}
              setLastView={setLastView}
              currView={currView}
            />
            {featured}
          </Grid>
          <Grid item xs={12} md={8} lg={5}>
            <ScheduleForm currDate={currDate} setReload={setReload} />
            <ApptModal
              show={showApptModal}
              clearModal={clearModal}
              appt={currAppt}
              provider={currUser}
              currDate={currDate}
              setReload={setReload}
            />
          </Grid>
        </>
      )}
    </>
  );
}

export default Dashboard;
