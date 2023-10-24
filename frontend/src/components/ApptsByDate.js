import React, { useContext, useState, useEffect } from "react";
import SmartnosisApi from "../api";
import ProviderContext from "../common/ProviderContext";
import DatePicker from "./DatePicker";
import { getMidnights, formatTime } from "../intake/commonFuncs";

function ApptsByDate({ generatePdf, setShow, setCurrAppt }) {
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
        "appointments"
      );
      setIntakes(res.intakes);
    };
    getActivity();
  }, [currProvider, currDate]);

  const handleClick = (appt) => {
    setShow(true)
    setCurrAppt(appt)
    console.log(appt);
  };
  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id}>
        <td>
          <span>{`${p.lastName}, ${p.firstName}`}</span>
          <button className="btn btn-light ms-2" onClick={() => handleClick(p)}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </td>
        <td className="align-middle">{formatTime(p.apptAt)}</td>
        {p.complete ? (
          <td>
            <button
              className="btn btn-success"
              onClick={() => generatePdf(p.intakeId)}
            >
              PDF
            </button>
          </td>
        ) : (
          <td className="text-danger align-middle">Incomplete</td>
        )}
      </tr>
    ));
  };

  return (
    <div className="card">
      <div className="row my-4">
        <div className="col-3">
          <p className="card-title ms-2 text-center">Appointments</p>
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
            <th scope="col">Appointment Time</th>
            <th />
          </tr>
        </thead>
        <tbody>{createRows(intakes)}</tbody>
      </table>
    </div>
  );
}

export default ApptsByDate;
