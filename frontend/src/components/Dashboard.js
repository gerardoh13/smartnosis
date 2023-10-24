import React, { useContext, useState } from "react";
import SmartnosisApi from "../api";
import Grid from "@mui/material/Grid";
import ScheduleForm from "./ScheduleForm";
import ApptModal from "./ApptModal";
import IntakesByDate from "./IntakesByDate";
import ApptsByDate from "./ApptsByDate";
import ProviderContext from "../common/ProviderContext";

function Dashboard({ tool }) {
  const INITIAL_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    apptAt: "",
  };
  const { currProvider } = useContext(ProviderContext);
  const [showApptModal, setShowApptModal] = useState(false);
  const [currAppt, setCurrAppt] = useState(INITIAL_STATE);

  const generatePdf = async (intakeId) => {
    let res = await SmartnosisApi.generatePDF(currProvider.id, intakeId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const clearModal = () => {
    setShowApptModal(false)
    setCurrAppt(INITIAL_STATE)
  }
  const currView =
    tool === "Intakes" ? (
      <IntakesByDate generatePdf={generatePdf} />
    ) : (
      <ApptsByDate generatePdf={generatePdf} setShow={setShowApptModal}setCurrAppt={setCurrAppt}/>
    );

  return (
    <>
      <Grid item xs={12} md={8} lg={7}>
        {currView}
      </Grid>
      <Grid item xs={12} md={8} lg={5}>
        <ScheduleForm />
        <ApptModal show={showApptModal} clearModal={clearModal} appt={currAppt}/>
      </Grid>
    </>
  );
}

export default Dashboard;
