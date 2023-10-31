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
  setReload,
}) {
  const [appts, setAppts] = useState([]);
  const { currProvider } = useContext(ProviderContext);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching appts");
      setAppts(await getActivity("appointments"));
      if (reload) setReload(false);
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
            <h3 className="card-title ms-3 my-3">Appointments</h3>
      <DatePicker currDate={currDate} setCurrDate={setCurrDate} />
      <hr />
      {appts.length ? (
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
      ) : (
        <p className="text-center">Scheduled appointments will appear here</p>
      )}
    </div>
  );
}

export default React.memo(ApptsByDate, (prevProps, nextProps) => {
  return (
    prevProps.setCurrAppt === nextProps.setCurrAppt &&
    prevProps.reload === nextProps.reload &&
    prevProps.currDate === nextProps.currDate
  );
});
