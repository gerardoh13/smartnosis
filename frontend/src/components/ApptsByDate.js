import React, { useContext, useState, useEffect } from "react";
import ProviderContext from "../common/ProviderContext";
import DatePicker from "./DatePicker";
import { formatTime } from "../common/commonFuncs";

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
  const { currUser } = useContext(ProviderContext);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching appts");
      setAppts(await getActivity("appointments"));
      if (reload) setReload(false);
    };
    fetchData();
  }, [currUser, currDate, getActivity, reload, setReload]);

  const handleClick = (appt) => {
    setShow(true);
    setCurrAppt(appt);
  };
  const createRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id} className="align-middle">
        <td>{`${p.lastName}, ${p.firstName}`}</td>
        <td>
          <button className="btn btn-light ms-2" onClick={() => handleClick(p)}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </td>
        <td>{formatTime(p.apptAt)}</td>
        <td>
          {p.complete ? (
            <button
              className="btn btn-success"
              onClick={() => generatePdf(p.intakeId)}
            >
              PDF
            </button>
          ) : (
            <span className="badge bg-danger">Incomplete</span>
          )}
        </td>
      </tr>
    ));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title ms-2 mb-3">Appointments</h4>
        <DatePicker currDate={currDate} setCurrDate={setCurrDate} />
        <hr />
        {appts.length ? (
          <table className="table table-striped table-sm bg-light">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col" />
                <th scope="col">Time</th>
                <th scope="col" />
              </tr>
            </thead>
            <tbody>{createRows(appts)}</tbody>
          </table>
        ) : (
          <p className="text-center">Scheduled appointments will appear here</p>
        )}
      </div>
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
