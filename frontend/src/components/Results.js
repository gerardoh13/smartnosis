import React from "react";
import { formatTime } from "../intake/commonFuncs";

function Results({
  searchRes,
  generatePdf,
  setShow,
  setCurrAppt,
  setCurrView,
  setQuery,
  lastView,
}) {
  const handleClick = (appt) => {
    setShow(true);
    setCurrAppt(appt);
  };

  const clearSearch = () => {
    setQuery("");
    setCurrView(lastView);
  };
  const createApptRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id} className="align-middle">
        <td>{`${p.lastName}, ${p.firstName}`}</td>
        <td>
          <button className="btn btn-light ms-2" onClick={() => handleClick(p)}>
            <i className="bi bi-three-dots-vertical"></i>
          </button>
        </td>
        <td>{formatTime(p.apptAt)}</td>
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
          <td className="text-danger">Incomplete</td>
        )}
      </tr>
    ));
  };

  const createIntakeRows = (arr) => {
    return arr.map((p) => (
      <tr key={p.id} className="align-middle">
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

  const resultTables = (
    <>
      {searchRes.intakes.length ? (
        <>
          <h5 className="text-center">Intakes</h5>
          <table className="table table-striped bg-light">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Submitted</th>
                <th />
              </tr>
            </thead>
            <tbody>{createIntakeRows(searchRes.intakes)}</tbody>
          </table>
        </>
      ) : null}
      {searchRes.appts.length && searchRes.intakes.length ? <hr /> : null}
      {searchRes.appts.length ? (
        <>
          <h5 className="text-center">Appointments</h5>
          <table className="table table-striped bg-light">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th />
                <th scope="col">Time</th>
                <th />
              </tr>
            </thead>
            <tbody>{createApptRows(searchRes.appts)}</tbody>
          </table>
        </>
      ) : null}
    </>
  );

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title">Results</h3>
        {!searchRes.appts.length && !searchRes.intakes.length ? (
          <p className="text-center">No results found</p>
        ) : (
          resultTables
        )}
        <button
          className="btn btn-secondary form-control my-3"
          onClick={clearSearch}
        >
          Clear Search
        </button>
      </div>
    </div>
  );
}

export default Results;
