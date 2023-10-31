import React, { useContext, useState } from "react";
import SmartnosisApi from "../api";
import Grid from "@mui/material/Grid";
import ScheduleForm from "./ScheduleForm";
import ApptModal from "./ApptModal";
import IntakesByDate from "./IntakesByDate";
import ApptsByDate from "./ApptsByDate";
import ProviderContext from "../common/ProviderContext";
import { getMidnights } from "../intake/commonFuncs";
import SearchBar from "../common/SearchBar";

function Dashboard({ currView }) {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apptAt: "",
  };
  const { currProvider } = useContext(ProviderContext);
  const [showApptModal, setShowModal] = useState(false);
  const [currAppt, setCurrAppt] = useState(INITIAL_STATE);
  const [currDate, setCurrDate] = useState(new Date());
  const [reload, setReload] = useState(false);

  const generatePdf = async (intakeId) => {
    let res = await SmartnosisApi.generatePDF(currProvider.id, intakeId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const getActivity = async (type) => {
    const { lastMidnight, nextMidnight } = getMidnights(currDate);
    const res = await SmartnosisApi.getByDate(
      currProvider.id,
      lastMidnight,
      nextMidnight,
      type
    );
    return res.intakes;
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
    ) : (
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
    );

  return (
    <>
      <Grid item xs={12} md={8} lg={7}>
        <SearchBar />
        {featured}
      </Grid>
      <Grid item xs={12} md={8} lg={5}>
        <ScheduleForm currDate={currDate} setReload={setReload} />
        <ApptModal
          show={showApptModal}
          clearModal={clearModal}
          appt={currAppt}
          provider={currProvider}
          currDate={currDate}
          setReload={setReload}
        />
      </Grid>
    </>
  );
}

export default Dashboard;
