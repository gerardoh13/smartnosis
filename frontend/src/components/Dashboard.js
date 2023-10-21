import React, { useContext } from "react";
import SmartnosisApi from "../api";
import Grid from "@mui/material/Grid";
import ScheduleForm from "./ScheduleForm";
// import ScheduleForm from "./Temp";

import IntakesByDate from "./IntakesByDate";
import ApptsByDate from "./ApptsByDate";
import ProviderContext from "../common/ProviderContext";

function Dashboard({ tool }) {
  const { currProvider } = useContext(ProviderContext);

  const generatePdf = async (intakeId) => {
    let res = await SmartnosisApi.generatePDF(currProvider.id, intakeId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const currView =
    tool === "Intakes" ? (
      <IntakesByDate generatePdf={generatePdf} />
    ) : (
      <ApptsByDate generatePdf={generatePdf} />
    );

  return (
    <>
      <Grid item xs={12} md={8} lg={7}>
        {currView}
      </Grid>
      <Grid item xs={12} md={8} lg={5}>
        <ScheduleForm />
      </Grid>
    </>
  );
}

export default Dashboard;
