import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import DatePicker from "./DatePicker";
import { formatTime } from "../intake/commonFuncs";

function ApptsByDate({
  generatePdf,
  setShow,
  setCurrAppt,
  currDate,
  setCurrDate,
  getActivity,
  reload,
  setReload
}) {
  const [appts, setAppts] = useState([]);
  const { currProvider } = useContext(ProviderContext);

  useEffect(() => {
    const fetchData = async () => {
      setAppts(await getActivity("appointments"));
      if (reload) setReload(false)
    };
    fetchData();
  }, [currProvider, currDate, getActivity, reload, setReload]);

  const handleClick = (appt) => {
    setShow(true);
    setCurrAppt(appt);
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
      <table className="table table-striped bg-light">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Time</th>
            <th />
          </tr>
        </thead>
        <tbody>{createRows(appts)}</tbody>
      </table>
    </div>
  );
}

export default ApptsByDate;
