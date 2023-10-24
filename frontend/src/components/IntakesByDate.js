import React, { useContext, useState, useEffect } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "../common/ProviderContext";
import DatePicker from "./DatePicker";
import { getMidnights, formatTime } from "../intake/commonFuncs";

function IntakesByDate({ generatePdf }) {
  const [intakes, setIntakes] = useState([]);
  const [currDate, setCurrDate] = useState(new Date());
  const { currProvider } = useContext(ProviderContext);

  useEffect(() => {
    const getActivity = async () => {
      const { lastMidnight, nextMidnight } = getMidnights(currDate);
      const res = await SmartnosisApi.getByDate(
        currProvider.id,
        lastMidnight,
        nextMidnight,
        "intakes"
      );
      setIntakes(res.intakes);
    };
    getActivity();
  }, [currProvider, currDate]);

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

  return (
    <div className="card">
      <div className="row my-4">
        <div className="col-3">
        <p className="card-title ms-2 text-center">Intakes</p>
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
      <DatePicker currDate={currDate} setCurrDate={setCurrDate} />
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
  );
}

export default IntakesByDate;
