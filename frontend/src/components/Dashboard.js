import React, { useContext, useState, useEffect } from "react";
// import SmartnosisApi from "../api";
import Grid from "@mui/material/Grid";
import ScheduleForm from "./ScheduleForm";
import IntakesByDate from "./IntakesByDate";
import ApptsByDate from "./ApptsByDate";

function Dashboard({ tool }) {
  const currView = tool === "Intakes" ? <IntakesByDate/> : <ApptsByDate/>
  return (
    <>
      <Grid item xs={12} md={8} lg={8}>
        {currView}
      </Grid>
      <Grid item xs={12} md={8} lg={4}>
        <ScheduleForm />
      </Grid>
    </>
  );
}

export default Dashboard;
