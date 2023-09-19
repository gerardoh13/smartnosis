import React, { useContext, useState, useEffect } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "../common/ProviderContext";
import Grid from "@mui/material/Grid";

function PatientsTable() {
  const [intakes, setIntakes] = useState([]);

  const { currProvider } = useContext(ProviderContext);

  useEffect(() => {
    const getActivity = async () => {
      const { lastMidnight, nextMidnight } = getMidnights();
      const res = await SmartnosisApi.getByDate(
        currProvider.id,
        lastMidnight,
        nextMidnight
      );
      setIntakes(res.intakes);
    };
    getActivity();
  }, [currProvider.id]);

  const getMidnights = () => {
    let midnight = new Date();
    midnight.setHours(0, 0, 0, 0);
    let lastMidnight = midnight.getTime() / 1000;
    midnight.setDate(midnight.getDate() + 1);
    let nextMidnight = midnight.getTime() / 1000;
    return { lastMidnight, nextMidnight };
  };

  const generatePdf = async (intakeId) => {
    let res = await SmartnosisApi.generatePDF(currProvider.id, intakeId);
    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };
  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id}>
        <td>{`${p.lastName}, ${p.middleName ? p.middleName[0] + "." : ""} ${
          p.firstName
        }`}</td>
        <td>{p.dob}</td>
        <td>{formatTime(p.submittedAt)}</td>
        <td>
          <button className="btn btn-success" onClick={() => generatePdf(p.id)}>
            PDF
          </button>
        </td>
      </tr>
    ));
  };

  const formatTime = (epoch) => {
    return new Date(epoch * 1000).toLocaleTimeString();
  };

  return (
    <>
      <Grid item xs={12} md={8} lg={8}>
        <div className="card">
          <div className="row my-4">
            <div className="col-3">
              <h5 className="card-title ms-2 text-center">Intakes</h5>
            </div>
            <div className="col-8 m-auto">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Intakes.."
                />
                <button className="btn btn-danger input-group-text">
                  <i className="bi bi-x"></i>
                </button>
              </div>
            </div>
          </div>
          <table className="table table-striped bg-light text-center">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Time Submitted</th>
                <th />
              </tr>
            </thead>
            <tbody>{createRows(intakes)}</tbody>
          </table>
        </div>
      </Grid>
      <Grid item xs={12} md={8} lg={4}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Send Intake Form</h5>
            <div className="row my-3">
              <div className="col-6">Date:</div>
              <div className="col-6">
                <input type="date" />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-6">Time:</div>
              <div className="col-6">
                <input type="time" />
              </div>
            </div>
            <div className="input-group">
              <span className="input-group-text">
                <i class="bi bi-envelope"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Patient email"
              />
              <button className="btn btn-primary input-group-text">
                Send
                <i class="bi bi-send ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}

export default PatientsTable;
